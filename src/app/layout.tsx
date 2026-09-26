import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata = {
  title: "Thai Market MA",
  description: "สินค้าไทยแท้ ส่งตรงถึงบ้านคุณในแมสซาชูเซตส์",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <SessionProviderWrapper>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
