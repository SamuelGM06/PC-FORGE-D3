package com.pcforge.tienda_api.dtos;

import java.math.BigDecimal;

public record Detalle_PedidoDTO(
    Integer idDetalle, 
    Integer idPedido, 
    Integer idProducto, 
    int cantidad,
    BigDecimal precioUnitario) {
        

}
