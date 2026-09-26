import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

// POST /api/checkout
// body: { items: [{ productId, quantity }], shippingName, shippingAddress, shippingCity, shippingZip }
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "กรุณาเข้าสู่ระบบก่อนสั่งซื้อ" }, { status: 401 });
  }

  const body = await request.json();
  const { items, shippingName, shippingAddress, shippingCity, shippingZip } = body;

  // ดึงราคาจริงจาก database เสมอ ห้ามเชื่อราคาที่ client ส่งมา (ป้องกันการแก้ราคา)
  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  const orderItems = items.map((item: { productId: string; quantity: number }) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error(`ไม่พบสินค้า ${item.productId}`);
    return {
      productId: product.id,
      quantity: item.quantity,
      price: Number(product.price),
      nameTh: product.nameTh,
    };
  });

  const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // สร้างออเดอร์สถานะ PENDING ก่อน รอ webhook ยืนยันการจ่ายเงิน
  const order = await prisma.order.create({
    data: {
      userId: (session.user as { id: string }).id,
      total,
      shippingName,
      shippingAddress,
      shippingCity,
      shippingZip,
      items: {
        create: orderItems.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
      },
    },
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: orderItems.map((i) => ({
      price_data: {
        currency: "usd",
        product_data: { name: i.nameTh },
        unit_amount: Math.round(i.price * 100),
      },
      quantity: i.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    metadata: { orderId: order.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
