import { orders, products, users } from "@/mock";
import { validateCoupon } from "@/services/payment-service";
import type { Order } from "@/types/domain";

export function getOrders() {
  return orders;
}

export function getRecentOrders() {
  return [...orders].slice(0, 5);
}

export function getOrdersByUser(userId: string) {
  return orders.filter((order) => order.userId === userId);
}

export function getOrderByCode(orderCode: string) {
  return orders.find(
    (order) => order.orderCode.toLowerCase() === orderCode.toLowerCase()
  );
}

export function getOrderById(orderId: string) {
  return orders.find((order) => order.id === orderId);
}

export function getOrderTotals(
  items: Array<{ productId: string; quantity: number }>,
  couponCode?: string
) {
  const subtotal = items.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) {
      return total;
    }
    return total + product.price * item.quantity;
  }, 0);

  const { coupon, discount } = couponCode
    ? validateCoupon(couponCode, subtotal)
    : { coupon: null, discount: 0 };

  return {
    subtotal,
    coupon,
    discount,
    total: Math.max(0, subtotal - discount)
  };
}

export function getDashboardStats() {
  const revenue = orders
    .filter((order) => ["PAID", "PROCESSING", "COMPLETED"].includes(order.status))
    .reduce((total, order) => total + order.total, 0);

  return {
    revenue,
    orders: orders.length,
    users: users.length,
    conversionRate: 12.8
  };
}

export function getBestSellingProducts() {
  return products
    .map((product) => {
      const sold = orders.reduce((count, order) => {
        const foundItem = order.items.find((item) => item.productId === product.id);
        return count + (foundItem?.quantity ?? 0);
      }, 0);

      return {
        ...product,
        sold
      };
    })
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);
}

export function createMockOrder(order: Order) {
  return order;
}
