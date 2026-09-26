"use client";

import { useState } from "react";

// TODO: ดึง items จริงจาก Zustand cart store แทนการ hardcode
export default function CheckoutPage() {
  const [form, setForm] = useState({
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingZip: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ตัวอย่าง items — ในของจริงดึงมาจาก cart store
    const items = [{ productId: "REPLACE_WITH_REAL_ID", quantity: 1 }];

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, items }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "เกิดข้อผิดพลาด");
      setLoading(false);
      return;
    }

    const { url } = await res.json();
    window.location.href = url; // ไปหน้าจ่ายเงินของ Stripe
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">ที่อยู่จัดส่ง</h1>
      <form onSubmit={handleCheckout} className="flex flex-col gap-3">
        <input
          placeholder="ชื่อผู้รับ"
          value={form.shippingName}
          onChange={(e) => setForm({ ...form, shippingName: e.target.value })}
          className="border rounded-lg px-3 py-2"
          required
        />
        <input
          placeholder="ที่อยู่"
          value={form.shippingAddress}
          onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
          className="border rounded-lg px-3 py-2"
          required
        />
        <input
          placeholder="เมือง"
          value={form.shippingCity}
          onChange={(e) => setForm({ ...form, shippingCity: e.target.value })}
          className="border rounded-lg px-3 py-2"
          required
        />
        <input
          placeholder="รหัสไปรษณีย์"
          value={form.shippingZip}
          onChange={(e) => setForm({ ...form, shippingZip: e.target.value })}
          className="border rounded-lg px-3 py-2"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-neutral-900 text-white rounded-lg py-2 disabled:opacity-50"
        >
          {loading ? "กำลังไปหน้าชำระเงิน..." : "ไปชำระเงิน"}
        </button>
      </form>
    </div>
  );
}
