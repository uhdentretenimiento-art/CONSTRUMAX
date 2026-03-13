const REMOTE_VIDEO_URL =
  "https://www.construmaxpiscinas.com/videos/hero/video-proceso-mobile.webm";

export async function GET(request: Request) {
  const range = request.headers.get("range");

  const upstream = await fetch(REMOTE_VIDEO_URL, {
    headers: range ? { range } : undefined,
    cache: "force-cache",
  });

  if (!upstream.ok) {
    return new Response("No se pudo cargar el video.", {
      status: upstream.status,
    });
  }

  const headers = new Headers();
  headers.set("Content-Type", "video/webm");
  headers.set("Accept-Ranges", upstream.headers.get("accept-ranges") ?? "bytes");

  const contentLength = upstream.headers.get("content-length");
  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }

  const contentRange = upstream.headers.get("content-range");
  if (contentRange) {
    headers.set("Content-Range", contentRange);
  }

  const cacheControl = upstream.headers.get("cache-control");
  if (cacheControl) {
    headers.set("Cache-Control", cacheControl);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}