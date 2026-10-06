import { NextResponse } from "next/server";
import { getMenu } from "../../lib/inventory";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") || "flowers";
  const menu = await getMenu();
  const body = type === "items" ? menu.items : menu.flowers;
  const headers = new Headers({ "Cache-Control": "no-store" });

  if (menu.stockDate) headers.set("x-tv-data-as-of", menu.stockDate);
  return NextResponse.json(body, { headers });
}
