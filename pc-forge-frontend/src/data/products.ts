import type { Producto } from "../models/responses/Producto";

export const products: Producto[] = [
    {
        idProducto: 1,
        nombre: "Ryzen 7 Forge Edition",
        descripcion: "Procesador de alto rendimiento para gaming, streaming y trabajo pesado.",
        categoria: "Procesadores",
        precio: 189990,
        stock: 12,
        imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=80",
    },
    {
        idProducto: 2,
        nombre: "GeForce RTX 4070 Steel",
        descripcion: "Tarjeta grafica preparada para juegos AAA, render y creacion de contenido.",
        categoria: "Tarjetas graficas",
        precio: 389990,
        stock: 6,
        imagen: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=80",
    },
    {
        idProducto: 3,
        nombre: "SSD NVMe 1TB BlackCore",
        descripcion: "Almacenamiento rapido para reducir tiempos de carga y acelerar tu PC.",
        categoria: "Almacenamiento",
        precio: 54990,
        stock: 18,
        imagen: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=900&q=80",
    },
    {
        idProducto: 4,
        nombre: "Memoria RGB 32GB DDR5",
        descripcion: "Kit de memoria de baja latencia con iluminacion configurable.",
        categoria: "Memorias RAM",
        precio: 79990,
        stock: 9,
        imagen: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=900&q=80",
    },
];
