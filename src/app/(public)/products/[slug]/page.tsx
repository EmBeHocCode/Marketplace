import type { Metadata } from "next";
import { ProductDetailPage } from "@/modules/products/product-detail-page";

export const metadata: Metadata = {
  title: "Chi tiết sản phẩm | MeowMarket",
  description: "Thông tin cấu hình, review, FAQ và sản phẩm tương tự."
};

export default function ProductDetailRoute({
  params
}: {
  params: { slug: string };
}) {
  return <ProductDetailPage slug={params.slug} />;
}
