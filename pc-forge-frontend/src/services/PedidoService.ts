import { config } from "../config";
import { pedidos as fallbackPedidos } from "../data/pedidos";
import type { Pedido } from "../models/responses/Pedido";

const API_URL = `${config.api.url}/api/pedidos`;

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

export async function crearPedido(payload: { idUsuario: number; detalles: { idProducto: number; cantidad: number }[] }, token?: string) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.mensaje ?? "Error al crear pedido");
    }

    return response.json();
}