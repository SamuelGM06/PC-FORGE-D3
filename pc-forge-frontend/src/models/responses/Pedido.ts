import type { DetallePedido } from "./DetallePedido";

export interface Pedido {
    idPedido: number;
    idUsuario: number;
    fecha: string;
    total: number;
    estado: string;
    detalles: DetallePedido[];
}