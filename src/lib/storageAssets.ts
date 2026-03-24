import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

const STORAGE_ROOT_CANDIDATES = [
  process.env.STORAGE_UPLOADS_DIR,
  "/home/u307066029/files/domains/construmaxpiscinas.com/storage/uploads",
  "/home/u307066029/domains/construmaxpiscinas.com/storage/uploads",
  "/home/u307066029/storage/uploads",
].filter((value): value is string => Boolean(value && value.trim()));

const MIME_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".webp": "image/webp",
};

function sanitizeSegments(segments: string[]) {
  if (segments.length === 0) {
    throw new Error("Missing path");
  }

  for (const segment of segments) {
    if (!segment || segment === "." || segment === "..") {
      throw new Error("Invalid path segment");
    }
  }
}

function resolveAssetPath(baseRoot: string, kind: "images" | "videos", segments: string[]) {
  sanitizeSegments(segments);

  const baseDir = path.resolve(baseRoot, kind);
  const assetPath = path.resolve(baseDir, ...segments);

  if (!assetPath.startsWith(`${baseDir}${path.sep}`) && assetPath !== baseDir) {
    throw new Error("Path traversal blocked");
  }

  return assetPath;
}

function getContentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  return MIME_TYPES[extension] || "application/octet-stream";
}

export async function buildStorageAssetResponse(
  kind: "images" | "videos",
  segments: string[],
  method: "GET" | "HEAD"
) {
  try {
    let resolvedPath: string | null = null;
    let assetStat: Awaited<ReturnType<typeof stat>> | null = null;

    for (const candidateRoot of STORAGE_ROOT_CANDIDATES) {
      const candidatePath = resolveAssetPath(candidateRoot, kind, segments);
      try {
        const candidateStat = await stat(candidatePath);
        if (candidateStat.isFile()) {
          resolvedPath = candidatePath;
          assetStat = candidateStat;
          break;
        }
      } catch {
        // Continue checking other candidate roots.
      }
    }

    if (!resolvedPath || !assetStat) {
      return new Response("Not found", { status: 404 });
    }

    const headers = new Headers({
      "cache-control": "public, max-age=31536000, immutable",
      "content-length": String(assetStat.size),
      "content-type": getContentType(resolvedPath),
    });

    if (method === "HEAD") {
      return new Response(null, { status: 200, headers });
    }

    const stream = createReadStream(resolvedPath);
    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 200,
      headers,
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
