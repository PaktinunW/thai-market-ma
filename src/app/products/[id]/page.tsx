import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true },
  });

  if (!product) return notFound();

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="aspect-square bg-neutral-200 rounded-xl overflow-hidden">
        {product.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.nameTh} className="w-full h-full object-cover" />
        )}
      </div>
      <div>
        <p className="text-sm text-neutral-500">{product.category.name}</p>
        <h1 className="text-2xl font-bold mt-1">{product.nameTh}</h1>
        <p className="text-neutral-500 mb-4">{product.nameEn}</p>
        <p className="text-xl font-semibold mb-4">${Number(product.price).toFixed(2)}</p>
        <p className="text-neutral-700 mb-6">{product.description}</p>
        <button className="bg-neutral-900 text-white px-6 py-2 rounded-lg hover:bg-neutral-700">
          เพิ่มลงตะกร้า
        </button>
        <p className="text-sm text-neutral-500 mt-2">คงเหลือ {product.stock} ชิ้น</p>
      </div>
    </div>
  );
}
