package com.pcforge.tienda_api.services;

import java.util.List;

import com.pcforge.tienda_api.dtos.PedidoCompletoDTO;
import com.pcforge.tienda_api.dtos.PedidoDTO;
import com.pcforge.tienda_api.dtos.PedidoRequestDTO;

public interface IPedidoService {

    List<PedidoDTO> listarPedidos();

    List<PedidoDTO> listarPedidosPorUsuario(Integer idUsuario);

    PedidoCompletoDTO obtenerPedido(Integer idPedido);

    PedidoCompletoDTO crearPedido(PedidoRequestDTO request);

    PedidoDTO actualizarEstado(Integer idPedido, String estado);
}
