# MeowMarket

MeowMarket la website marketplace ban dich vu so cho thi truong Viet Nam, duoc xay dung theo huong de mo rong thanh nen tang production sau nay.

UI theo dinh huong:
- cute
- de thuong
- than thien
- nhung van chuyen nghiep nhu mot startup cong nghe

Brand concept:
- tong mau mem mai voi pink, soft blue, accent vang
- hinh anh va chi tiet visual goi nho chu de meo
- marketplace layout ro rang, de tim kiem, de mua va de quan ly don

## Tinh nang chinh

### Public site
- Trang chu co hero banner, danh muc noi bat, san pham hot, khuyen mai, huong dan mua hang, review, FAQ, CTA
- Trang danh sach san pham co filter sidebar, sort, search, pagination
- Trang chi tiet san pham co thong tin gia, cau hinh, mo ta, FAQ, review, san pham tuong tu
- Gio hang voi coupon va tong tien
- Checkout voi thong tin khach, payment method, order summary
- Search san pham tai header
- Trang ho tro, lien he, chinh sach, tra cuu don hang
- Login / register voi validation

### User dashboard
- Thong tin tai khoan
- Doi mat khau
- Don hang
- Lich su thanh toan
- San pham da mua
- Ticket ho tro
- Wishlist
- My Services cho VPS da provision

### Admin dashboard
- Dashboard overview
- Product management
- Order management
- User management
- Ticket support
- Coupon management
- Banner management
- System settings
- Charts bang `recharts`

### Backend-ready architecture
- Tach `types`, `mock`, `services`, `components`, `layouts`, `modules`
- Co `Next.js API routes` de mock backend layer ban dau
- Co `Prisma schema` cho PostgreSQL
- Co `middleware` cho protected routes va role-based access
- San sang de tach backend rieng sau nay, vi du NestJS

## Nhom san pham

- VPS
  - VPS Basic
  - VPS Gaming
  - VPS Premium
- Cloud
  - Cloud Server
  - Cloud GPU
  - Cloud Gaming
- Gift Card
  - Steam Wallet
  - Google Play
  - App Store
  - PSN
  - Xbox
  - Nintendo
- The Game
  - Garena
  - Zing
  - Vcoin
  - SohaCoin
  - Funcard

## Tech stack

### Frontend
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- FontAwesome
- Zustand
- React Hook Form
- Zod

### Data / backend layer
- Next.js API Routes
- Prisma ORM
- PostgreSQL

### Dashboard / charts
- Recharts

### Deployment target
- Frontend: Vercel
- Backend / database: VPS hoac infrastructure rieng

## Cau truc thu muc

```text
/src
  /app
    /(public)
    /(auth)
    /(dashboard)
    /(admin)
    /api
  /components
    /ui
    /layout
    /product
    /dashboard
    /forms
  /layouts
  /modules
  /services
  /lib
  /hooks
  /types
  /mock
  /config
  /utils
/prisma
```

## Route chinh

### Public
- `/`
- `/products`
- `/products/[slug]`
- `/search`
- `/cart`
- `/checkout`
- `/support`
- `/contact`
- `/policies`
- `/order-lookup`
- `/login`
- `/register`

### User dashboard
- `/profile`
- `/profile/account`
- `/profile/security`
- `/profile/orders`
- `/profile/payments`
- `/profile/purchases`
- `/profile/tickets`
- `/profile/wishlist`
- `/profile/services`

### Admin dashboard
- `/admin`
- `/admin/products`
- `/admin/orders`
- `/admin/users`
- `/admin/tickets`
- `/admin/coupons`
- `/admin/banners`
- `/admin/settings`

### API routes
- `/api/products`
- `/api/orders`
- `/api/search`
- `/api/support`
- `/api/gift-cards`
- `/api/vps`

## Mock systems

### Gift card inventory
Project da co mock fulfillment logic cho gift card:
- model logic: `GiftCardCode`
- status:
  - `AVAILABLE`
  - `SOLD`
  - `USED`
- khi order hoan tat:
  - cap code tu inventory
  - hien thi code trong order detail / order lookup flow
  - mock thong tin gui email code cho user

File lien quan:
- `src/services/mock-fulfillment-service.ts`
- `prisma/schema.prisma`

### VPS provisioning
Project da co mock VPS flow:
- Product type `VPS` co them:
  - CPU
  - RAM
  - Storage
  - Bandwidth
  - OS
- sau khi thanh toan:
  - tao VPS instance mock
  - hien thi trong `My Services`
- thong tin hien thi:
  - IP address
  - Username
  - Password
  - Status
  - Control panel button

## Authentication mock

Hien tai project dang dung mock auth de demo protected routes:
- cookie `meowmarket-session`
- cookie `meowmarket-role`
- middleware bao ve:
  - `/profile/*`
  - `/admin/*`

Dang nhap demo:
- User:
  - email: `user@meowmarket.vn`
  - password: `123456`
- Admin:
  - email: `admin@meowmarket.vn`
  - password: `123456`

Co the thay bang:
- NextAuth
- JWT auth
- session service rieng

## Database schema

Prisma schema da duoc thiet ke cho cac entity:
- `User`
- `Product`
- `Category`
- `Order`
- `OrderItem`
- `Payment`
- `Coupon`
- `SupportTicket`
- `TicketMessage`
- `Review`
- `Banner`
- `GiftCardCode`
- `VpsInstance`
- `WishlistItem`

Enums chinh:
- `UserRole`
- `ProductType`
- `OrderStatus`
- `PaymentStatus`
- `PaymentMethod`
- `TicketStatus`
- `GiftCardCodeStatus`
- `VpsInstanceStatus`

## Cai dat va chay local

### 1. Cai dependency

```bash
npm install
```

### 2. Tao file moi truong

```bash
copy .env.example .env
```

Noi dung mau:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/meowmarket"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Generate Prisma client

```bash
npm run prisma:generate
```

### 4. Chay project

```bash
npm run dev
```

Mo tren:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run prisma:generate
npm run prisma:migrate
```

## Code organization

### `src/mock`
Chua mock data tach rieng:
- products
- users
- orders
- tickets
- banner
- reviews
- faqs

### `src/services`
Service layer de sau nay thay bang API that:
- `api-service.ts`
- `product-service.ts`
- `order-service.ts`
- `auth-service.ts`
- `payment-service.ts`
- `ticket-service.ts`
- `search-service.ts`
- `mock-fulfillment-service.ts`

### `src/modules`
Gom page-level UI logic:
- home
- products
- checkout
- support
- profile
- admin

### `src/components`
Phan tach component theo domain:
- `ui`
- `layout`
- `product`
- `dashboard`
- `forms`

## SEO

Project da co metadata co ban:
- global metadata trong `src/app/layout.tsx`
- page metadata cho cac route chinh

## Performance direction

Project dang theo huong:
- uu tien server components khi co the
- phan tach client components cho form, chart, state store
- pagination cho danh sach
- image layer co the mo rong bang `next/image`
- de lazy-load them cho dashboard widgets lon neu can

## Payment integration direction

Structure da san sang de gan them payment gateways:
- VNPay
- Momo
- ZaloPay
- Crypto payment

Khi nang cap production, nen them:
- payment adapter abstraction
- webhook verification
- transaction logs
- retry strategy
- idempotency handling

## Deployment

### Frontend
- deploy len Vercel

### Backend / database
- PostgreSQL va backend layer co the deploy tren VPS
- sau nay co the tach API backend rieng khoi Next.js frontend

## Trang thai hien tai

Da hoan thanh:
- scaffold full project structure
- public pages
- auth pages
- user dashboard
- admin dashboard
- mock API routes
- Prisma schema
- middleware protect routes
- lint pass
- production build pass

## Huong mo rong tiep theo

- tich hop auth that bang NextAuth hoac JWT
- ket noi PostgreSQL that va seed data Prisma
- them upload banner / product image
- them order detail page day du
- them email service that cho gift card delivery
- them VPS provisioning adapter that
- them webhook payment cho VNPay, Momo, ZaloPay
- them test automation

