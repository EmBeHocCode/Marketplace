import { banners, categories, faqs, reviews } from "@/mock";
import { getHotProducts, getPromotionProducts } from "@/services/product-service";
import { CategoryCard } from "@/components/product/category-card";
import { HeroBanner } from "@/components/product/hero-banner";
import { ProductCard } from "@/components/product/product-card";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function HomePage() {
  const heroBanner = banners[0];
  const promotionBanner = banners[1];
  const hotProducts = getHotProducts();
  const promotionProducts = getPromotionProducts();

  return (
    <div className="space-y-12">
      <HeroBanner banner={heroBanner} />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Danh mục nổi bật"
          title="Chọn nhanh nhóm dịch vụ số bạn đang cần"
          description="Bố cục marketplace rõ ràng theo phong cách mềm mại, thân thiện nhưng vẫn giữ cảm giác startup công nghệ đáng tin cậy."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Sản phẩm hot"
          title="Các dịch vụ đang được mua nhiều nhất"
          description="Danh sách ưu tiên sản phẩm có nhu cầu cao, phù hợp người dùng cần mua nhanh với luồng lựa chọn ngắn gọn."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {hotProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <Card className="bg-gradient-to-br from-[#fff0f6] to-[#eef3ff]">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Khuyến mãi</p>
          <h2 className="mt-4 text-3xl font-black text-ink">{promotionBanner.title}</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{promotionBanner.description}</p>
          <div className="mt-6">
            <Button href={promotionBanner.ctaLink}>{promotionBanner.ctaLabel}</Button>
          </div>
        </Card>
        <div className="grid gap-5 md:grid-cols-2">
          {promotionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Hướng dẫn mua hàng"
          title="Quy trình đơn giản trong bốn bước"
          description="Tối ưu cho cả desktop và mobile, tập trung vào thao tác rõ ràng để hạn chế nhầm lẫn ở bước thanh toán và nhận dịch vụ."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Tìm sản phẩm bằng search hoặc danh mục",
            "Xem cấu hình, review và FAQ sản phẩm",
            "Thêm vào giỏ hàng, nhập mã giảm giá nếu có",
            "Thanh toán và nhận mã hoặc dịch vụ ngay trong dashboard"
          ].map((step, index) => (
            <Card key={step} className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-blue-100 text-secondary">
                <span className="text-lg font-black">{index + 1}</span>
              </div>
              <p className="text-base font-semibold text-ink">{step}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Đánh giá khách hàng"
          title="Feedback giúp tăng cảm giác tin cậy"
          description="Review mock được tách riêng để dễ thay bằng API database sau này."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id}>
              <p className="text-lg font-bold text-ink">{review.title}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{review.content}</p>
              <p className="mt-5 text-sm font-semibold text-primary">{review.userName}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="FAQ"
            title="Các câu hỏi phổ biến trước khi mua"
            description="Giải thích rõ gift card fulfillment, VPS provisioning, thanh toán và bảo mật route."
          />
          <FAQAccordion items={faqs} />
        </div>
        <Card className="flex flex-col justify-between bg-ink text-white">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-200">CTA</p>
            <h3 className="mt-4 text-3xl font-black">Mua dịch vụ số nhanh hơn với MeowMarket</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Từ gift card đến VPS, mọi luồng đều được thiết kế để dễ tích hợp backend thật sau này.
            </p>
          </div>
          <div className="mt-6">
            <Button href="/products">Mua ngay</Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
