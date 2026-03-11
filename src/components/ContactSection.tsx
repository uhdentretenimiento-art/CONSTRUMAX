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

type FormData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  projectType: string;
  message: string;
  company: string; // honeypot
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    city: "",
    projectType: "",
    message: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: keyof FormData, value: string) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "El nombre es requerido";

      case "phone": {
        const v = value.trim();
        if (!v) return "El teléfono es requerido";
        if (!/^[1-9][0-9]{9}$/.test(v))
          return "Debe tener 10 dígitos sin 0 inicial";
        if (/^15/.test(v)) return "No incluir 15 al inicio";
        return "";
      }

      case "message":
        if (!value.trim()) return "El mensaje es requerido";
        if (value.trim().length < 10) return "Mínimo 10 caracteres";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value } as FormData));

    if (name === "name" || name === "phone" || name === "message") {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Honeypot
    if (formData.company.trim()) return;

    const newErrors: Record<string, string> = {};
    (["name", "phone", "message"] as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Envío externo desactivado hasta configurar integración de email.
      setSuccess(true);
      toast.success(
        "Solicitud registrada. El envío por email se habilitará pronto."
      );

      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "",
        projectType: "",
        message: "",
        company: "",
      });
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
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950" />
      <div className="absolute inset-0 -z-20 opacity-[0.4] bg-[radial-gradient(55%_55%_at_12%_20%,rgba(29,78,216,0.10),transparent_60%),radial-gradient(45%_45%_at_88%_80%,rgba(45,212,191,0.14),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-black/60 to-transparent" />

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

              <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white/75">
                <Clock3 className="h-4 w-4 text-[#2DD4BF]" />
                Tiempo de respuesta habitual: dentro de 24 horas hábiles.
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
                    Gracias por completar el formulario. Estamos terminando la
                    integración de envío por email.
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
                      <Input
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        disabled={loading}
                        className={inputBase}
                        placeholder="Piscina nueva / remodelación / etc."
                      />
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
                </form>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
