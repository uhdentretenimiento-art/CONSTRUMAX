// src/lib/media.ts

export type MediaPrefer = "webp" | "avif";

export type MediaOptions = {
  prefer?: MediaPrefer;
  small?: boolean;
};

export type MediaKind = "imagen" | "video" | "desconocido";
export type NormalizedVideoSource = { src: string; type: string };
export type NormalizedImageFormats = {
  avif?: string;
  webp?: string;
  smAvif?: string;
  smWebp?: string;
  src768?: string;
  srcSet?: string;
};
export type NormalizedMediaItem =
  | { type: "video"; sources: NormalizedVideoSource[] }
  | { type: "image"; formats: NormalizedImageFormats };

/**
 * Normaliza una URL/ruta de media.
 * - Acepta string absoluto (http/https) y lo devuelve tal cual.
 * - Acepta ruta relativa/absoluta ("/images/...") y le aplica base si corresponde.
 * - Acepta options como objeto, o boolean legacy (small=true/false).
 *
 * IMPORTANTE: esto es compatible con llamados viejos tipo:
 *   normalizeMedia(url, true)
 * y nuevos tipo:
 *   normalizeMedia(url, { small: true, prefer: "webp" })
 */

// Overloads (para TS)
export function normalizeMedia(src: string): string;
export function normalizeMedia(src: string, small: boolean): string;
export function normalizeMedia(src: string, options: MediaOptions): string;
export function normalizeMedia(src: unknown[]): NormalizedMediaItem[];

// Implementación
export function normalizeMedia(
  src: string | unknown[],
  optionsOrSmall?: MediaOptions | boolean
): string | NormalizedMediaItem[] {
  if (Array.isArray(src)) {
    return src
      .map((item): NormalizedMediaItem | null => {
        const kind = detectarTipoMedia(item);

        if (kind === "video") {
          if (typeof item === "string") {
            return {
              type: "video",
              sources: [{ src: normalizeMedia(item), type: guessMimeType(item) }],
            };
          }

          const record = item as Record<string, unknown>;
          const rawSources = Array.isArray(record.sources)
            ? (record.sources as Array<{ src?: string; type?: string }>)
            : [];
          const sources = rawSources
            .map((s) => {
              if (!s?.src) return null;
              const normalized = normalizeMedia(s.src);
              return {
                src: normalized,
                type: s.type || guessMimeType(normalized),
              };
            })
            .filter(Boolean) as NormalizedVideoSource[];

          if (!sources.length) return null;
          return { type: "video", sources };
        }

        if (kind === "imagen") {
          if (typeof item === "string") {
            const webp = normalizeMedia(item, { prefer: "webp" });
            const avif = normalizeMedia(item, { prefer: "avif" });
            const smWebp = normalizeMedia(item, { small: true, prefer: "webp" });
            const smAvif = normalizeMedia(item, { small: true, prefer: "avif" });
            return { type: "image", formats: { webp, avif, smWebp, smAvif } };
          }

          const record = item as Record<string, unknown>;
          const formats: NormalizedImageFormats = {
            avif:
              typeof record.avif === "string" ? normalizeMedia(record.avif) : undefined,
            webp:
              typeof record.webp === "string" ? normalizeMedia(record.webp) : undefined,
            smAvif:
              typeof record.smAvif === "string"
                ? normalizeMedia(record.smAvif)
                : undefined,
            smWebp:
              typeof record.smWebp === "string"
                ? normalizeMedia(record.smWebp)
                : undefined,
            src768:
              typeof record.src768 === "string"
                ? normalizeMedia(record.src768)
                : undefined,
            srcSet:
              typeof record.srcSet === "string" ? record.srcSet : undefined,
          };
          return { type: "image", formats };
        }

        return null;
      })
      .filter(Boolean) as NormalizedMediaItem[];
  }

  const options: MediaOptions =
    typeof optionsOrSmall === "boolean"
      ? { small: optionsOrSmall }
      : optionsOrSmall ?? {};

  if (!src) return src;

  // 1) Si ya es URL absoluta, dejamos tal cual
  if (/^https?:\/\//i.test(src)) {
    return applyOptions(src, options);
  }

  // 2) Si es data: (base64) o blob:, dejamos tal cual
  if (/^(data:|blob:)/i.test(src)) {
    return src;
  }

  // 3) Base para assets (si querés servirlos desde construmaxpiscinas.com)
  // Podés setear NEXT_PUBLIC_ASSET_BASE="https://www.construmaxpiscinas.com"
  const base =
    process.env.NEXT_PUBLIC_ASSET_BASE?.replace(/\/+$/, "") || "";

  // 4) Normalizamos ruta
  const path = src.startsWith("/") ? src : `/${src}`;

  // Si hay base, unimos. Si no, devolvemos la ruta.
  const out = base ? `${base}${path}` : path;

  return applyOptions(out, options);
}

function applyOptions(url: string, options: MediaOptions): string {
  let out = url;

  // Separamos query/hash para no romper la URL
  const [beforeHash, hash = ""] = out.split("#");
  const [path, query = ""] = beforeHash.split("?");

  let newPath = path;

  // small=true -> agrega sufijo -sm antes de la extensión si hay.
  // Ej: foto.jpg -> foto-sm.jpg
  if (options.small) {
    newPath = addSmallSuffix(newPath);
  }

  // prefer -> intenta cambiar la extensión a .webp o .avif si no lo es ya
  if (options.prefer) {
    newPath = preferExtension(newPath, options.prefer);
  }

  out = newPath;
  if (query) out += `?${query}`;
  if (hash) out += `#${hash}`;

  return out;
}

function addSmallSuffix(path: string): string {
  // Si ya parece "small", no tocamos
  if (/-sm(\.)/i.test(path) || /_sm(\.)/i.test(path)) return path;

  const match = path.match(/^(.*)\.(avif|webp|png|jpe?g|gif|svg)$/i);
  if (!match) return path; // sin extensión reconocible

  const base = match[1];
  const ext = match[2];
  return `${base}-sm.${ext}`;
}

function preferExtension(path: string, prefer: MediaPrefer): string {
  // Si ya es la extensión preferida, no tocamos
  if (new RegExp(`\\.${prefer}$`, "i").test(path)) return path;

  // Si es svg no lo cambiamos (no tiene sentido)
  if (/\.svg$/i.test(path)) return path;

  const match = path.match(/^(.*)\.(avif|webp|png|jpe?g|gif)$/i);
  if (!match) return path;

  const base = match[1];
  return `${base}.${prefer}`;
}

function guessMimeType(src: string): string {
  const clean = src.toLowerCase().split("?")[0].split("#")[0];
  if (clean.endsWith(".mp4")) return "video/mp4";
  if (clean.endsWith(".webm")) return "video/webm";
  if (clean.endsWith(".mov")) return "video/quicktime";
  if (clean.endsWith(".m4v")) return "video/x-m4v";
  return "video/mp4";
}

export function withCacheBust(url: string): string {
  if (!url) return url;
  const token = "v=1";
  if (url.includes(`${token}`)) return url;
  return url.includes("?") ? `${url}&${token}` : `${url}?${token}`;
}

export function detectarTipoMedia(input: unknown): MediaKind {
  if (input && typeof input === "object") {
    const record = input as Record<string, unknown>;
    if (Array.isArray(record.sources)) return "video";
    if (
      typeof record.webp === "string" ||
      typeof record.avif === "string" ||
      typeof record.smWebp === "string" ||
      typeof record.smAvif === "string"
    ) {
      return "imagen";
    }
  }

  if (typeof input !== "string") return "desconocido";

  const lower = input.toLowerCase();
  if (
    lower.endsWith(".mp4") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".mov") ||
    lower.endsWith(".m4v")
  ) {
    return "video";
  }
  if (
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".png") ||
    lower.endsWith(".webp") ||
    lower.endsWith(".avif") ||
    lower.endsWith(".gif") ||
    lower.endsWith(".svg")
  ) {
    return "imagen";
  }

  return "desconocido";
}
