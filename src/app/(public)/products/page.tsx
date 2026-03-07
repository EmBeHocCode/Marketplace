import type { Metadata } from "next";
import { ProductListPage } from "@/modules/products/product-list-page";
import type { ProductType } from "@/types/domain";

export const metadata: Metadata = {
  title: "Sản phẩm | MeowMarket",
  description: "Danh sách VPS, cloud, gift card và thẻ game tại MeowMarket."
};

export default function ProductsRoute({
  searchParams
}: {
  searchParams: {
    q?: string;
    category?: string;
    type?: ProductType;
    promotion?: string;
    sort?: "featured" | "price-asc" | "price-desc" | "rating";
    page?: string;
  };
}) {
  return (
    <ProductListPage
      q={searchParams.q}
      category={searchParams.category}
      type={searchParams.type}
      promotion={searchParams.promotion === "true"}
      sort={searchParams.sort}
      page={searchParams.page ? Number(searchParams.page) : 1}
    />
  );
}
