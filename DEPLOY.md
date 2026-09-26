# คู่มือ Deploy ขึ้น Vercel

## ขั้นที่ 1: เตรียม Database บน cloud (ถ้ายังไม่มี)
1. ไปที่ [supabase.com](https://supabase.com) หรือ [neon.tech](https://neon.tech) → สร้าง project ฟรี
2. Copy connection string (Supabase: Settings > Database > Connection string > URI)
3. เก็บไว้ใช้ตอนตั้งค่า environment variables

## ขั้นที่ 2: เตรียม Stripe (test mode ก่อน)
1. สมัคร [stripe.com](https://stripe.com) → ไม่ต้อง verify ธุรกิจจริงก็ใช้ test mode ได้
2. ไปที่ Developers > API keys → copy **Secret key** (ขึ้นต้นด้วย `sk_test_`)
3. Webhook secret จะได้หลัง deploy เสร็จ (ขั้นที่ 6)

## ขั้นที่ 3: Push โค้ดขึ้น GitHub
```bash
cd thai-market-ma
git init
git add .
git commit -m "Initial commit: Thai Market MA e-commerce app"
gh repo create thai-market-ma --public --source=. --push
```
(หรือสร้าง repo ผ่านหน้าเว็บ GitHub แล้ว `git remote add origin ...` + `git push`)

## ขั้นที่ 4: Import เข้า Vercel
1. ไปที่ [vercel.com/new](https://vercel.com/new)
2. เลือก repo `thai-market-ma` ที่เพิ่ง push
3. Framework จะ detect เป็น Next.js อัตโนมัติ — ไม่ต้องแก้อะไร

## ขั้นที่ 5: ใส่ Environment Variables
ในหน้า Vercel project settings ก่อนกด Deploy ใส่ตัวแปรตาม `.env.example`:

| Key | Value |
|---|---|
| `DATABASE_URL` | connection string จากขั้นที่ 1 |
| `NEXTAUTH_SECRET` | รันคำสั่ง `openssl rand -base64 32` ในเครื่องแล้ว copy มาใส่ |
| `NEXTAUTH_URL` | ใส่หลัง deploy เสร็จรอบแรก เช่น `https://thai-market-ma.vercel.app` |
| `STRIPE_SECRET_KEY` | จากขั้นที่ 2 |
| `STRIPE_WEBHOOK_SECRET` | ใส่หลังทำขั้นที่ 6 |
| `NEXT_PUBLIC_APP_URL` | เหมือน `NEXTAUTH_URL` |

กด **Deploy** — รอบแรก `NEXTAUTH_URL` ยังไม่รู้ค่า ใส่ placeholder ไปก่อนก็ได้ แล้วมาแก้หลัง deploy เสร็จ (Vercel จะให้ URL มา) แล้วกด Redeploy

## ขั้นที่ 6: รัน migration + seed บน production database
ในเครื่องตัวเอง (เชื่อมกับ production `DATABASE_URL`):
```bash
npx prisma migrate deploy
npm run db:seed
```

## ขั้นที่ 7: ตั้งค่า Stripe Webhook
1. Stripe Dashboard > Developers > Webhooks > Add endpoint
2. URL: `https://your-app.vercel.app/api/webhooks/stripe`
3. เลือก event: `checkout.session.completed`
4. Copy **Signing secret** (`whsec_...`) → เอาไปใส่ `STRIPE_WEBHOOK_SECRET` ใน Vercel env vars → Redeploy

## ขั้นที่ 8: (ถ้าจะซื้อ custom domain)
Vercel project > Settings > Domains > ใส่ domain ที่ซื้อจาก Namecheap/Porkbun แล้วตั้งค่า DNS ตามที่ Vercel บอก (ปกติแค่เพิ่ม CNAME record)

## เช็คให้ครบก่อนใส่ resume
- [ ] เว็บเข้าได้จริงผ่าน URL public
- [ ] สมัครสมาชิก + login ได้
- [ ] ดูสินค้า + เพิ่มตะกร้าได้
- [ ] Checkout ผ่าน Stripe test card `4242 4242 4242 4242` สำเร็จ
- [ ] หลังจ่ายเงิน order status เปลี่ยนเป็น PAID (เช็คผ่าน `npm run db:studio`)
- [ ] README มี screenshot หรืออธิบาย tech stack ชัดเจน
