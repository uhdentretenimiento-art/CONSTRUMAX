"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import {
  emptyContactFormData,
  validateContactField,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormData,
} from "@/lib/contactForm";
import { trackGoogleLead } from "@/lib/googleTag";
import { trackMetaLead } from "@/lib/metaPixel";

export default function ContactSection() {
  const projectTypeOptions = [
    "Piscina Nueva",
    "Remodelación",
    "Mantenimiento",
    "Jacuzzi/Spa",
    "Quinchos",
    "Otro",
  ];

  const [formData, setFormData] = useState<ContactFormData>(emptyContactFormData);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<ContactFieldErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value } as ContactFormData));

    if (name === "name" || name === "phone" || name === "email" || name === "message") {
      const error = validateContactField(name as keyof ContactFormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Honeypot
    if (formData.company.trim()) return;

    const newErrors = validateContactForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json().catch(() => null)) as
        | {
            ok?: boolean;
            message?: string;
            fieldErrors?: ContactFieldErrors;
          }
        | null;

      if (!response.ok) {
        if (result?.fieldErrors) {
          setErrors(result.fieldErrors);
        }

        throw new Error(
          result?.message ||
            "No pudimos enviar tu solicitud en este momento."
        );
      }

      trackMetaLead("contact_form_success", {
        city: formData.city || undefined,
        project_type: formData.projectType || undefined,
      });
      trackGoogleLead("contact_form_success", {
        city: formData.city || undefined,
        project_type: formData.projectType || undefined,
      });

      setSuccess(true);
      toast.success("Solicitud enviada. Te responderemos a la brevedad.");

      setFormData(emptyContactFormData);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No pudimos enviar tu solicitud en este momento."
      );
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Teléfono",
      value: "+54 387 2782626",
      href: "https://wa.me/5493872782626",
      ariaLabel: "Escribir por WhatsApp al +54 387 2782626",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@construmaxpiscinas.com",
      href: "mailto:info@construmaxpiscinas.com",
      ariaLabel: "Enviar email a info@construmaxpiscinas.com",
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "Pueyrredon 1323, Salta, Argentina",
      href: "",
      ariaLabel: "Ver ubicación",
    },
  ];

  const inputBase =
    "h-12 border-white/10 bg-white/[0.04] text-white placeholder:text-white/35 focus-visible:border-[#2DD4BF] focus-visible:ring-[#2DD4BF]/30";

  return (
    <section className="relative overflow-hidden py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <AnimateOnScroll animationType="slide-right">
            <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-7 shadow-[0_30px_90px_-70px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                <ShieldCheck className="h-3.5 w-3.5 text-[#2DD4BF]" />
                Atención personalizada
              </span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                Te acompañamos desde la idea hasta la entrega
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Compartinos tu proyecto y te respondemos con una propuesta clara,
                profesional y ajustada a tu espacio.
              </p>

              <div className="mt-7 space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.03] p-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.07] text-[#2DD4BF]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-white/55">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          aria-label={item.ariaLabel}
                          className="text-base font-semibold text-white/90 transition hover:text-[#2DD4BF]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base font-semibold text-white/90">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2DD4BF]">
                  Qué pasa después
                </p>
                <ol className="mt-3 space-y-2 text-sm text-white/75">
                  <li>1. Revisamos tu mensaje y te contactamos.</li>
                  <li>2. Coordinamos visita técnica o relevamiento.</li>
                  <li>3. Te enviamos propuesta clara con alcance y plazos.</li>
                </ol>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animationType="slide-left">
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] p-7 shadow-[0_30px_110px_-70px_rgba(0,0,0,0.92)] backdrop-blur-xl md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_15%_10%,rgba(45,212,191,0.14),transparent_55%),radial-gradient(65%_65%_at_85%_18%,rgba(29,78,216,0.12),transparent_60%)]" />

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative py-12 text-center"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/12 bg-white/[0.06]">
                    <CheckCircle className="h-10 w-10 text-[#2DD4BF]" />
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-white">
                    Solicitud recibida
                  </h3>
                  <p className="mx-auto mb-6 max-w-md text-white/75">
                    Gracias por escribirnos. Recibimos tu consulta y te
                    responderemos a la brevedad.
                  </p>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => setSuccess(false)}
                      variant="outline"
                      className="rounded-2xl border-white/15 bg-white/[0.03] text-white/90 hover:bg-white/[0.07] hover:text-white"
                    >
                      Enviar otra solicitud
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-6">
                  {/* Honeypot */}
                  <div className="hidden">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-white/70"
                      >
                        Nombre *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        className={`${inputBase} ${
                          errors.name
                            ? "border-red-500/70 focus-visible:ring-red-500/30 focus-visible:border-red-500"
                            : ""
                        }`}
                        placeholder="Tu nombre"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-sm font-medium text-white/70"
                      >
                        Teléfono *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                        className={`${inputBase} ${
                          errors.phone
                            ? "border-red-500/70 focus-visible:ring-red-500/30 focus-visible:border-red-500"
                            : ""
                        }`}
                        placeholder="3872782626"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-white/70"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      className={inputBase}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1.5 block text-sm font-medium text-white/70"
                      >
                        Ciudad
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={loading}
                        className={inputBase}
                        placeholder="Salta"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="projectType"
                        className="mb-1.5 block text-sm font-medium text-white/70"
                      >
                        Tipo de proyecto
                      </label>
                      <div className="relative">
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              projectType: e.target.value,
                            }))
                          }
                          disabled={loading}
                          className={`${inputBase} w-full appearance-none pr-10 ${
                            formData.projectType ? "text-white" : "text-white/35"
                          }`}
                        >
                          <option value="" className="bg-slate-950 text-white/70">
                            Tipo de proyecto
                          </option>
                          {projectTypeOptions.map((option) => (
                            <option
                              key={option}
                              value={option}
                              className="bg-slate-950 text-white"
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/45">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-white/70"
                    >
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                      className={`min-h-32 border-white/10 bg-white/[0.04] text-white placeholder:text-white/35 focus-visible:border-[#2DD4BF] focus-visible:ring-[#2DD4BF]/30 ${
                        errors.message
                          ? "border-red-500/70 focus-visible:ring-red-500/30 focus-visible:border-red-500"
                          : ""
                      }`}
                      placeholder="Contanos lo que necesitás..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full rounded-2xl bg-[#1D4ED8]/90 text-white hover:bg-[#1D4ED8] focus-visible:ring-[#2DD4BF]/50"
                  >
                    {loading ? "Enviando..." : "Enviar solicitud"}
                  </Button>

                  <p className="text-center text-xs text-white/55">
                    Al enviar, aceptás que te contactemos por WhatsApp o email.
                  </p>

                  <div className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white/75">
                    <Clock3 className="h-4 w-4 text-[#2DD4BF]" />
                    Tiempo de respuesta habitual: dentro de 24 horas hábiles.
                  </div>
                </form>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
