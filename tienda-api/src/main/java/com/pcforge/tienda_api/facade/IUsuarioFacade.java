package com.pcforge.tienda_api.facade;

import java.util.List;

import com.pcforge.tienda_api.models.LoginRequestModel;
import com.pcforge.tienda_api.models.UsuarioRequestModel;
import com.pcforge.tienda_api.models.UsuarioResponseModel;

public interface IUsuarioFacade {

    UsuarioResponseModel registrar(UsuarioRequestModel request);

    UsuarioResponseModel login(LoginRequestModel request);

    List<UsuarioResponseModel> listarUsuarios();
}
