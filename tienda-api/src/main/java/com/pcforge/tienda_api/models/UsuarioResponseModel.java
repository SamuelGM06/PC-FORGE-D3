package com.pcforge.tienda_api.models;

public record UsuarioResponseModel(
    Integer id,
    String nombre,
    String correo,
    String rol
) {}
