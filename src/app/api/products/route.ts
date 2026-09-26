import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products?category=slug — ดึงรายการสินค้า (filter ได้ตามหมวดหมู่)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category");

  const products = await prisma.product.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : undefined,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

// POST /api/products — สร้างสินค้าใหม่ (สำหรับหน้า admin)
export async function POST(request: Request) {
  const body = await request.json();

  const product = await prisma.product.create({
    data: {
      nameTh: body.nameTh,
      nameEn: body.nameEn,
      description: body.description,
      price: body.price,
      imageUrl: body.imageUrl,
      stock: body.stock,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
