import { FilterSidebar } from "@/components/product/filter-sidebar";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProducts } from "@/services/product-service";
import type { ProductType } from "@/types/domain";

export function ProductListPage({
  q,
  category,
  type,
  promotion,
  sort,
  page
}: {
  q?: string;
  category?: string;
  type?: ProductType;
  promotion?: boolean;
  sort?: "featured" | "price-asc" | "price-desc" | "rating";
  page?: number;
}) {
  const result = getProducts({
    q,
    category,
    type,
    promotion,
    sort,
    page,
    pageSize: 9
  });

  const createPageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (type) params.set("type", type);
    if (promotion) params.set("promotion", "true");
    if (sort) params.set("sort", sort);
    params.set("page", String(nextPage));
    return `/products?${params.toString()}`;
  };

  const createSortHref = (
    nextSort: "featured" | "price-asc" | "price-desc" | "rating"
  ) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (type) params.set("type", type);
    if (promotion) params.set("promotion", "true");
    params.set("sort", nextSort);
    params.set("page", "1");
    return `/products?${params.toString()}`;
  };

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Danh sách sản phẩm"
        title="Marketplace rõ ràng với filter, sort và pagination"
        description="Search theo tên, category, product type. Layout ưu tiên cảm giác dễ dùng và tin cậy."
      />
      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <FilterSidebar />
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/70 bg-white p-5 shadow-card">
            <div>
              <p className="text-sm text-muted">Kết quả</p>
              <p className="text-lg font-bold text-ink">{result.totalItems} sản phẩm</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              {[
                ["featured", "Nổi bật"],
                ["price-asc", "Giá tăng dần"],
                ["price-desc", "Giá giảm dần"],
                ["rating", "Đánh giá cao"]
              ].map(([value, label]) => (
                <a
                  key={value}
                  href={createSortHref(
                    value as "featured" | "price-asc" | "price-desc" | "rating"
                  )}
                  className="rounded-full bg-rose-50 px-4 py-2 text-ink"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          {result.items.length ? (
            <>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {result.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={result.currentPage}
                totalPages={result.totalPages}
                createPageHref={createPageHref}
              />
            </>
          ) : (
            <EmptyState
              title="Chưa có sản phẩm phù hợp"
              description="Thử đổi bộ lọc hoặc từ khóa tìm kiếm để xem kết quả khác."
              ctaLabel="Xem toàn bộ sản phẩm"
            />
          )}
        </div>
      </div>
    </div>
  );
}
