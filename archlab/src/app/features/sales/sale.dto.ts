export interface SaleDto {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
  created_at: string; // ISO string from API
}
