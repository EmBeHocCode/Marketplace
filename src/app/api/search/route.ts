import { NextResponse } from "next/server";
import { searchProducts } from "@/services/search-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const results = searchProducts({
    q: searchParams.get("q") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    type: (searchParams.get("type") as
      | "VPS"
      | "CLOUD"
      | "GIFTCARD"
      | "GAMECARD"
      | null) ?? undefined,
    page: Number(searchParams.get("page") ?? "1")
  });

  return NextResponse.json(results);
}
