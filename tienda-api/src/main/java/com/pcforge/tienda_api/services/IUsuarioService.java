package com.pcforge.tienda_api.services;

import java.util.List;

import com.pcforge.tienda_api.dtos.LoginRequestDTO;
import com.pcforge.tienda_api.dtos.UsuarioDTO;
import com.pcforge.tienda_api.dtos.UsuarioRequestDTO;
import com.pcforge.tienda_api.entities.Usuario;

public interface IUsuarioService {

    UsuarioDTO registrar(UsuarioRequestDTO request);

    UsuarioDTO login(LoginRequestDTO request);

    List<UsuarioDTO> listarUsuarios();

    Usuario obtenerEntidad(Integer idUsuario);
}
