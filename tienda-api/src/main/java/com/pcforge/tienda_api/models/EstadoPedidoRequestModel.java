package com.pcforge.tienda_api.models;

import jakarta.validation.constraints.NotBlank;

public record EstadoPedidoRequestModel(
    @NotBlank String estado
) {}
