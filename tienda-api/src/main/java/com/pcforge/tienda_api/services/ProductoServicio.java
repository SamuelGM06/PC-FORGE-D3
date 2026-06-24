package com.pcforge.tienda_api.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.pcforge.tienda_api.dtos.ProductoDTO;
import com.pcforge.tienda_api.dtos.ProductoRequestDTO;
import com.pcforge.tienda_api.entities.Producto;
import com.pcforge.tienda_api.exceptions.ApiException;
import com.pcforge.tienda_api.mappers.ProductoMapper;
import com.pcforge.tienda_api.repositories.ProductoRepository;

@Service
public class ProductoServicio implements IProductoService {
    private final ProductoRepository productoRepository;
    private final ProductoMapper productoMapper;

    public ProductoServicio(ProductoRepository productoRepository, ProductoMapper productoMapper) {
        this.productoRepository = productoRepository;
        this.productoMapper = productoMapper;
    }

    @Override
    public List<ProductoDTO> listarProductos() {
        return productoMapper.toProductoDTOList(productoRepository.findAll());
    }

    @Override
    public ProductoDTO obtenerProducto(Integer idProducto) {
        return productoMapper.toProductoDTO(obtenerEntidad(idProducto));
    }

    @Override
    public ProductoDTO crearProducto(ProductoRequestDTO request) {
        Producto producto = Producto.builder().build();
        aplicarCambios(producto, request);
        return productoMapper.toProductoDTO(productoRepository.save(producto));
    }

    @Override
    public ProductoDTO actualizarProducto(Integer idProducto, ProductoRequestDTO request) {
        Producto producto = obtenerEntidad(idProducto);
        aplicarCambios(producto, request);
        return productoMapper.toProductoDTO(productoRepository.save(producto));
    }

    @Override
    public void eliminarProducto(Integer idProducto) {
        if (!productoRepository.existsById(idProducto)) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Producto no encontrado.");
        }
        productoRepository.deleteById(idProducto);
    }

    @Override
    public Producto obtenerEntidad(Integer idProducto) {
        return productoRepository.findById(idProducto)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Producto no encontrado."));
    }

    private void aplicarCambios(Producto producto, ProductoRequestDTO request) {
        producto.setNombre(request.getNombre().trim());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());
        producto.setCategoria(request.getCategoria().trim());
        producto.setImagen(request.getImagen());
    }
}
