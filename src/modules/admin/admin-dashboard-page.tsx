import {
  faChartLine,
  faCoins,
  faReceipt,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { OrdersChart } from "@/components/dashboard/orders-chart";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { Table } from "@/components/dashboard/table";
import { UsersGrowthChart } from "@/components/dashboard/users-growth-chart";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getBestSellingProducts, getDashboardStats, getRecentOrders } from "@/services/order-service";
import { getRecentTickets } from "@/services/ticket-service";
import { formatCompactNumber, formatCurrency, formatDate } from "@/utils/format";

export function AdminDashboardPage() {
  const stats = getDashboardStats();
  const recentOrders = getRecentOrders();
  const recentTickets = getRecentTickets();
  const bestSellingProducts = getBestSellingProducts();

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Doanh thu"
          value={formatCurrency(stats.revenue)}
          helper="Tổng doanh thu mock đã thanh toán"
          icon={faCoins}
        />
        <DashboardStatCard
          title="Đơn hàng"
          value={formatCompactNumber(stats.orders)}
          helper="Toàn bộ order trong dữ liệu mẫu"
          icon={faReceipt}
        />
        <DashboardStatCard
          title="Người dùng"
          value={formatCompactNumber(stats.users)}
          helper="Sẵn sàng mở rộng auth thực tế"
          icon={faUsers}
        />
        <DashboardStatCard
          title="Tăng trưởng"
          value={`${stats.conversionRate}%`}
          helper="Tỷ lệ chuyển đổi mock"
          icon={faChartLine}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h2 className="text-2xl font-bold text-ink">Revenue chart</h2>
          <div className="mt-6">
            <RevenueChart />
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-ink">Orders chart</h2>
          <div className="mt-6">
            <OrdersChart />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <h2 className="text-2xl font-bold text-ink">Users growth</h2>
          <div className="mt-6">
            <UsersGrowthChart />
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-ink">Sản phẩm bán chạy</h2>
          <div className="mt-6 space-y-4">
            {bestSellingProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-[20px] bg-rose-50/60 p-4">
                <div>
                  <p className="font-semibold text-ink">{product.name}</p>
                  <p className="text-sm text-muted">{product.type}</p>
                </div>
                <Badge label={`${product.sold} bán`} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-ink">Recent orders</h2>
          <Table
            headers={["Mã đơn", "Ngày", "Tổng", "Trạng thái"]}
            rows={recentOrders.map((order) => [
              order.orderCode,
              formatDate(order.createdAt),
              formatCurrency(order.total),
              <Badge key={order.id} label={order.status} status={order.status} />
            ])}
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-ink">Recent tickets</h2>
          <Table
            headers={["Tiêu đề", "Danh mục", "Ngày", "Trạng thái"]}
            rows={recentTickets.map((ticket) => [
              ticket.subject,
              ticket.category,
              formatDate(ticket.createdAt),
              <Badge key={ticket.id} label={ticket.status} status={ticket.status} />
            ])}
          />
        </div>
      </div>
    </div>
  );
}
