package com.pcforge.tienda_api.dtos;

import java.math.BigDecimal;

public record ProductoDTO(
    Integer idProducto,
    String nombre, 
    String descripcion,
    String categoria, 
    BigDecimal precio, 
    int stock, 
    String imagen) {
    

}
