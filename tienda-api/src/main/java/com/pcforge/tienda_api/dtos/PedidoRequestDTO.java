package com.pcforge.tienda_api.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoRequestDTO {
    private Integer idUsuario;
    private List<Detalle_PedidoRequestDTO> detalles;
}
