import { config } from "../config";
import { usuarios as fallbackPedidos } from "../data/usuarios";
import type { Usuario } from "../models/responses/Usuario";

const API_URL = `${config.api.url}/tienda-api/usuarios`;

export async function getUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching usuarios, usando fallback:", error);
        return fallbackPedidos;
    }
}