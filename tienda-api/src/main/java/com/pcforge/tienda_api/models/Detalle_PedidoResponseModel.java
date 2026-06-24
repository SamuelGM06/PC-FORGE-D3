package com.pcforge.tienda_api.models;

import java.math.BigDecimal;

public record Detalle_PedidoResponseModel(
    Integer idDetalle, 
    Integer idPedido, 
    Integer idProducto, 
    int cantidad, 
    BigDecimal precioUnitario) {
    
}
