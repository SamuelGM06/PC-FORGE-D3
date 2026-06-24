import { config } from "../config";
import { pedidos as fallbackPedidos } from "../data/pedidos";
import type { Pedido } from "../models/responses/Pedido";

const API_URL = `${config.api.url}/tienda-api/pedidos`;

export async function getPedidos(): Promise<Pedido[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los pedidos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching pedidos, usando fallback:", error);
        return fallbackPedidos;
    }
}