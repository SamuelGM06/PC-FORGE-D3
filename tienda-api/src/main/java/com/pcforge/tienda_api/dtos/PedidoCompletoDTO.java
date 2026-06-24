package com.pcforge.tienda_api.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record PedidoCompletoDTO(
    Integer id,
    Integer idUsuario,
    LocalDate fecha,
    BigDecimal total,
    String estado,
    List<Detalle_PedidoDTO> detalles
) {}
