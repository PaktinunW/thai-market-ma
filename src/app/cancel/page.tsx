export default function CancelPage() {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <h1 className="text-2xl font-bold mb-2">ยกเลิกการชำระเงิน</h1>
      <p className="text-neutral-600">ตะกร้าสินค้าของคุณยังอยู่ครบ ลองใหม่ได้ทุกเมื่อ</p>
      <a href="/cart" className="underline mt-4 inline-block">
        กลับไปที่ตะกร้า
      </a>
    </div>
  );
}
