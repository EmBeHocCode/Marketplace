import { orders, products } from "@/mock";
import type { GiftCardCode, Order, Product, VpsService } from "@/types/domain";

const giftCardInventory: GiftCardCode[] = [
  {
    id: "inventory-01",
    productId: "prod-steam-wallet",
    code: "STEAM-44A2-PLK9-XT82",
    status: "AVAILABLE",
    createdAt: "2026-02-01T10:00:00.000Z"
  },
  {
    id: "inventory-02",
    productId: "prod-google-play",
    code: "GOOGLE-7D9F-21LP-AR4Q",
    status: "AVAILABLE",
    createdAt: "2026-02-02T10:00:00.000Z"
  },
  {
    id: "inventory-03",
    productId: "prod-garena",
    code: "GARENA-18HF-QW92-ZK31",
    status: "AVAILABLE",
    createdAt: "2026-02-03T10:00:00.000Z"
  }
];

function findProduct(productId: string): Product | undefined {
  return products.find((product) => product.id === productId);
}

export function allocateGiftCardCodes(order: Order) {
  const assignedCodes: GiftCardCode[] = [];

  order.items.forEach((item) => {
    const product = findProduct(item.productId);
    if (!product || !["GIFTCARD", "GAMECARD"].includes(product.type)) {
      return;
    }

    const availableCode = giftCardInventory.find(
      (code) => code.productId === item.productId && code.status === "AVAILABLE"
    );

    if (availableCode) {
      availableCode.status = "SOLD";
      assignedCodes.push({
        ...availableCode,
        createdAt: new Date().toISOString()
      });
    }
  });

  return assignedCodes;
}

export function provisionMockVps(order: Order, userId: string) {
  const services: VpsService[] = [];

  order.items.forEach((item, index) => {
    const product = findProduct(item.productId);
    if (!product || product.type !== "VPS") {
      return;
    }

    services.push({
      id: `vps-generated-${index + 1}`,
      productId: product.id,
      orderId: order.id,
      productName: product.name,
      ipAddress: `103.14.21.${120 + index}`,
      username: "root",
      password: `Meow@${userId.slice(-2)}${index + 1}`,
      status: "ACTIVE",
      panelUrl: `https://panel.meowmarket.vn/services/${product.slug}`
    });
  });

  return services;
}

export function completeOrderWithFulfillment(orderCode: string) {
  const order = orders.find((item) => item.orderCode === orderCode);

  if (!order) {
    return null;
  }

  const assignedCodes = allocateGiftCardCodes(order);
  const provisionedVps = provisionMockVps(order, order.userId);

  return {
    ...order,
    status: "COMPLETED" as const,
    assignedCodes,
    provisionedVps,
    emailDispatch: {
      sent: true,
      to: "user@meowmarket.vn",
      template: "gift-card-delivery"
    }
  };
}
