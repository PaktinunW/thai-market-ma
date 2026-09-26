import Link from "next/link";

type Props = {
  product: {
    id: string;
    nameTh: string;
    price: number;
    imageUrl: string | null;
    category: { name: string };
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-square bg-neutral-200">
        {product.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.nameTh} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-neutral-500">{product.category.name}</p>
        <p className="font-medium truncate">{product.nameTh}</p>
        <p className="text-sm font-semibold mt-1">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
