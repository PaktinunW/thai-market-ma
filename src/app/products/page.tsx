import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: searchParams.category ? { category: { slug: searchParams.category } } : undefined,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">สินค้าทั้งหมด</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <a
          href="/products"
          className={`px-3 py-1 rounded-full border text-sm ${
            !searchParams.category ? "bg-neutral-900 text-white" : "bg-white"
          }`}
        >
          ทั้งหมด
        </a>
        {categories.map((c) => (
          <a
            key={c.id}
            href={`/products?category=${c.slug}`}
            className={`px-3 py-1 rounded-full border text-sm ${
              searchParams.category === c.slug ? "bg-neutral-900 text-white" : "bg-white"
            }`}
          >
            {c.name}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={{ ...p, price: Number(p.price) }} />
        ))}
      </div>
    </div>
  );
}
