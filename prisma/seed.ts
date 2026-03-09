import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";
import {
  BannerPlacement,
  GiftCardCodeStatus,
  MediaStorageDriver,
  MediaUsageType,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  PrismaClient,
  ProductType,
  ServiceType,
  TicketPriority,
  TicketStatus,
  UserRole,
  UserStatus,
  VpsInstanceStatus
} from "@prisma/client";

const prisma = new PrismaClient();

type SeedUser = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  avatarUrl: string;
  role: UserRole;
  status: UserStatus;
  notificationsEnabled: boolean;
  createdAt: string;
  passwordHash?: string;
};

type LegacyAuthUser = {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role?: UserRole;
  status?: UserStatus;
  notificationsEnabled?: boolean;
  joinedAt?: string;
  passwordHash?: string;
};

const baseUsers: SeedUser[] = [
  {
    id: "admin-01",
    email: "admin@meowmarket.vn",
    fullName: "Trần Bảo Châu",
    phone: "0987654321",
    avatarUrl: "BC",
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    notificationsEnabled: true,
    createdAt: "2025-04-18T09:00:00.000Z"
  },
  {
    id: "user-01",
    email: "user@meowmarket.vn",
    fullName: "Nguyễn Minh Anh",
    phone: "0901234567",
    avatarUrl: "MA",
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    notificationsEnabled: true,
    createdAt: "2025-09-12T09:00:00.000Z"
  },
  {
    id: "staff-01",
    email: "staff@meowmarket.vn",
    fullName: "Ngô Thanh Vy",
    phone: "0934567890",
    avatarUrl: "TV",
    role: UserRole.STAFF,
    status: UserStatus.ACTIVE,
    notificationsEnabled: true,
    createdAt: "2026-02-14T08:45:00.000Z"
  },
  {
    id: "user-02",
    email: "ha.le@meowmarket.vn",
    fullName: "Lê Thu Hà",
    phone: "0908881122",
    avatarUrl: "LH",
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    notificationsEnabled: true,
    createdAt: "2026-02-26T08:30:00.000Z"
  },
  {
    id: "user-03",
    email: "bao.hoang@meowmarket.vn",
    fullName: "Hoàng Gia Bảo",
    phone: "0911122334",
    avatarUrl: "HB",
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    notificationsEnabled: true,
    createdAt: "2026-02-28T08:30:00.000Z"
  },
  {
    id: "user-04",
    email: "nhi.pham@meowmarket.vn",
    fullName: "Phạm Quỳnh Nhi",
    phone: "0922233445",
    avatarUrl: "PN",
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    notificationsEnabled: true,
    createdAt: "2026-03-03T08:30:00.000Z"
  }
];

async function loadLegacyAuthUsers() {
  const filePath = path.join(process.cwd(), "data", "mock-auth-users.json");

  try {
    const content = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(content) as LegacyAuthUser[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((user) => user.email && user.fullName && user.passwordHash)
      .map<SeedUser>((user) => ({
        id: user.id,
        email: user.email.toLowerCase(),
        fullName: user.fullName,
        phone: user.phone ?? "",
        avatarUrl: user.avatar ?? user.fullName.charAt(0).toUpperCase(),
        role: user.role ?? UserRole.USER,
        status: user.status ?? UserStatus.ACTIVE,
        notificationsEnabled: user.notificationsEnabled ?? true,
        createdAt: user.joinedAt ?? new Date().toISOString(),
        passwordHash: user.passwordHash
      }));
  } catch {
    return [];
  }
}

const topCategories = [
  ["cat-vps", "VPS", "vps", "Máy chủ ảo ổn định", "server", 1],
  ["cat-cloud", "Cloud", "cloud", "Cloud server, GPU và gaming", "cloud", 2],
  ["cat-gift-card", "Gift Card", "gift-card", "Gift card quốc tế", "gift", 3],
  ["cat-game-card", "Thẻ Game", "the-game", "Thẻ game Việt Nam", "ticket", 4]
] as const;

const childCategories = [
  ["cat-vps", "cat-vps-basic", "VPS Basic", "vps-basic", "Gói cơ bản", "server", 1],
  ["cat-vps", "cat-vps-gaming", "VPS Gaming", "vps-gaming", "Gói cho game", "server", 2],
  ["cat-vps", "cat-vps-premium", "VPS Premium", "vps-premium", "Gói hiệu năng cao", "server", 3],
  ["cat-vps", "cat-vps-windows", "VPS Windows", "vps-windows", "Cài sẵn Windows", "server", 4],
  ["cat-vps", "cat-vps-linux", "VPS Linux", "vps-linux", "Tối ưu Linux", "server", 5],
  ["cat-cloud", "cat-cloud-server", "Cloud Server", "cloud-server", "Cloud linh hoạt", "cloud", 1],
  ["cat-cloud", "cat-cloud-gpu", "Cloud GPU", "cloud-gpu", "GPU cho AI", "cloud", 2],
  ["cat-cloud", "cat-cloud-gaming", "Cloud Gaming", "cloud-gaming", "Cloud gaming", "cloud", 3],
  ["cat-cloud", "cat-cloud-workstation", "Cloud Workstation", "cloud-workstation", "Máy trạm cloud", "cloud", 4],
  ["cat-gift-card", "cat-steam", "Steam Wallet", "steam-wallet", "Nạp Steam", "gift", 1],
  ["cat-gift-card", "cat-google-play", "Google Play", "google-play", "Gift card Android", "gift", 2],
  ["cat-gift-card", "cat-app-store", "App Store", "app-store", "Gift card Apple", "gift", 3],
  ["cat-game-card", "cat-garena", "Garena", "garena", "Thẻ Garena", "ticket", 1],
  ["cat-game-card", "cat-zing", "Zing", "zing", "Thẻ Zing", "ticket", 2],
  ["cat-game-card", "cat-funcard", "Funcard", "funcard", "Thẻ Funcard", "ticket", 3]
] as const;

const products = [
  ["prod-vps-basic", "VPS Basic", "vps-basic", "Khởi chạy website và bot ổn định.", "Gói VPS cơ bản cho web và bot.", ProductType.VPS, "cat-vps-basic", 189000, 229000, 48, 4.8, 124, true, true, true, ["SSD NVMe", "IPv4 riêng"], "/images/products/vps-basic.svg", "2 vCPU", "4 GB", "80 GB NVMe", "3 TB", "Ubuntu 22.04 / Windows Server", null],
  ["prod-vps-gaming", "VPS Gaming", "vps-gaming", "Tối ưu game server và độ trễ thấp.", "VPS cho game, stream và workload nhạy cảm độ trễ.", ProductType.VPS, "cat-vps-gaming", 359000, 419000, 26, 4.9, 88, true, true, false, ["Game ready", "Triển khai nhanh"], "/images/products/vps-gaming.svg", "4 vCPU", "8 GB", "160 GB NVMe", "5 TB", "Windows / Ubuntu", null],
  ["prod-vps-premium", "VPS Premium", "vps-premium", "Hạ tầng mạnh cho vận hành thực tế.", "VPS cho vận hành thực tế với ảnh hệ thống định kỳ.", ProductType.VPS, "cat-vps-premium", 699000, 799000, 12, 4.9, 61, false, true, false, ["Hiệu năng cao", "Ảnh hệ thống"], "/images/products/vps-premium.svg", "8 vCPU", "16 GB", "320 GB NVMe", "8 TB", "Ubuntu / Windows", null],
  ["prod-cloud-server", "Cloud Server", "cloud-server", "Mở rộng linh hoạt theo nhu cầu compute.", "Cloud server cho hệ thống cần scale và snapshot nhanh.", ProductType.CLOUD, "cat-cloud-server", 499000, 590000, 31, 4.7, 73, true, false, true, ["Scale", "Snapshot"], "/images/products/cloud-server.svg", null, null, null, null, null, null],
  ["prod-cloud-gaming", "Cloud Gaming", "cloud-gaming", "Cloud gaming đồ họa tốt.", "Cloud gaming cho người dùng cần GPU và launcher nhanh.", ProductType.CLOUD, "cat-cloud-gaming", 569000, 639000, 22, 4.6, 102, true, true, true, ["Low latency", "GPU ready"], "/images/products/cloud-gaming.svg", null, null, null, null, null, null],
  ["prod-cloud-gpu", "Cloud GPU", "cloud-gpu", "GPU cloud cho AI và render.", "Cloud GPU cho training, inference và render.", ProductType.CLOUD, "cat-cloud-gpu", 1499000, 1699000, 9, 4.8, 49, false, true, false, ["AI workflow", "Burst compute"], "/images/products/cloud-gpu.svg", null, null, null, null, null, null],
  ["prod-steam-wallet", "Steam Wallet 200K", "steam-wallet-200k", "Gift card Steam nhận mã ngay.", "Steam Wallet 200K cấp code tự động sau thanh toán.", ProductType.GIFTCARD, "cat-steam", 200000, 215000, 150, 4.9, 217, true, true, true, ["Tự động giao", "Steam"], "/images/products/steam-wallet.svg", null, null, null, null, null, { denominationOptions: [{ label: "200.000đ", value: 200000 }] }],
  ["prod-google-play", "Google Play 500K", "google-play-500k", "Gift card Google Play cho app và game.", "Google Play 500K cấp code tự động.", ProductType.GIFTCARD, "cat-google-play", 500000, 525000, 84, 4.7, 91, false, false, false, ["Android", "Nhanh"], "/images/products/google-play.svg", null, null, null, null, null, { denominationOptions: [{ label: "500.000đ", value: 500000 }] }],
  ["prod-app-store", "App Store 50 USD", "app-store-50usd", "Gift card cho hệ sinh thái Apple.", "App Store 50 USD dùng cho app và subscription.", ProductType.GIFTCARD, "cat-app-store", 1290000, 1350000, 17, 4.8, 64, false, true, false, ["Apple", "Global"], "/images/products/app-store.svg", null, null, null, null, null, { denominationOptions: [{ label: "50 USD", value: 1290000 }] }],
  ["prod-garena", "Thẻ Garena 100K", "the-garena-100k", "Thẻ Garena nạp nhanh.", "Thẻ Garena giao mã tức thời và an toàn.", ProductType.GAMECARD, "cat-garena", 100000, 105000, 96, 4.8, 145, true, true, true, ["Mã tức thời", "Phổ biến"], "/images/products/garena.svg", null, null, null, null, null, null],
  ["prod-zing", "Thẻ Zing 200K", "the-zing-200k", "Thẻ Zing cho game online.", "Thẻ Zing giao mã tự động trên thiết bị di động.", ProductType.GAMECARD, "cat-zing", 200000, 208000, 54, 4.6, 52, false, false, false, ["Di động"], "/images/products/zing.svg", null, null, null, null, null, null],
  ["prod-funcard", "Funcard 500K", "funcard-500k", "Funcard dung lượng lớn.", "Funcard 500K cho giao dịch ổn định.", ProductType.GAMECARD, "cat-funcard", 500000, 518000, 11, 4.5, 31, false, true, false, ["Hỗ trợ nhanh"], "/images/products/funcard.svg", null, null, null, null, null, null]
] as const;

const reviews = [
  ["review-01", "prod-vps-basic", "user-04", 5, "Thiết lập nhanh và dễ dùng", "Thông tin IP và mật khẩu hiển thị rõ trong trang cá nhân.", "2026-02-20T08:00:00.000Z"],
  ["review-02", "prod-steam-wallet", "user-03", 5, "Gift card giao mã mượt", "Thanh toán xong nhận mã ngay trong đơn hàng.", "2026-02-22T08:00:00.000Z"],
  ["review-03", "prod-cloud-gaming", "user-02", 4, "Cloud gaming đẹp", "Thanh toán trên điện thoại không bị rối.", "2026-02-25T08:00:00.000Z"],
  ["review-04", "prod-vps-gaming", "user-01", 5, "Độ trễ rất tốt", "Hợp cho máy chủ game và bot game.", "2026-03-01T08:00:00.000Z"]
] as const;

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);
  const legacyUsers = await loadLegacyAuthUsers();
  const mergedUsers = new Map<string, SeedUser>();

  for (const user of baseUsers) {
    mergedUsers.set(user.email, user);
  }

  for (const legacyUser of legacyUsers) {
    mergedUsers.set(legacyUser.email, legacyUser);
  }

  await prisma.passwordResetToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.couponUsage.deleteMany();
  await prisma.ticketMessage.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.vpsInstance.deleteMany();
  await prisma.serviceRecord.deleteMany();
  await prisma.giftCardCode.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  for (const user of mergedUsers.values()) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        role: user.role,
        status: user.status,
        notificationsEnabled: user.notificationsEnabled,
        passwordHash: user.passwordHash ?? passwordHash,
        createdAt: new Date(user.createdAt)
      }
    });
  }

  for (const [id, name, slug, description, iconUrl, sortOrder] of topCategories) {
    await prisma.category.create({
      data: { id, name, slug, description, iconUrl, sortOrder, isVisible: true }
    });
  }

  for (const [parentId, id, name, slug, description, iconUrl, sortOrder] of childCategories) {
    await prisma.category.create({
      data: { id, parentId, name, slug, description, iconUrl, sortOrder, isVisible: true }
    });
  }

  await prisma.siteSetting.create({
    data: {
      id: "site-default",
      siteName: "MeowMarket",
      supportEmail: "mieowshopsite@gmail.com",
      hotline: "1900 6868",
      logoUrl: "/logos/meowmarket-logo.svg",
      faviconUrl: "/favicons/favicon.gif",
      primaryColor: "#FF7FA9",
      secondaryColor: "#6C8CFF",
      seoTitle: "MeowMarket | Sàn dịch vụ số cho người dùng Việt",
      seoDescription: "Nền tảng cung cấp VPS, cloud gaming, gift card và thẻ game với hệ thống thanh toán nhanh chóng và minh bạch."
    }
  });

  await prisma.banner.createMany({
    data: [
      {
        id: "banner-hero-01",
        title: "Sàn dịch vụ số cho người dùng Việt",
        subtitle: "Mềm mại, đáng tin cậy, tối ưu như startup công nghệ",
        description: "Mua VPS, cloud gaming, gift card và thẻ game với luồng thanh toán rõ ràng.",
        imageUrl: "/images/banners/hero-vps-banner.jpg",
        ctaLabel: "Mua ngay",
        ctaLink: "/products",
        placement: BannerPlacement.HERO,
        sortOrder: 1
      },
      {
        id: "banner-promo-01",
        title: "Ưu đãi cloud gaming cuối tuần",
        subtitle: "Giảm đến 12% cho người dùng mới",
        description: "Áp dụng cho dịch vụ cloud gaming và cloud server.",
        imageUrl: "/images/banners/cloud-weekend.jpg",
        ctaLabel: "Xem ưu đãi",
        ctaLink: "/products?promotion=true",
        placement: BannerPlacement.PROMOTION,
        sortOrder: 2
      }
    ]
  });

  await prisma.faqItem.createMany({
    data: [
      { id: "faq-01", question: "Nhận mã gift card ở đâu?", answer: "Mã hiển thị trong chi tiết đơn hàng và trang cá nhân.", category: "Gift Card", sortOrder: 1 },
      { id: "faq-02", question: "VPS được tạo sau thanh toán như thế nào?", answer: "Hệ thống tạo bản ghi dịch vụ và máy chủ mẫu với IP, tên đăng nhập, mật khẩu.", category: "VPS", sortOrder: 2 },
      { id: "faq-03", question: "Hỗ trợ cổng thanh toán nào?", answer: "VNPay, MoMo và ZaloPay đã sẵn sàng cho luồng thanh toán.", category: "Thanh toán", sortOrder: 3 },
      { id: "faq-04", question: "Tài khoản và session lưu ở đâu?", answer: "Tài khoản, password hash và session đều được quản lý trong PostgreSQL.", category: "Bảo mật", sortOrder: 4 }
    ]
  });

  await prisma.coupon.createMany({
    data: [
      { id: "coupon-01", code: "MEOW10", description: "Giảm 10% cho người dùng mới", discountType: "PERCENT", discountValue: 10, minOrderValue: 200000, usageLimit: 200, usedCount: 0, startsAt: new Date("2026-01-01T00:00:00.000Z"), endsAt: new Date("2026-12-31T23:59:59.000Z"), isActive: true },
      { id: "coupon-02", code: "CLOUD30", description: "Giảm 30.000đ cho cloud", discountType: "FIXED", discountValue: 30000, minOrderValue: 400000, usageLimit: 100, usedCount: 1, startsAt: new Date("2026-01-01T00:00:00.000Z"), endsAt: new Date("2026-12-31T23:59:59.000Z"), isActive: true }
    ]
  });

  for (const product of products) {
    const [id, name, slug, shortDescription, description, type, categoryId, price, compareAtPrice, stock, rating, reviewsCount, isFeatured, isHot, isPromotion, tags, defaultImageUrl, cpu, ram, storage, bandwidth, operatingSystem, metadata] = product;
    await prisma.product.create({
      data: {
        id,
        name,
        slug,
        shortDescription,
        description,
        type,
        categoryId,
        price,
        compareAtPrice,
        stock,
        rating,
        reviewsCount,
        isPublished: true,
        isFeatured,
        isHot,
        isPromotion,
        tags: [...tags],
        defaultImageUrl,
        cpu,
        ram,
        storage,
        bandwidth,
        operatingSystem,
        metadata: metadata ?? undefined,
        seoTitle: `${name} | MeowMarket`,
        seoDescription: shortDescription
      }
    });

    await prisma.productImage.create({
      data: {
        id: `${id}-image`,
        productId: id,
        imageUrl: defaultImageUrl,
        altText: name,
        isPrimary: true
      }
    });
  }

  for (const [id, productId, userId, rating, title, content, createdAt] of reviews) {
    await prisma.review.create({
      data: {
        id,
        productId,
        userId,
        rating,
        title,
        content,
        verifiedPurchase: true,
        createdAt: new Date(createdAt)
      }
    });
  }

  await prisma.favorite.createMany({
    data: [
      { id: "fav-01", userId: "user-01", productId: "prod-vps-gaming", createdAt: new Date("2026-03-01T18:00:00.000Z") },
      { id: "fav-02", userId: "user-01", productId: "prod-cloud-gaming", createdAt: new Date("2026-03-02T18:00:00.000Z") }
    ]
  });

  await prisma.order.createMany({
    data: [
      { id: "order-01", orderCode: "MM240301", status: OrderStatus.COMPLETED, subtotal: 389000, discount: 0, total: 389000, adminNote: "Cấp code và VPS ngay sau xác nhận.", createdAt: new Date("2026-03-01T10:30:00.000Z"), completedAt: new Date("2026-03-01T10:35:00.000Z"), userId: "user-01" },
      { id: "order-02", orderCode: "MM240286", status: OrderStatus.PROCESSING, subtotal: 599000, discount: 30000, total: 569000, note: "Ưu tiên node TP.HCM.", createdAt: new Date("2026-02-27T14:00:00.000Z"), userId: "user-01" },
      { id: "order-03", orderCode: "MM240270", status: OrderStatus.PENDING, subtotal: 100000, discount: 0, total: 100000, createdAt: new Date("2026-02-24T08:00:00.000Z"), userId: "user-01" },
      { id: "order-04", orderCode: "MM240315", status: OrderStatus.PAID, subtotal: 1499000, discount: 0, total: 1499000, createdAt: new Date("2026-03-05T09:20:00.000Z"), userId: "user-02" }
    ]
  });

  await prisma.orderItem.createMany({
    data: [
      { id: "item-01", orderId: "order-01", productId: "prod-vps-basic", quantity: 1, unitPrice: 189000, totalPrice: 189000 },
      { id: "item-02", orderId: "order-01", productId: "prod-steam-wallet", quantity: 1, unitPrice: 200000, totalPrice: 200000 },
      { id: "item-03", orderId: "order-02", productId: "prod-cloud-gaming", quantity: 1, unitPrice: 599000, totalPrice: 599000 },
      { id: "item-04", orderId: "order-03", productId: "prod-garena", quantity: 1, unitPrice: 100000, totalPrice: 100000 },
      { id: "item-05", orderId: "order-04", productId: "prod-cloud-gpu", quantity: 1, unitPrice: 1499000, totalPrice: 1499000 }
    ]
  });

  await prisma.payment.createMany({
    data: [
      { id: "pay-01", gateway: PaymentMethod.VNPAY, status: PaymentStatus.SUCCESS, amount: 389000, transactionCode: "VNPAY-MM240301-20260301", callbackLog: ["VNPay xác nhận thanh toán thành công"], createdAt: new Date("2026-03-01T10:32:00.000Z"), paidAt: new Date("2026-03-01T10:32:00.000Z"), orderId: "order-01", userId: "user-01" },
      { id: "pay-02", gateway: PaymentMethod.MOMO, status: PaymentStatus.SUCCESS, amount: 569000, transactionCode: "MOMO-MM240286-20260227", callbackLog: ["MoMo xác nhận thanh toán thành công"], createdAt: new Date("2026-02-27T14:02:00.000Z"), paidAt: new Date("2026-02-27T14:02:00.000Z"), orderId: "order-02", userId: "user-01" },
      { id: "pay-03", gateway: PaymentMethod.ZALOPAY, status: PaymentStatus.PENDING, amount: 100000, callbackLog: ["Đang chờ thanh toán"], createdAt: new Date("2026-02-24T08:01:00.000Z"), orderId: "order-03", userId: "user-01" },
      { id: "pay-04", gateway: PaymentMethod.VNPAY, status: PaymentStatus.SUCCESS, amount: 1499000, transactionCode: "VNPAY-MM240315-20260305", callbackLog: ["VNPay xác nhận thanh toán thành công"], createdAt: new Date("2026-03-05T09:25:00.000Z"), paidAt: new Date("2026-03-05T09:25:00.000Z"), orderId: "order-04", userId: "user-02" }
    ]
  });

  await prisma.couponUsage.create({
    data: { id: "coupon-usage-01", couponId: "coupon-02", userId: "user-01", orderId: "order-02", usedAt: new Date("2026-02-27T14:00:00.000Z") }
  });

  await prisma.giftCardCode.createMany({
    data: [
      { id: "gift-01", productId: "prod-steam-wallet", code: "STEAM-2Q9A-KT73-PM41", status: GiftCardCodeStatus.SOLD, createdAt: new Date("2026-02-10T09:00:00.000Z"), orderId: "order-01", reservedAt: new Date("2026-03-01T10:32:00.000Z"), soldAt: new Date("2026-03-01T10:35:00.000Z") },
      { id: "gift-02", productId: "prod-steam-wallet", code: "STEAM-AB12-CD34-EF56", status: GiftCardCodeStatus.AVAILABLE, createdAt: new Date("2026-02-11T09:00:00.000Z") },
      { id: "gift-03", productId: "prod-google-play", code: "GPAY-QR78-ST90-UV12", status: GiftCardCodeStatus.AVAILABLE, createdAt: new Date("2026-02-12T09:00:00.000Z") },
      { id: "gift-04", productId: "prod-garena", code: "GARENA-WX34-YZ56-AB78", status: GiftCardCodeStatus.AVAILABLE, createdAt: new Date("2026-02-13T09:00:00.000Z") }
    ]
  });

  await prisma.serviceRecord.createMany({
    data: [
      { id: "service-01", type: ServiceType.VPS, serviceName: "VPS Basic - Hà Nội Zone", status: "ACTIVE", deliveryLog: ["Tạo bản ghi dịch vụ", "Khởi tạo máy chủ", "Gửi thông tin"], createdAt: new Date("2026-03-01T10:34:00.000Z"), renewAt: new Date("2026-04-01T10:34:00.000Z"), userId: "user-01", orderId: "order-01", productId: "prod-vps-basic" },
      { id: "service-02", type: ServiceType.CLOUD, serviceName: "Cloud Gaming - HCM GPU Pool", status: "PROCESSING", deliveryLog: ["Tạo bản ghi dịch vụ", "Đang chờ nút GPU"], createdAt: new Date("2026-02-27T14:12:00.000Z"), renewAt: new Date("2026-03-27T14:12:00.000Z"), userId: "user-01", orderId: "order-02", productId: "prod-cloud-gaming" },
      { id: "service-03", type: ServiceType.CLOUD, serviceName: "Cloud GPU - AI Starter", status: "ACTIVE", deliveryLog: ["Tạo bản ghi dịch vụ", "Cấp nút GPU", "Gửi thông tin"], createdAt: new Date("2026-03-05T09:30:00.000Z"), renewAt: new Date("2026-04-05T09:30:00.000Z"), userId: "user-02", orderId: "order-04", productId: "prod-cloud-gpu" }
    ]
  });

  await prisma.vpsInstance.create({
    data: {
      id: "vps-01",
      ipAddress: "103.14.21.110",
      username: "root",
      password: "Meow@2026",
      renewDate: new Date("2026-04-01T10:34:00.000Z"),
      controlPanelUrl: "https://panel.meowmarket.vn/services/vps-01",
      status: VpsInstanceStatus.ACTIVE,
      createdAt: new Date("2026-03-01T10:34:00.000Z"),
      userId: "user-01",
      productId: "prod-vps-basic",
      serviceRecordId: "service-01"
    }
  });

  await prisma.supportTicket.createMany({
    data: [
      { id: "ticket-01", subject: "Cần reset mật khẩu VPS", content: "Nhờ đội hỗ trợ reset mật khẩu instance VPS Basic.", category: "VPS", status: TicketStatus.IN_PROGRESS, priority: TicketPriority.HIGH, createdAt: new Date("2026-03-02T11:00:00.000Z"), userId: "user-01", orderId: "order-01" },
      { id: "ticket-02", subject: "Gift card chưa thấy email", content: "Cần kiểm tra email giao code Steam Wallet.", category: "Gift Card", status: TicketStatus.RESOLVED, priority: TicketPriority.MEDIUM, createdAt: new Date("2026-02-28T16:00:00.000Z"), userId: "user-01", orderId: "order-01" }
    ]
  });

  await prisma.ticketMessage.createMany({
    data: [
      { id: "msg-01", ticketId: "ticket-01", senderType: "USER", body: "Nhờ đội hỗ trợ reset mật khẩu instance VPS Basic.", createdAt: new Date("2026-03-02T11:00:00.000Z") },
      { id: "msg-02", ticketId: "ticket-01", senderType: "ADMIN", body: "Đội kỹ thuật đã tiếp nhận, sẽ phản hồi trong 15 phút.", createdAt: new Date("2026-03-02T11:10:00.000Z") },
      { id: "msg-03", ticketId: "ticket-02", senderType: "USER", body: "Cần kiểm tra email giao code Steam Wallet.", createdAt: new Date("2026-02-28T16:00:00.000Z") },
      { id: "msg-04", ticketId: "ticket-02", senderType: "ADMIN", body: "Code đã được gửi lại vào email và cũng hiển thị trong đơn hàng.", createdAt: new Date("2026-02-28T16:08:00.000Z") }
    ]
  });

  await prisma.notification.createMany({
    data: [
      { id: "noti-01", userId: "user-01", title: "Gift card đã được giao", description: "Mã Steam Wallet của bạn đã xuất hiện trong chi tiết đơn hàng.", type: "ORDER", level: "SUCCESS", isRead: false, createdAt: new Date("2026-03-01T10:36:00.000Z"), link: "/profile/orders/MM240301" },
      { id: "noti-02", userId: "user-01", title: "Phiếu hỗ trợ có phản hồi mới", description: "Đội hỗ trợ đã cập nhật phiếu reset mật khẩu VPS.", type: "TICKET", level: "INFO", isRead: false, createdAt: new Date("2026-03-02T11:12:00.000Z"), link: "/profile/tickets/ticket-01" },
      { id: "noti-03", title: "Cảnh báo tồn kho thấp", description: "Funcard 500K và Cloud GPU đang cần bổ sung tồn kho.", type: "STOCK", level: "WARNING", isRead: false, createdAt: new Date("2026-03-03T09:00:00.000Z"), link: "/admin/giftcards" },
      { id: "noti-04", title: "Thanh toán MoMo thất bại", description: "Có phản hồi lỗi cần kiểm tra nhật ký giao dịch.", type: "PAYMENT", level: "DANGER", isRead: true, createdAt: new Date("2026-03-04T10:30:00.000Z"), link: "/admin/payments" }
    ]
  });

  await prisma.mediaAsset.createMany({
    data: [
      { id: "media-01", fileName: "logo-meowmarket.svg", fileUrl: "/logos/meowmarket-logo.svg", altText: "Logo MeowMarket", fileType: "image/svg+xml", size: 18240, usageType: MediaUsageType.LOGO, driver: MediaStorageDriver.LOCAL, uploadedBy: "admin-01", createdAt: new Date("2026-02-18T08:00:00.000Z") },
      { id: "media-02", fileName: "hero-vps-banner.jpg", fileUrl: "/images/banners/hero-vps-banner.jpg", altText: "Banner hero dịch vụ VPS", fileType: "image/jpeg", size: 248000, usageType: MediaUsageType.BANNER, driver: MediaStorageDriver.LOCAL, uploadedBy: "admin-01", createdAt: new Date("2026-02-19T08:00:00.000Z") },
      { id: "media-03", fileName: "steam-wallet-thumb.png", fileUrl: "/images/products/steam-wallet-thumb.png", altText: "Ảnh sản phẩm Steam Wallet", fileType: "image/png", size: 121000, usageType: MediaUsageType.PRODUCT_IMAGE, driver: MediaStorageDriver.LOCAL, uploadedBy: "admin-01", createdAt: new Date("2026-02-19T09:00:00.000Z") }
    ]
  });

  await prisma.auditLog.createMany({
    data: [
      { id: "audit-01", action: "Cập nhật banner", resource: "Banner", resourceId: "banner-hero-01", detail: "Đổi CTA sang Mua ngay.", createdAt: new Date("2026-03-05T08:15:00.000Z"), actorId: "admin-01" },
      { id: "audit-02", action: "Nhập gift card", resource: "GiftCardCode", resourceId: "batch-20260306", detail: "Nhập thêm 120 mã Steam Wallet 200K.", createdAt: new Date("2026-03-06T09:40:00.000Z"), actorId: "admin-01" },
      { id: "audit-03", action: "Chuyển trạng thái đơn", resource: "Order", resourceId: "MM240301", detail: "Cập nhật đơn sang COMPLETED.", createdAt: new Date("2026-03-01T10:35:00.000Z"), actorId: "admin-01" }
    ]
  });

  console.log("Seed completed", {
    users: mergedUsers.size,
    products: products.length,
    orders: 4
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
