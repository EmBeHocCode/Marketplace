import { products } from "@/mock";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/dashboard/table";
import { formatCurrency } from "@/utils/format";

export default function AdminProductsRoute() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">Product management</h1>
      <Table
        headers={["Tên", "Loại", "Giá", "Hot", "Khuyến mãi"]}
        rows={products.map((product) => [
          product.name,
          product.type,
          formatCurrency(product.price),
          <Badge key={`${product.id}-hot`} label={product.isHot ? "Có" : "Không"} />,
          <Badge key={`${product.id}-promo`} label={product.isPromotion ? "Đang chạy" : "Tắt"} />
        ])}
      />
    </div>
  );
}
