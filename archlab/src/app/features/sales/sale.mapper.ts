import { SaleDto } from './sale.dto';
import { Sale } from './sale.model';

export function mapSaleDtoToSale(dto: SaleDto): Sale {
  return {
    id: dto.id,
    product: dto.product_name,
    quantity: dto.quantity,
    price: dto.price,
    total: dto.quantity * dto.price, // domain logic
    date: new Date(dto.created_at),
  };
}

export function mapSalesDtoToSales(dtos: SaleDto[]): Sale[] {
  return dtos.map(mapSaleDtoToSale);
}
