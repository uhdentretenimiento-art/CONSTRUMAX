import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

const STORAGE_ROOT =
  process.env.STORAGE_UPLOADS_DIR || "/home/u307066029/storage/uploads";

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

function resolveAssetPath(kind: "images" | "videos", segments: string[]) {
  sanitizeSegments(segments);

  const baseDir = path.resolve(STORAGE_ROOT, kind);
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
    const assetPath = resolveAssetPath(kind, segments);
    const assetStat = await stat(assetPath);

    if (!assetStat.isFile()) {
      return new Response("Not found", { status: 404 });
    }

    const headers = new Headers({
      "cache-control": "public, max-age=31536000, immutable",
      "content-length": String(assetStat.size),
      "content-type": getContentType(assetPath),
    });

    if (method === "HEAD") {
      return new Response(null, { status: 200, headers });
    }

    const stream = createReadStream(assetPath);
    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 200,
      headers,
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}