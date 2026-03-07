import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getOrdersByUser } from "@/services/order-service";

export default function ProfileServicesRoute() {
  const services = getOrdersByUser("user-01").flatMap((order) => order.provisionedVps ?? []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">My Services</h1>
      {services.map((service) => (
        <Card key={service.id}>
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted">Dịch vụ</p>
                <p className="mt-1 font-bold text-ink">{service.productName}</p>
              </div>
              <div>
                <p className="text-sm text-muted">IP address</p>
                <p className="mt-1 font-bold text-ink">{service.ipAddress}</p>
              </div>
              <div>
                <p className="text-sm text-muted">Username</p>
                <p className="mt-1 font-bold text-ink">{service.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted">Password</p>
                <p className="mt-1 font-bold text-ink">{service.password}</p>
              </div>
            </div>
            <div className="space-y-3">
              <Badge label={service.status} status={service.status} />
              <Button href={service.panelUrl} variant="outline">
                Control panel
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
