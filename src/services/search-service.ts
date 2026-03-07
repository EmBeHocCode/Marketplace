import { getProducts } from "@/services/product-service";
import type { ProductType } from "@/types/domain";

export function searchProducts(params: {
  q?: string;
  category?: string;
  type?: ProductType;
  page?: number;
}) {
  return getProducts({
    q: params.q,
    category: params.category,
    type: params.type,
    page: params.page,
    pageSize: 12,
    sort: "featured"
  });
}
