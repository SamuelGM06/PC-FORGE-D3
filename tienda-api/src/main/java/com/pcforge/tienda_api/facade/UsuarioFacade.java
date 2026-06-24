package com.pcforge.tienda_api.facade;

import java.util.List;

import org.springframework.stereotype.Component;

import com.pcforge.tienda_api.dtos.LoginRequestDTO;
import com.pcforge.tienda_api.dtos.UsuarioRequestDTO;
import com.pcforge.tienda_api.mappers.UsuarioMapper;
import com.pcforge.tienda_api.models.LoginRequestModel;
import com.pcforge.tienda_api.models.UsuarioRequestModel;
import com.pcforge.tienda_api.models.UsuarioResponseModel;
import com.pcforge.tienda_api.services.IUsuarioService;

@Component
public class UsuarioFacade implements IUsuarioFacade {
    private final IUsuarioService usuarioService;
    private final UsuarioMapper usuarioMapper;

    public UsuarioFacade(IUsuarioService usuarioService, UsuarioMapper usuarioMapper) {
        this.usuarioService = usuarioService;
        this.usuarioMapper = usuarioMapper;
    }

    @Override
    public UsuarioResponseModel registrar(UsuarioRequestModel request) {
        UsuarioRequestDTO requestDTO = new UsuarioRequestDTO(
            request.nombre(),
            request.correo(),
            request.password(),
            request.rol()
        );

        return usuarioMapper.toUsuarioResponseModel(usuarioService.registrar(requestDTO));
    }

    @Override
    public UsuarioResponseModel login(LoginRequestModel request) {
        LoginRequestDTO requestDTO = new LoginRequestDTO(request.correo(), request.password());
        return usuarioMapper.toUsuarioResponseModel(usuarioService.login(requestDTO));
    }

    @Override
    public List<UsuarioResponseModel> listarUsuarios() {
        return usuarioMapper.toUsuarioResponseModelList(usuarioService.listarUsuarios());
    }
}
