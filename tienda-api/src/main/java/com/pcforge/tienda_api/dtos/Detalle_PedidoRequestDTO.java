package com.pcforge.tienda_api.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Detalle_PedidoRequestDTO {
    private Integer idProducto;
    private int cantidad;
}
