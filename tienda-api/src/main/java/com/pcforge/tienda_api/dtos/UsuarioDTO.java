package com.pcforge.tienda_api.dtos;

public record UsuarioDTO(
    Integer id,
    String nombre,
    String correo,
    String rol
) {}
