import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import {
  normalizeContactFormData,
  validateContactForm,
} from "@/lib/contactForm";

export const runtime = "nodejs";

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

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const formData = normalizeContactFormData(payload);

    if (formData.company) {
      return NextResponse.json({ ok: true });
    }

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
    const smtpFrom = getEnv("SMTP_FROM");
    const smtpTo = getEnv("SMTP_TO");
    const smtpPort = Number(process.env.SMTP_PORT ?? "587");

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

    return NextResponse.json(
      {
        ok: false,
        message:
          "No pudimos enviar tu solicitud en este momento. Probá nuevamente en unos minutos o escribinos por WhatsApp.",
      },
      { status: 500 }
    );
  }
}