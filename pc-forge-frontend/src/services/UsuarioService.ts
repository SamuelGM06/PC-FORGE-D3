import { config } from "../config";
import { usuarios as fallbackUsuarios } from "../data/usuarios";
import type { Usuario } from "../models/responses/Usuario";

const API_URL = `${config.api.url}/api/usuarios`;

export interface UsuarioPayload {
    nombre: string;
    correo: string;
    password: string;
    rol?: "CLIENTE" | "ADMIN";
}

export async function getUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching usuarios, usando fallback:", error);
        return fallbackUsuarios;
    }
}

export async function registrarUsuario(usuario: UsuarioPayload): Promise<Usuario> {
    const response = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    });

    if (!response.ok) {
        const errorResponse = (await response
            .json()
            .catch(() => null)) as { mensaje?: string } | null;

        throw new Error(errorResponse?.mensaje ?? "No se pudo registrar el usuario");
    }

    return response.json();
}
