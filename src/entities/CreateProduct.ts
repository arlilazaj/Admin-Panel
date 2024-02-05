export interface CreateProduct {
  image: string | null;
  description: string;
  specification: string;
  reviews: string;
  price: number;
  type: string;

  stock: number;
  tag: string;
  categoryId: number[];
}
