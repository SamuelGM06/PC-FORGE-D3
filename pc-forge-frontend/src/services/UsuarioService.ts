import { config } from "../config";
import type { Usuario } from "../models/responses/Usuario";

const API_URL = `${config.api.url}/api/usuarios`;

export interface UsuarioPayload {
    nombre: string;
    correo: string;
    password: string;
    rol?: "CLIENTE" | "ADMIN";
}

export async function getUsuarios(): Promise<Usuario[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("No se pudieron obtener los usuarios");
    }

    return response.json();
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
