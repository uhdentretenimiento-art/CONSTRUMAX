import { NextResponse } from "next/server";

const FAVICON_URL =
  "https://www.construmaxpiscinas.com/images/favicon/favicon.ico";

export function GET() {
  return NextResponse.redirect(FAVICON_URL, 308);
}
