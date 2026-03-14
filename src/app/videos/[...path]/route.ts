import { buildStorageAssetResponse } from "@/lib/storageAssets";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { path } = await context.params;
  return buildStorageAssetResponse("videos", path, "GET");
}

export async function HEAD(_request: Request, context: RouteContext) {
  const { path } = await context.params;
  return buildStorageAssetResponse("videos", path, "HEAD");
}