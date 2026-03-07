import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCat,
  faCloudArrowUp,
  faGift,
  faServer
} from "@fortawesome/free-solid-svg-icons";
import type { Banner } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroBanner({ banner }: { banner: Banner }) {
  return (
    <section className="relative overflow-hidden rounded-[40px] bg-hero-gradient px-6 py-12 shadow-soft md:px-10 md:py-16">
      <div className="absolute -right-8 top-8 hidden h-44 w-44 rounded-full bg-pink-200/40 blur-3xl lg:block" />
      <div className="absolute bottom-0 right-16 hidden h-36 w-36 rounded-full bg-blue-200/40 blur-3xl lg:block" />
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Badge label="Cute tech marketplace" />
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-ink md:text-6xl">
              {banner.title}
            </h1>
            <p className="max-w-2xl text-lg text-muted">{banner.subtitle}</p>
            <p className="max-w-2xl text-sm leading-8 text-muted md:text-base">
              {banner.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={banner.ctaLink}>{banner.ctaLabel}</Button>
            <Button href="/support" variant="outline">
              Xem hỗ trợ
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { icon: faServer, title: "VPS ready", description: "Tạo service nhanh sau thanh toán." },
            { icon: faCloudArrowUp, title: "Cloud mạnh", description: "Luồng mua hàng tối ưu cho mobile." },
            { icon: faGift, title: "Gift card", description: "Cấp mã tự động trong order detail." },
            { icon: faCat, title: "Meow support", description: "Ticket hỗ trợ thân thiện, rõ ràng." }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/80 bg-white/80 p-5 backdrop-blur"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-rose-100 text-primary">
                <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
              </div>
              <p className="mt-4 text-lg font-bold text-ink">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
