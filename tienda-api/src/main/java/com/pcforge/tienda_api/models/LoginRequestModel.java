package com.pcforge.tienda_api.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestModel(
    @Email @NotBlank String correo,
    @NotBlank String password
) {}
