package com.pcforge.tienda_api.models;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductoRequestModel(
    @NotBlank String nombre,
    String descripcion,
    @NotNull @DecimalMin(value = "0.0", inclusive = false) BigDecimal precio,
    @Min(0) int stock,
    @NotBlank String categoria,
    String imagen
) {}
