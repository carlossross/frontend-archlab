export interface Sale {
  id: number;
  product: string;
  quantity: number;
  price: number;
  total: number; // derived domain rule
  date: Date;
}
