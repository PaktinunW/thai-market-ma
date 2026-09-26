import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 8,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <section className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">สินค้าไทยแท้ ส่งตรงถึงบ้านคุณใน MA</h1>
        <p className="text-neutral-600">เครื่องปรุง ของแห้ง ขนมไทย จากร้านที่คุณไว้ใจ</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">สินค้าแนะนำ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={{ ...p, price: Number(p.price) }} />
          ))}
        </div>
      </section>
    </div>
  );
}
