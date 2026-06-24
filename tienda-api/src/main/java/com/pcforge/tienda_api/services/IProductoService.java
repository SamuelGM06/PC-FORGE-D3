package com.pcforge.tienda_api.services;

import java.util.List;

import com.pcforge.tienda_api.dtos.ProductoDTO;
import com.pcforge.tienda_api.dtos.ProductoRequestDTO;
import com.pcforge.tienda_api.entities.Producto;

public interface IProductoService {

    List<ProductoDTO> listarProductos();

    ProductoDTO obtenerProducto(Integer idProducto);

    ProductoDTO crearProducto(ProductoRequestDTO request);

    ProductoDTO actualizarProducto(Integer idProducto, ProductoRequestDTO request);

    void eliminarProducto(Integer idProducto);

    Producto obtenerEntidad(Integer idProducto);
}
