import { NextResponse } from "next/server";

const FAVICON_PATH = "/api/storage/images/favicon/favicon.ico";

export function GET(request: Request) {
  return NextResponse.redirect(new URL(FAVICON_PATH, request.url), 308);
}

