"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          🇹🇭 Thai Market MA
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/products">สินค้า</Link>
          <Link href="/cart">ตะกร้า</Link>
          {role === "ADMIN" && <Link href="/admin/products">Admin</Link>}
          {session ? (
            <button onClick={() => signOut()} className="text-neutral-500">
              ออกจากระบบ ({session.user?.name})
            </button>
          ) : (
            <Link href="/login">เข้าสู่ระบบ</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
