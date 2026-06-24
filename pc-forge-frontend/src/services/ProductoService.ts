import { config } from "../config";
import { products as fallbackProducts } from "../data/products";
import type { Producto } from "../models/responses/Producto";

const API_URL = `${config.api.url}/api/productos`;

export type ProductoPayload = Omit<Producto, "idProducto">;

export async function getProducts(): Promise<Producto[]> {
    try {
        const response = await fetch(API_URL);


        if (!response.ok) {
            throw new Error("Error al obtener los productos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching products, usando fallback:", error);
        return fallbackProducts;
    }
}

async function sendProduct(path: string, method: "POST" | "PUT", product: ProductoPayload): Promise<Producto> {
    const response = await fetch(path, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error("No se pudo guardar el producto");
    }

    return response.json();
}

export function createProduct(product: ProductoPayload): Promise<Producto> {
    return sendProduct(API_URL, "POST", product);
}

export function updateProduct(idProducto: number, product: ProductoPayload): Promise<Producto> {
    return sendProduct(`${API_URL}/${idProducto}`, "PUT", product);
}

export async function deleteProduct(idProducto: number): Promise<void> {
    const response = await fetch(`${API_URL}/${idProducto}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("No se pudo eliminar el producto");
    }
}
