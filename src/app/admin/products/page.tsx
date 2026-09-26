import { prisma } from "@/lib/prisma";

// TODO: ใส่ auth guard ตรงนี้ ให้เฉพาะ role ADMIN เข้าได้

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">จัดการสินค้า</h1>
        <button className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm">
          + เพิ่มสินค้า
        </button>
      </div>

      <table className="w-full text-sm bg-white border rounded-lg overflow-hidden">
        <thead className="bg-neutral-100 text-left">
          <tr>
            <th className="p-3">ชื่อสินค้า</th>
            <th className="p-3">หมวดหมู่</th>
            <th className="p-3">ราคา</th>
            <th className="p-3">คงเหลือ</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.nameTh}</td>
              <td className="p-3">{p.category.name}</td>
              <td className="p-3">${Number(p.price).toFixed(2)}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3 text-right">
                <button className="text-blue-600 mr-3">แก้ไข</button>
                <button className="text-red-600">ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
