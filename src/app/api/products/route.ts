import { NextResponse } from "next/server";
import { getProducts } from "@/services/product-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = getProducts({
    q: searchParams.get("q") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    type: (searchParams.get("type") as
      | "VPS"
      | "CLOUD"
      | "GIFTCARD"
      | "GAMECARD"
      | null) ?? undefined,
    promotion: searchParams.get("promotion") === "true",
    sort:
      (searchParams.get("sort") as
        | "featured"
        | "price-asc"
        | "price-desc"
        | "rating"
        | null) ?? "featured",
    page: Number(searchParams.get("page") ?? "1")
  });

  return NextResponse.json(data);
}
