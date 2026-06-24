package com.pcforge.tienda_api.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pcforge.tienda_api.facade.IProductoFacade;
import com.pcforge.tienda_api.models.ProductoRequestModel;
import com.pcforge.tienda_api.models.ProductoResponseModel;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    private final IProductoFacade productoFacade;

    public ProductoController(IProductoFacade productoFacade) {
        this.productoFacade = productoFacade;
    }

    @GetMapping
    public List<ProductoResponseModel> listarProductos() {
        return productoFacade.listarProductos();
    }

    @GetMapping("/{idProducto}")
    public ProductoResponseModel obtenerProducto(@PathVariable Integer idProducto) {
        return productoFacade.obtenerProducto(idProducto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductoResponseModel crearProducto(@Valid @RequestBody ProductoRequestModel request) {
        return productoFacade.crearProducto(request);
    }

    @PutMapping("/{idProducto}")
    public ProductoResponseModel actualizarProducto(@PathVariable Integer idProducto, @Valid @RequestBody ProductoRequestModel request) {
        return productoFacade.actualizarProducto(idProducto, request);
    }

    @DeleteMapping("/{idProducto}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarProducto(@PathVariable Integer idProducto) {
        productoFacade.eliminarProducto(idProducto);
    }
}
