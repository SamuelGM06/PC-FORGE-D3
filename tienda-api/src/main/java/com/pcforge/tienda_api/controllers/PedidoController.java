package com.pcforge.tienda_api.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pcforge.tienda_api.facade.IPedidoFacade;
import com.pcforge.tienda_api.models.EstadoPedidoRequestModel;
import com.pcforge.tienda_api.models.PedidoCompletoResponseModel;
import com.pcforge.tienda_api.models.PedidoRequestModel;
import com.pcforge.tienda_api.models.PedidoResponseModel;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    private final IPedidoFacade pedidoFacade;

    public PedidoController(IPedidoFacade pedidoFacade) {
        this.pedidoFacade = pedidoFacade;
    }

    @GetMapping
    public List<PedidoResponseModel> listarPedidos() {
        return pedidoFacade.listarPedidos();
    }

    @GetMapping("/{idPedido}")
    public PedidoCompletoResponseModel obtenerPedido(@PathVariable Integer idPedido) {
        return pedidoFacade.obtenerPedido(idPedido);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<PedidoResponseModel> listarPedidosPorUsuario(@PathVariable Integer idUsuario) {
        return pedidoFacade.listarPedidosPorUsuario(idUsuario);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PedidoCompletoResponseModel crearPedido(
        @RequestHeader(value = "Authorization", required = false) String authorization,
        @Valid @RequestBody PedidoRequestModel request
    ) {
        String token = null;
        if (authorization != null && authorization.startsWith("Bearer ")) {
            token = authorization.substring("Bearer ".length());
        }
        return pedidoFacade.crearPedido(request, token);
    }

    @PutMapping("/{idPedido}/estado")
    public PedidoResponseModel actualizarEstado(@PathVariable Integer idPedido, @Valid @RequestBody EstadoPedidoRequestModel request) {
        return pedidoFacade.actualizarEstado(idPedido, request.estado());
    }
}
