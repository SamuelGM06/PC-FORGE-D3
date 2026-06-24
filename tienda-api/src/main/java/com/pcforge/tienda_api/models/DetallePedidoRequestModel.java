package com.pcforge.tienda_api.models;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record DetallePedidoRequestModel(
    @NotNull Integer idProducto,
    @Min(1) int cantidad
) {}
