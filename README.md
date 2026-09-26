# Thai Market MA 🇹🇭

เว็บอีคอมเมิร์ซขายสินค้าไทยสำหรับลูกค้าในรัฐแมสซาชูเซตส์ สร้างด้วย Next.js, Prisma และ PostgreSQL

## Tech Stack
- **Next.js 14** (App Router) — frontend + API routes
- **Prisma** + **PostgreSQL** — database & ORM
- **Tailwind CSS** — styling
- **Zustand** — state management (สำหรับตะกร้าสินค้า)

## เริ่มต้นใช้งาน

1. ติดตั้ง dependencies
   ```bash
   npm install
   ```

2. สร้าง database ฟรีที่ [Supabase](https://supabase.com) หรือ [Neon](https://neon.tech)

3. ก็อป `.env.example` เป็น `.env` แล้วใส่ connection string ของคุณ

4. รัน migration และ seed ข้อมูลตัวอย่าง
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. เริ่ม dev server
   ```bash
   npm run dev
   ```
   เปิด http://localhost:3000

## โครงสร้างโปรเจกต์
```
src/
  app/            # หน้าเว็บและ API routes (App Router)
  components/     # React components ที่ใช้ซ้ำ
  lib/            # Prisma client และ utility functions
  types/          # TypeScript types
prisma/
  schema.prisma   # โครงสร้าง database
  seed.ts         # ข้อมูลตัวอย่าง
```

## สิ่งที่ทำไว้แล้ว (MVP)
- [x] Database schema (User, Category, Product, Order, OrderItem)
- [x] หน้าแสดงสินค้า + filter ตามหมวดหมู่
- [x] หน้ารายละเอียดสินค้า
- [x] API สำหรับสินค้าและออเดอร์
- [x] โครงหน้า admin จัดการสินค้า
- [x] Authentication (NextAuth.js — register/login, admin route protection)
- [x] Stripe Checkout + webhook (อัปเดตสถานะออเดอร์และลดสต๊อกอัตโนมัติ)

## Login สำหรับทดสอบ (จาก seed data)
- Admin: `admin@thaimarket.com` / `admin1234`

## สิ่งที่ต้องทำต่อ
- [ ] เชื่อม Zustand store กับหน้าตะกร้าจริง (ตอนนี้ /checkout ยัง hardcode สินค้าตัวอย่างอยู่)
- [ ] Upload รูปสินค้า (แนะนำ Cloudinary หรือ Vercel Blob)
- [ ] หน้าประวัติคำสั่งซื้อของลูกค้า (My Orders)

## ทดสอบ Stripe แบบ local
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
คำสั่งนี้จะให้ webhook secret ชั่วคราวมาใส่ใน `.env`

ทดสอบจ่ายเงินด้วยบัตร test: `4242 4242 4242 4242`, วันหมดอายุอนาคตอะไรก็ได้, CVC อะไรก็ได้

## Deploy
ดูขั้นตอนละเอียดใน [`DEPLOY.md`](./DEPLOY.md) — แนะนำ deploy ผ่าน [Vercel](https://vercel.com) เชื่อม GitHub repo แล้ว deploy อัตโนมัติทุกครั้งที่ push
