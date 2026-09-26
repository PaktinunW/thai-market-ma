import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/orders — สร้างออเดอร์จากตะกร้าสินค้า
export async function POST(request: Request) {
  const body = await request.json();
  const { userId, items, shippingName, shippingAddress, shippingCity, shippingZip } = body;

  // items = [{ productId, quantity, price }]
  const total = items.reduce(
    (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      shippingName,
      shippingAddress,
      shippingCity,
      shippingZip,
      items: {
        create: items.map((item: { productId: string; quantity: number; price: number }) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}
