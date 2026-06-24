package com.pcforge.tienda_api.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record PedidoCompletoResponseModel(
    Integer id,
    Integer idUsuario,
    LocalDate fecha,
    BigDecimal total,
    String estado,
    List<Detalle_PedidoResponseModel> detalles
) {}
