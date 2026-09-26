import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // สร้าง admin user สำหรับทดสอบหน้า /admin
  // login: admin@thaimarket.com / password: admin1234
  const passwordHash = await bcrypt.hash("admin1234", 10);
  await prisma.user.create({
    data: {
      email: "admin@thaimarket.com",
      name: "Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  const categories = await Promise.all([
    prisma.category.create({ data: { name: "เครื่องปรุง", slug: "sauces" } }),
    prisma.category.create({ data: { name: "ของแห้ง", slug: "dry-goods" } }),
    prisma.category.create({ data: { name: "ขนมไทย", slug: "snacks" } }),
  ]);

  await prisma.product.createMany({
    data: [
      {
        nameTh: "น้ำปลาแท้ ตราปลาหมึก",
        nameEn: "Squid Brand Fish Sauce",
        description: "น้ำปลาแท้รสชาติเข้มข้น นำเข้าจากไทย ขนาด 700ml",
        price: 6.99,
        stock: 40,
        categoryId: categories[0].id,
        imageUrl: null,
      },
      {
        nameTh: "พริกแกงเขียวหวาน",
        nameEn: "Green Curry Paste",
        description: "พริกแกงเขียวหวานสูตรต้นตำรับ หอมเครื่องแกงไทยแท้",
        price: 4.5,
        stock: 25,
        categoryId: categories[0].id,
        imageUrl: null,
      },
      {
        nameTh: "ข้าวหอมมะลิ 5 กก.",
        nameEn: "Jasmine Rice 5kg",
        description: "ข้าวหอมมะลิแท้ 100% เมล็ดสวย หอมนุ่ม",
        price: 12.99,
        stock: 60,
        categoryId: categories[1].id,
        imageUrl: null,
      },
      {
        nameTh: "ทุเรียนทอดกรอบ",
        nameEn: "Crispy Durian Chips",
        description: "ทุเรียนทอดกรอบ หวานมัน อร่อยเหมือนกินทุเรียนสด",
        price: 8.99,
        stock: 15,
        categoryId: categories[2].id,
        imageUrl: null,
      },
    ],
  });

  console.log("Seed เสร็จแล้ว ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
