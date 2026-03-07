import { faqs } from "@/mock";
import { ProductCard } from "@/components/product/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { getProductBySlug, getProductReviews, getRelatedProducts } from "@/services/product-service";
import { formatCurrency, formatDate } from "@/utils/format";
import { EmptyState } from "@/components/ui/empty-state";

export function ProductDetailPage({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <EmptyState
        title="Không tìm thấy sản phẩm"
        description="Slug không khớp với dữ liệu mock hiện tại."
        ctaLabel="Quay lại danh sách"
      />
    );
  }

  const relatedProducts = getRelatedProducts(product.id);
  const reviews = getProductReviews(product.id);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-gradient-to-br from-[#fff0f6] via-white to-[#eef3ff]">
          <Badge label={product.type} />
          <h1 className="mt-4 text-4xl font-black text-ink">{product.name}</h1>
          <p className="mt-4 text-base leading-8 text-muted">{product.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {product.specs
              ? Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="rounded-[24px] bg-white/80 p-4">
                    <p className="text-sm capitalize text-muted">{key}</p>
                    <p className="mt-1 font-semibold text-ink">{value}</p>
                  </div>
                ))
              : product.tags.map((tag) => (
                  <div key={tag} className="rounded-[24px] bg-white/80 p-4">
                    <p className="font-semibold text-ink">{tag}</p>
                  </div>
                ))}
          </div>
        </Card>
        <Card className="space-y-6">
          <div>
            <p className="text-sm text-muted">Giá bán</p>
            <p className="mt-2 text-4xl font-black text-ink">{formatCurrency(product.price)}</p>
          </div>
          <p className="text-sm leading-7 text-muted">{product.shortDescription}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/checkout">Mua ngay</Button>
            <Button href="/cart" variant="outline">
              Thêm vào giỏ hàng
            </Button>
          </div>
          <div className="rounded-[24px] bg-rose-50 p-4 text-sm leading-7 text-muted">
            Với gift card, mã sẽ hiển thị trong order detail. Với VPS, instance sẽ xuất hiện ở My Services sau khi đơn hoàn tất.
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <h2 className="text-2xl font-bold text-ink">Review khách hàng</h2>
          <div className="mt-6 space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-[24px] border border-rose-100 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-ink">{review.title}</p>
                  <Badge label={`${review.rating}/5`} />
                </div>
                <p className="mt-2 text-sm leading-7 text-muted">{review.content}</p>
                <p className="mt-4 text-xs text-muted">
                  {review.userName} • {formatDate(review.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold text-ink">FAQ sản phẩm</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs.slice(0, 3)} />
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-ink">Sản phẩm tương tự</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </div>
  );
}
