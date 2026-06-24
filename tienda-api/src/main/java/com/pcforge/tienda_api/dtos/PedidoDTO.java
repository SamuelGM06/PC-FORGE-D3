package com.pcforge.tienda_api.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

public record PedidoDTO(
    Integer id,
    Integer idUsuario,
    LocalDate fecha,
    BigDecimal total,
    String estado
) {}
