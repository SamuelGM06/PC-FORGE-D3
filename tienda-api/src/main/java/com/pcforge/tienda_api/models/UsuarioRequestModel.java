package com.pcforge.tienda_api.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioRequestModel(
    @NotBlank String nombre,
    @Email @NotBlank String correo,
    @NotBlank @Size(min = 6) String password,
    String rol
) {}
