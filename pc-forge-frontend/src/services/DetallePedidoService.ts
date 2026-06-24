import { config } from "../config";
import { detallePedidos as fallbackDetalles } from "../data/detallePedidos";
import type { DetallePedido } from "../models/responses/DetallePedido";

const API_URL = `${config.api.url}/tienda-api/detalles-pedido`;

export async function getDetallesPedido(): Promise<DetallePedido[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los detalles");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching detalles:", error);
        return fallbackDetalles;
    }
}