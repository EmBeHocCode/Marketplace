import { coupons } from "@/services/payment-service";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/dashboard/table";

export default function AdminCouponsRoute() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">Coupon management</h1>
      <Table
        headers={["Mã", "Mô tả", "Loại", "Giá trị", "Trạng thái"]}
        rows={coupons.map((coupon) => [
          coupon.code,
          coupon.description,
          coupon.discountType,
          String(coupon.discountValue),
          <Badge key={coupon.id} label={coupon.isActive ? "Active" : "Inactive"} />
        ])}
      />
    </div>
  );
}
