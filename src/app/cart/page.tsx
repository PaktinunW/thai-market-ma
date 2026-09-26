// TODO: ต่อกับ Zustand store เพื่อดึงสินค้าที่อยู่ในตะกร้าจริง
// ตอนนี้เป็นโครงหน้าไว้ก่อน — ดู src/types/index.ts สำหรับ CartItem type

export default function CartPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ตะกร้าสินค้า</h1>
      <p className="text-neutral-500">ยังไม่มีสินค้าในตะกร้า</p>
      {/* TODO: map cart items, quantity controls, summary, ปุ่มไป /checkout */}
    </div>
  );
}
