import { Products } from "./Products";

export interface Category {
  id: number;
  type: string;
  products: Products[];
}
