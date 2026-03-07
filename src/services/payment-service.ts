import { Coupon, PaymentMethod } from "@/types/domain";

export const paymentMethods: Array<{
  id: PaymentMethod;
  name: string;
  description: string;
}> = [
  {
    id: "VNPAY",
    name: "VNPay",
    description: "Phù hợp thanh toán nội địa nhanh với QR và ngân hàng."
  },
  {
    id: "MOMO",
    name: "Momo",
    description: "Ví điện tử phổ biến, xác nhận giao dịch nhanh."
  },
  {
    id: "ZALOPAY",
    name: "ZaloPay",
    description: "Luồng thanh toán thuận tiện trên mobile."
  },
  {
    id: "CRYPTO",
    name: "Crypto",
    description: "Cấu trúc đã sẵn sàng cho thanh toán tiền mã hóa."
  }
];

export const coupons: Coupon[] = [
  {
    id: "coupon-01",
    code: "MEOW10",
    description: "Giảm 10% cho user mới",
    discountType: "PERCENT",
    discountValue: 10,
    minOrderValue: 200000,
    isActive: true
  },
  {
    id: "coupon-02",
    code: "CLOUD30",
    description: "Giảm 30.000đ cho cloud products",
    discountType: "FIXED",
    discountValue: 30000,
    minOrderValue: 400000,
    isActive: true
  }
];

export function validateCoupon(code: string, subtotal: number) {
  const coupon = coupons.find(
    (item) => item.code.toLowerCase() === code.toLowerCase() && item.isActive
  );

  if (!coupon) {
    return { coupon: null, discount: 0 };
  }

  if (subtotal < coupon.minOrderValue) {
    return { coupon, discount: 0 };
  }

  const discount =
    coupon.discountType === "PERCENT"
      ? Math.round((subtotal * coupon.discountValue) / 100)
      : coupon.discountValue;

  return { coupon, discount };
}
