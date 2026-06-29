package com.pcforge.tienda_api.facade;

import java.util.List;

import com.pcforge.tienda_api.models.PedidoCompletoResponseModel;
import com.pcforge.tienda_api.models.PedidoRequestModel;
import com.pcforge.tienda_api.models.PedidoResponseModel;

public interface IPedidoFacade {

    List<PedidoResponseModel> listarPedidos();

    PedidoCompletoResponseModel obtenerPedido(Integer idPedido);

    List<PedidoResponseModel> listarPedidosPorUsuario(Integer idUsuario);

    PedidoCompletoResponseModel crearPedido(PedidoRequestModel request, String token);

    PedidoResponseModel actualizarEstado(Integer idPedido, String estado);
}
