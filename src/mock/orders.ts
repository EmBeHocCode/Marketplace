import { Order } from "@/types/domain";

export const orders: Order[] = [
  {
    id: "order-01",
    orderCode: "MM240301",
    userId: "user-01",
    status: "COMPLETED",
    createdAt: "2026-03-01T10:30:00.000Z",
    total: 389000,
    discount: 0,
    items: [
      {
        id: "item-01",
        productId: "prod-vps-basic",
        quantity: 1,
        unitPrice: 189000,
        totalPrice: 189000
      },
      {
        id: "item-02",
        productId: "prod-steam-wallet",
        quantity: 1,
        unitPrice: 200000,
        totalPrice: 200000
      }
    ],
    payment: {
      id: "pay-01",
      orderId: "order-01",
      method: "VNPAY",
      status: "PAID",
      amount: 389000,
      createdAt: "2026-03-01T10:32:00.000Z"
    },
    assignedCodes: [
      {
        id: "gc-01",
        productId: "prod-steam-wallet",
        code: "STEAM-2Q9A-KT73-PM41",
        status: "SOLD",
        createdAt: "2026-03-01T10:33:00.000Z"
      }
    ],
    provisionedVps: [
      {
        id: "vps-01",
        productId: "prod-vps-basic",
        orderId: "order-01",
        productName: "VPS Basic",
        ipAddress: "103.14.21.110",
        username: "root",
        password: "Meow@2026",
        status: "ACTIVE",
        panelUrl: "https://panel.meowmarket.vn/services/vps-01"
      }
    ]
  },
  {
    id: "order-02",
    orderCode: "MM240286",
    userId: "user-01",
    status: "PROCESSING",
    createdAt: "2026-02-27T14:00:00.000Z",
    total: 569000,
    discount: 30000,
    items: [
      {
        id: "item-03",
        productId: "prod-cloud-gaming",
        quantity: 1,
        unitPrice: 599000,
        totalPrice: 599000
      }
    ],
    payment: {
      id: "pay-02",
      orderId: "order-02",
      method: "MOMO",
      status: "PAID",
      amount: 569000,
      createdAt: "2026-02-27T14:02:00.000Z"
    }
  },
  {
    id: "order-03",
    orderCode: "MM240270",
    userId: "user-01",
    status: "PENDING",
    createdAt: "2026-02-24T08:00:00.000Z",
    total: 100000,
    discount: 0,
    items: [
      {
        id: "item-04",
        productId: "prod-garena",
        quantity: 1,
        unitPrice: 100000,
        totalPrice: 100000
      }
    ],
    payment: {
      id: "pay-03",
      orderId: "order-03",
      method: "ZALOPAY",
      status: "PENDING",
      amount: 100000,
      createdAt: "2026-02-24T08:01:00.000Z"
    }
  }
];
