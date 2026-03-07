import {
  faGift,
  faHeadset,
  faServer,
  faTags,
  faTicket
} from "@fortawesome/free-solid-svg-icons";

export const siteConfig = {
  name: "MeowMarket",
  title: "MeowMarket | Marketplace dịch vụ số đáng tin cậy",
  description:
    "MeowMarket là marketplace dịch vụ số cho thị trường Việt Nam với VPS, cloud server, gift card, thẻ game và nhiều sản phẩm số khác.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  contactEmail: "mieowshopsite@gmail.com",
  hotline: "1900 6868",
  socials: [
    { label: "Facebook", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Discord", href: "#" }
  ]
};

export const publicNavItems = [
  { label: "VPS", href: "/products?type=VPS", icon: faServer },
  { label: "Cloud", href: "/products?type=CLOUD", icon: faServer },
  { label: "Gift Card", href: "/products?type=GIFTCARD", icon: faGift },
  { label: "Thẻ Game", href: "/products?type=GAMECARD", icon: faTicket },
  { label: "Khuyến mãi", href: "/products?promotion=true", icon: faTags },
  { label: "Hỗ trợ", href: "/support", icon: faHeadset }
];

export const userSidebarItems = [
  { label: "Tài khoản", href: "/profile/account", icon: "user" },
  { label: "Đổi mật khẩu", href: "/profile/security", icon: "lock" },
  { label: "Đơn hàng", href: "/profile/orders", icon: "receipt" },
  { label: "Lịch sử thanh toán", href: "/profile/payments", icon: "wallet" },
  { label: "Sản phẩm đã mua", href: "/profile/purchases", icon: "bag-shopping" },
  { label: "Ticket hỗ trợ", href: "/profile/tickets", icon: "life-ring" },
  { label: "Wishlist", href: "/profile/wishlist", icon: "heart" },
  { label: "My Services", href: "/profile/services", icon: "server" }
];

export const adminSidebarItems = [
  { label: "Tổng quan", href: "/admin", icon: "chart-line" },
  { label: "Sản phẩm", href: "/admin/products", icon: "box-open" },
  { label: "Đơn hàng", href: "/admin/orders", icon: "receipt" },
  { label: "Người dùng", href: "/admin/users", icon: "users" },
  { label: "Ticket", href: "/admin/tickets", icon: "life-ring" },
  { label: "Coupon", href: "/admin/coupons", icon: "ticket" },
  { label: "Banner", href: "/admin/banners", icon: "images" },
  { label: "Cài đặt", href: "/admin/settings", icon: "gear" }
];
