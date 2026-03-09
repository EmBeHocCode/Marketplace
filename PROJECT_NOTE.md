# Ghi chú Dự án - MeowMarket

## 1. Tổng quan

**MeowMarket** là marketplace dịch vụ số cho thị trường Việt Nam, xây bằng Next.js App Router theo hướng có thể chuyển dần từ mock sang backend thật.

Định hướng giao diện:

- cute
- mềm mại
- thân thiện
- hiện đại
- chuyên nghiệp
- phù hợp các flow mua hàng số, gift card, VPS và cloud

Danh mục chính:

- VPS
- Cloud
- Gift Card
- Thẻ Game
- Dịch vụ số khác

## 2. Tech stack hiện tại

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- FontAwesome
- Zustand
- React Hook Form
- Zod
- Recharts
- Prisma ORM
- PostgreSQL
- bcryptjs
- Framer Motion

## 3. Toàn bộ giao diện và lõi web nằm ở đâu

### Giao diện

- `src/app`
  - routes, page, layout theo App Router
- `src/components`
  - UI components tái sử dụng
- `src/modules`
  - UI theo từng màn lớn như home, products, profile, admin
- `src/layouts`
  - public layout, user dashboard layout, admin layout
- `src/styles`
  - style và motion bổ sung
- `public`
  - favicon, logo, ảnh public

### Lõi hệ thống

- `src/services`
  - auth, product, order, payment, ticket, fulfillment, media, AI
- `src/lib`
  - utility nền, Prisma client, helper
- `src/types`
  - type cốt lõi
- `src/validators`
  - schema validate form/request
- `src/store`
  - Zustand stores
- `src/config`
  - config site, menu, metadata
- `src/constants`
  - constants dùng chung
- `prisma`
  - schema và seed cho database
- `data`
  - nguồn import legacy cho auth cũ nếu cần seed lại

Nếu cần sửa giao diện:

- ưu tiên vào `src/components`, `src/modules`, `src/layouts`, `src/app`

Nếu cần sửa nghiệp vụ:

- ưu tiên vào `src/services`, `src/lib`, `src/types`, `prisma`

## 4. Trạng thái dữ liệu hiện tại

- tài khoản, mật khẩu hash, session, reset token đều lưu trong PostgreSQL
- public storefront, dashboard, admin stats, order, payment, ticket, notification, media đều đang đọc từ SQL
- seed mặc định có sẵn user, category, product, order, payment, ticket, coupon, media, audit log
- phần còn dùng mock chủ yếu là AI tools demo

## 5. Auth hiện tại

- register/login đi qua API routes
- mật khẩu được hash bằng `bcryptjs`
- tài khoản, session và password reset token lưu trong PostgreSQL
- session hiển thị nhanh qua cookies:
  - `meowmarket-session`
  - `meowmarket-role`
  - `meowmarket-user`
- file `data/mock-auth-users.json` chỉ còn làm nguồn import legacy khi chạy seed

Tài khoản mặc định:

- User
  - email: `user@meowmarket.vn`
  - password: `123456`
- Admin
  - email: `admin@meowmarket.vn`
  - password: `123456`

Luồng register hiện tại:

- đăng ký thành công sẽ chuyển về `/login`
- sau đó đăng nhập bằng tài khoản vừa tạo

## 6. Database và seed

Prisma schema đã có đầy đủ các nhóm model chính:

- User
- Session
- Account
- Category
- Product
- ProductImage
- Order
- OrderItem
- Payment
- Coupon
- SupportTicket
- TicketMessage
- Notification
- GiftCardCode
- VpsInstance
- ServiceRecord
- MediaAsset
- AuditLog
- PasswordResetToken
- SiteSetting

Seed hiện tại tại `prisma/seed.ts` tạo:

- admin mặc định
- user mặc định
- import thêm user legacy từ `data/mock-auth-users.json` nếu có
- category tree
- site setting
- banner
- FAQ
- coupon
- 12 sản phẩm mẫu
- review
- favorite
- order, order item, payment
- gift card code
- service record và VPS instance
- support ticket và ticket message
- notification
- media asset
- audit log

## 7. Mock systems còn giữ lại

### Gift card fulfillment

- reserve code
- assign code vào order
- hiển thị code trong order detail
- sẵn kiến trúc để nối email delivery thật sau này

### VPS / Cloud fulfillment

- tạo `ServiceRecord`
- tạo `VpsInstance` mock sau thanh toán
- hiển thị ở `My Services`
- sẵn kiến trúc để gọi provider API thật sau này

### Payment mock

- VNPay
- MoMo
- ZaloPay
- callback/webhook mock
- success/failure pages

## 8. Favicon và assets thương hiệu

Favicon nguồn đang dùng:

- `src/assets/favicons/favicon.gif`

Các file đang public ra browser:

- `public/favicon.ico`
- `public/favicons/favicon.png`
- `public/favicons/favicon.gif`

Metadata favicon nằm ở:

- `src/app/layout.tsx`

## 9. Dev workflow hiện tại

Script dev chính:

- `npm run dev`

Script này chạy file:

- `scripts/dev-single-instance.js`

Nó sẽ:

- dừng các tiến trình Next.js cũ của project
- giải phóng port `3000`, `3001`, `3002`
- xóa cache `.next`
- khởi động MeowMarket tại `http://localhost:3000`

Lưu ý:

- khi sửa code trong lúc dev server đang chạy, Next.js sẽ tự hot reload
- không cần chạy lại `npm run dev` sau mỗi thay đổi code thông thường
- nếu thay dependency, env, script hoặc config lớn thì nên restart dev server

Nếu muốn chạy dev mặc định của Next.js:

```bash
npm run dev:raw
```

## 10. Cài local nhanh

```bash
npm install
copy .env.example .env
npm run prisma:generate
npx prisma db push
npm run prisma:seed
npm run dev
```

## 11. Hướng nâng cấp tiếp theo

- thay auth dev bằng Auth.js hoặc JWT thật
- chuyển orders, payments, tickets sang Prisma hoàn toàn
- thêm product CRUD thật ở admin
- thêm upload media thật bằng Cloudinary hoặc S3
- thêm seed SQL sản phẩm hoặc admin create product flow
- gắn payment gateway thật
- gắn email service thật
- gắn VPS provisioning provider thật
- kết nối Next.js API với FastAPI AI service

## 12. Kiểm tra gần nhất

Đã pass:

- `npm run lint`
- `npm run build`
