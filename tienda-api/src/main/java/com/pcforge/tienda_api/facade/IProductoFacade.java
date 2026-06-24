package com.pcforge.tienda_api.facade;

import java.util.List;

import com.pcforge.tienda_api.models.ProductoRequestModel;
import com.pcforge.tienda_api.models.ProductoResponseModel;

public interface IProductoFacade {

    List<ProductoResponseModel> listarProductos();

    ProductoResponseModel obtenerProducto(Integer idProducto);

    ProductoResponseModel crearProducto(ProductoRequestModel request);

    ProductoResponseModel actualizarProducto(Integer idProducto, ProductoRequestModel request);

    void eliminarProducto(Integer idProducto);
}
