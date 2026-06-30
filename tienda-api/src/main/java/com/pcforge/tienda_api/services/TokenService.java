package com.pcforge.tienda_api.services;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.pcforge.tienda_api.dtos.UsuarioDTO;

@Service
public class TokenService {
    private final Map<String, UsuarioDTO> tokens = new ConcurrentHashMap<>();

    public String generateTokenFor(UsuarioDTO usuario) {
        String token = UUID.randomUUID().toString();
        UsuarioDTO usuarioWithToken = new UsuarioDTO(usuario.id(), usuario.nombre(), usuario.correo(), usuario.rol(), token);
        tokens.put(token, usuarioWithToken);
        return token;
    }

    public UsuarioDTO validateToken(String token) {
        if (token == null) return null;
        return tokens.get(token);
    }

    public void revokeToken(String token) {
        tokens.remove(token);
    }
}
