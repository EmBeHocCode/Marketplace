import { Card } from "@/components/ui/card";

export default function AdminSettingsRoute() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">System settings</h1>
      <div className="grid gap-5 md:grid-cols-2">
        {[
          ["Authentication", "Chuẩn bị cấu trúc cho NextAuth hoặc JWT."],
          ["Payment Gateway", "Sẵn sàng thêm adapter VNPay, Momo, ZaloPay, Crypto."],
          ["Provisioning", "Tách service cho VPS provisioning và gift card delivery."],
          ["Deployment", "Frontend Vercel, backend và PostgreSQL có thể deploy trên VPS."]
        ].map(([title, description]) => (
          <Card key={title}>
            <p className="text-lg font-bold text-ink">{title}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
