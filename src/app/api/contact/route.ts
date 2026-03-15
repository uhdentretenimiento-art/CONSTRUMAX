import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import {
  normalizeContactFormData,
  validateContactForm,
} from "@/lib/contactForm";

export const runtime = "nodejs";

const RATE_WINDOW_MS = 30_000;
const SMTP_CONNECTION_TIMEOUT_MS = 10_000;
const SMTP_GREETING_TIMEOUT_MS = 10_000;
const SMTP_SOCKET_TIMEOUT_MS = 15_000;
const ipHits = new Map<string, number>();

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (forwardedFor?.split(",")[0]?.trim() || "unknown").slice(0, 64);
}

function pruneRateLimitEntries(now: number) {
  for (const [ip, timestamp] of ipHits) {
    if (now - timestamp >= RATE_WINDOW_MS) {
      ipHits.delete(ip);
    }
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const formData = normalizeContactFormData(payload);

    if (formData.company) {
      return NextResponse.json({ ok: true });
    }

    const now = Date.now();
    const ip = getIp(request);

    pruneRateLimitEntries(now);

    const lastHit = ipHits.get(ip) ?? 0;
    if (now - lastHit < RATE_WINDOW_MS) {
      return NextResponse.json(
        {
          ok: false,
          message: "Demasiadas solicitudes. Proba de nuevo en unos segundos.",
        },
        { status: 429 }
      );
    }

    ipHits.set(ip, now);

    const fieldErrors = validateContactForm(formData);

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Revisá los campos marcados e intentá nuevamente.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const smtpHost = getEnv("SMTP_HOST");
    const smtpUser = getEnv("SMTP_USER");
    const smtpPass = getEnv("SMTP_PASS");
    const smtpFrom = process.env.SMTP_FROM?.trim() || smtpUser;
    const smtpTo = process.env.SMTP_TO?.trim() || smtpUser;
    const smtpPort = Number(process.env.SMTP_PORT ?? "465");

    if (!Number.isFinite(smtpPort)) {
      throw new Error("Invalid SMTP_PORT value");
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: SMTP_CONNECTION_TIMEOUT_MS,
      greetingTimeout: SMTP_GREETING_TIMEOUT_MS,
      socketTimeout: SMTP_SOCKET_TIMEOUT_MS,
    });

    const lines = [
      `Nombre: ${formData.name}`,
      `Telefono: ${formData.phone}`,
      `Email: ${formData.email || "No informado"}`,
      `Ciudad: ${formData.city || "No informada"}`,
      `Tipo de proyecto: ${formData.projectType || "No informado"}`,
      "",
      "Mensaje:",
      formData.message,
    ];

    const htmlSections = [
      ["Nombre", formData.name],
      ["Telefono", formData.phone],
      ["Email", formData.email || "No informado"],
      ["Ciudad", formData.city || "No informada"],
      ["Tipo de proyecto", formData.projectType || "No informado"],
      ["Mensaje", formData.message],
    ];

    await transporter.sendMail({
      from: `Construmax Piscinas <${smtpFrom}>`,
      to: smtpTo,
      replyTo: formData.email || smtpFrom,
      subject: `Nueva consulta web de ${formData.name}`,
      text: lines.join("\n"),
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
          <h2 style="margin-bottom: 16px;">Nueva consulta desde construmaxpiscinas.com</h2>
          <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 680px;">
            <tbody>
              ${htmlSections
                .map(
                  ([label, value]) => `
                    <tr>
                      <td style="border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 700; width: 180px;">${escapeHtml(label)}</td>
                      <td style="border: 1px solid #cbd5e1;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending contact form", error);

    const errorMessage =
      error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
    const errorCode =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code?: unknown }).code || "")
        : "";

    if (
      errorCode.includes("ETIMEDOUT") ||
      errorCode.includes("ESOCKET") ||
      errorMessage.includes("timeout")
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "No pudimos enviar tu solicitud en este momento. Proba nuevamente en unos minutos o escribinos por WhatsApp.",
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        message:
          "No pudimos enviar tu solicitud en este momento. Proba nuevamente en unos minutos o escribinos por WhatsApp.",
      },
      { status: 500 }
    );
  }
}