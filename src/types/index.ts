export type CartItem = {
  productId: string;
  nameTh: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
};

export type ProductWithCategory = {
  id: string;
  nameTh: string;
  nameEn: string;
  description: string;
  price: number;
  imageUrl: string | null;
  stock: number;
  category: { name: string; slug: string };
};
