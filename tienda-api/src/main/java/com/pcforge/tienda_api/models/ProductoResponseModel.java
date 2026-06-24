package com.pcforge.tienda_api.models;

import java.math.BigDecimal;

public record ProductoResponseModel(
    Integer idProducto,
    String nombre, 
    String descripcion,
    String categoria, 
    BigDecimal precio, 
    int stock, 
    String imagen) {
}
