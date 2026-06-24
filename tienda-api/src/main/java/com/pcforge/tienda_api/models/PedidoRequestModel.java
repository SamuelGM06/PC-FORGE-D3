package com.pcforge.tienda_api.models;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PedidoRequestModel(
    @NotNull Integer idUsuario,
    @Valid @NotEmpty List<DetallePedidoRequestModel> detalles
) {}
