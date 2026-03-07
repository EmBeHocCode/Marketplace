import type { Metadata } from "next";
import { ProductListPage } from "@/modules/products/product-list-page";
import type { ProductType } from "@/types/domain";

export const metadata: Metadata = {
  title: "Tìm kiếm | MeowMarket",
  description: "Tìm sản phẩm theo tên, category và product type."
};

export default function SearchRoute({
  searchParams
}: {
  searchParams: {
    q?: string;
    category?: string;
    type?: ProductType;
    page?: string;
  };
}) {
  return (
    <ProductListPage
      q={searchParams.q}
      category={searchParams.category}
      type={searchParams.type}
      page={searchParams.page ? Number(searchParams.page) : 1}
    />
  );
}
