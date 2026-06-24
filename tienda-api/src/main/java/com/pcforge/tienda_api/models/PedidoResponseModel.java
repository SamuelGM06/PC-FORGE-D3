package com.pcforge.tienda_api.models;

import java.math.BigDecimal;
import java.time.LocalDate;

public record PedidoResponseModel(
    Integer id,
    Integer idUsuario,
    LocalDate fecha,
    BigDecimal total,
    String estado
) {}
