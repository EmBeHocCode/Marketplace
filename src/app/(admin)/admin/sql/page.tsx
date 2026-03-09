import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const studioUrl = process.env.NEXT_PUBLIC_PRISMA_STUDIO_URL ?? "http://127.0.0.1:5555";

export const metadata: Metadata = {
  title: "Quản lý SQL | Quản trị MeowMarket",
  description: "Mở nhanh Prisma Studio để quản lý dữ liệu SQL trong môi trường cục bộ."
};

export default function AdminSqlRoute() {
  return (
    <section className="space-y-6">
      <Card className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted">
            Trình quản lý SQL
          </p>
          <h1 className="text-3xl font-black text-ink">Quản lý SQL</h1>
          <p className="max-w-3xl text-sm leading-7 text-muted">
            Prisma Studio được bật cùng lúc với web khi chạy <code>npm run dev</code>. Trang này
            dùng để mở nhanh giao diện quản lý dữ liệu PostgreSQL trong môi trường cục bộ.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={studioUrl} target="_blank" rel="noreferrer">
            Mở Prisma Studio
          </Button>
          <Button href="/admin" variant="outline">
            Quay về bảng điều khiển
          </Button>
        </div>
        <div className="rounded-[24px] border border-rose-100 bg-rose-50/70 p-4 text-sm text-muted">
          <p>
            URL cục bộ: <span className="font-semibold text-ink">{studioUrl}</span>
          </p>
          <p className="mt-2">
            Chỉ nên dùng trong máy cục bộ. Không nên công khai Prisma Studio ra internet hoặc triển
            khai chung với website vận hành thực tế.
          </p>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-ink">Xem trước Prisma Studio</h2>
          <p className="mt-1 text-sm text-muted">
            Nếu khung dưới không hiển thị do trình duyệt chặn nhúng, dùng nút mở tab mới ở trên.
          </p>
        </div>
        <iframe
          src={studioUrl}
          title="Prisma Studio"
          className="h-[780px] w-full bg-slate-50"
        />
      </Card>
    </section>
  );
}
