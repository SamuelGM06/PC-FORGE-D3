import type { Producto } from "./responses/Producto";

export interface CartItem {
  product: Producto;
  quantity: number;
}
