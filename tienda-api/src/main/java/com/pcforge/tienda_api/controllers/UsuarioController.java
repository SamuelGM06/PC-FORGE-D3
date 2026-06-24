package com.pcforge.tienda_api.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pcforge.tienda_api.facade.IUsuarioFacade;
import com.pcforge.tienda_api.models.LoginRequestModel;
import com.pcforge.tienda_api.models.UsuarioRequestModel;
import com.pcforge.tienda_api.models.UsuarioResponseModel;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final IUsuarioFacade usuarioFacade;

    public UsuarioController(IUsuarioFacade usuarioFacade) {
        this.usuarioFacade = usuarioFacade;
    }

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponseModel registrar(@Valid @RequestBody UsuarioRequestModel request) {
        return usuarioFacade.registrar(request);
    }

    @PostMapping("/login")
    public UsuarioResponseModel login(@Valid @RequestBody LoginRequestModel request) {
        return usuarioFacade.login(request);
    }

    @GetMapping
    public List<UsuarioResponseModel> listarUsuarios() {
        return usuarioFacade.listarUsuarios();
    }
}
