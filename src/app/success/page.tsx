export default function SuccessPage({ searchParams }: { searchParams: { orderId?: string } }) {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <h1 className="text-2xl font-bold mb-2">ชำระเงินสำเร็จ 🎉</h1>
      <p className="text-neutral-600">
        ขอบคุณสำหรับการสั่งซื้อ หมายเลขออเดอร์ของคุณคือ{" "}
        <span className="font-mono">{searchParams.orderId}</span>
      </p>
      <p className="text-sm text-neutral-400 mt-4">
        สถานะจะอัปเดตเป็น &quot;ชำระแล้ว&quot; ภายในไม่กี่วินาทีผ่าน Stripe webhook
      </p>
    </div>
  );
}
