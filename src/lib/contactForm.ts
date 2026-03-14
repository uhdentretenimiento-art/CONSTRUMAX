export type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  projectType: string;
  message: string;
  company: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>;

export const emptyContactFormData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  city: "",
  projectType: "",
  message: "",
  company: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeContactFormData(value: unknown): ContactFormData {
  const data = typeof value === "object" && value !== null ? value : {};

  return {
    name: cleanValue((data as Record<string, unknown>).name),
    phone: cleanValue((data as Record<string, unknown>).phone),
    email: cleanValue((data as Record<string, unknown>).email),
    city: cleanValue((data as Record<string, unknown>).city),
    projectType: cleanValue((data as Record<string, unknown>).projectType),
    message: cleanValue((data as Record<string, unknown>).message),
    company: cleanValue((data as Record<string, unknown>).company),
  };
}

export function validateContactField(
  name: keyof ContactFormData,
  value: string
): string {
  switch (name) {
    case "name":
      return value.trim() ? "" : "El nombre es requerido";

    case "phone": {
      const normalized = value.trim();
      if (!normalized) return "El teléfono es requerido";
      if (!/^[1-9][0-9]{9}$/.test(normalized)) {
        return "Debe tener 10 dígitos sin 0 inicial";
      }
      if (/^15/.test(normalized)) return "No incluir 15 al inicio";
      return "";
    }

    case "email": {
      const normalized = value.trim();
      if (!normalized) return "";
      return emailPattern.test(normalized)
        ? ""
        : "Ingresá un email válido";
    }

    case "message": {
      const normalized = value.trim();
      if (!normalized) return "El mensaje es requerido";
      if (normalized.length < 10) return "Mínimo 10 caracteres";
      return "";
    }

    default:
      return "";
  }
}

export function validateContactForm(
  formData: ContactFormData
): ContactFieldErrors {
  const fields: Array<keyof ContactFormData> = [
    "name",
    "phone",
    "email",
    "message",
  ];

  return fields.reduce<ContactFieldErrors>((accumulator, field) => {
    const error = validateContactField(field, formData[field]);
    if (error) accumulator[field] = error;
    return accumulator;
  }, {});
}