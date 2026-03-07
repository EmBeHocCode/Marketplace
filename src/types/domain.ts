export type UserRole = "USER" | "ADMIN";
export type ProductType = "VPS" | "CLOUD" | "GIFTCARD" | "GAMECARD";
export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentMethod = "VNPAY" | "MOMO" | "ZALOPAY" | "CRYPTO";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type GiftCardCodeStatus = "AVAILABLE" | "SOLD" | "USED";
export type VpsInstanceStatus = "PROVISIONING" | "ACTIVE" | "SUSPENDED";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  children?: Category[];
}

export interface ProductSpecs {
  cpu?: string;
  ram?: string;
  storage?: string;
  bandwidth?: string;
  os?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  type: ProductType;
  categoryId: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  isHot: boolean;
  isPromotion: boolean;
  tags: string[];
  specs?: ProductSpecs;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  placement: "HERO" | "SIDEBAR" | "PROMOTION";
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  joinedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  createdAt: string;
}

export interface GiftCardCode {
  id: string;
  productId: string;
  code: string;
  status: GiftCardCodeStatus;
  createdAt: string;
}

export interface VpsService {
  id: string;
  productId: string;
  orderId: string;
  productName: string;
  ipAddress: string;
  username: string;
  password: string;
  status: VpsInstanceStatus;
  panelUrl: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderCode: string;
  userId: string;
  status: OrderStatus;
  createdAt: string;
  total: number;
  discount: number;
  items: OrderItem[];
  payment: Payment;
  assignedCodes?: GiftCardCode[];
  provisionedVps?: VpsService[];
}

export interface TicketMessage {
  id: string;
  sender: "USER" | "ADMIN";
  body: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  category: string;
  status: TicketStatus;
  createdAt: string;
  messages: TicketMessage[];
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "PERCENT" | "FIXED";
  discountValue: number;
  minOrderValue: number;
  isActive: boolean;
}

export interface ProductFilters {
  q?: string;
  category?: string;
  type?: ProductType;
  promotion?: boolean;
  sort?: "featured" | "price-asc" | "price-desc" | "rating";
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
