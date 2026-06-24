package com.pcforge.tienda_api.facade;

import java.util.List;

import org.springframework.stereotype.Component;

import com.pcforge.tienda_api.dtos.ProductoRequestDTO;
import com.pcforge.tienda_api.mappers.ProductoMapper;
import com.pcforge.tienda_api.models.ProductoRequestModel;
import com.pcforge.tienda_api.models.ProductoResponseModel;
import com.pcforge.tienda_api.services.IProductoService;

@Component
public class ProductoFacade implements IProductoFacade {
    private final IProductoService productoService;
    private final ProductoMapper productoMapper;

    public ProductoFacade(IProductoService productoService, ProductoMapper productoMapper) {
        this.productoService = productoService;
        this.productoMapper = productoMapper;
    }

    @Override
    public List<ProductoResponseModel> listarProductos() {
        return productoMapper.toProductoResponseModelList(productoService.listarProductos());
    }

    @Override
    public ProductoResponseModel obtenerProducto(Integer idProducto) {
        return productoMapper.toProductoResponseModel(productoService.obtenerProducto(idProducto));
    }

    @Override
    public ProductoResponseModel crearProducto(ProductoRequestModel request) {
        return productoMapper.toProductoResponseModel(productoService.crearProducto(toProductoRequestDTO(request)));
    }

    @Override
    public ProductoResponseModel actualizarProducto(Integer idProducto, ProductoRequestModel request) {
        return productoMapper.toProductoResponseModel(productoService.actualizarProducto(idProducto, toProductoRequestDTO(request)));
    }

    @Override
    public void eliminarProducto(Integer idProducto) {
        productoService.eliminarProducto(idProducto);
    }

    private ProductoRequestDTO toProductoRequestDTO(ProductoRequestModel request) {
        return new ProductoRequestDTO(
            request.nombre(),
            request.descripcion(),
            request.precio(),
            request.stock(),
            request.categoria(),
            request.imagen()
        );
    }
}
