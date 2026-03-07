import { banners } from "@/mock";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/dashboard/table";

export default function AdminBannersRoute() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">Banner management</h1>
      <Table
        headers={["Tiêu đề", "Vị trí", "CTA", "Link"]}
        rows={banners.map((banner) => [
          banner.title,
          <Badge key={banner.id} label={banner.placement} />,
          banner.ctaLabel,
          banner.ctaLink
        ])}
      />
    </div>
  );
}
