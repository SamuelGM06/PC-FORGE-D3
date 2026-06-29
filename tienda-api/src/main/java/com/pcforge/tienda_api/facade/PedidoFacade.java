package com.pcforge.tienda_api.facade;

import java.util.List;

import org.springframework.stereotype.Component;

import com.pcforge.tienda_api.dtos.Detalle_PedidoRequestDTO;
import com.pcforge.tienda_api.dtos.PedidoCompletoDTO;
import com.pcforge.tienda_api.dtos.PedidoRequestDTO;
import com.pcforge.tienda_api.mappers.Detalle_PedidoMapper;
import com.pcforge.tienda_api.mappers.PedidoMapper;
import com.pcforge.tienda_api.models.PedidoCompletoResponseModel;
import com.pcforge.tienda_api.models.PedidoRequestModel;
import com.pcforge.tienda_api.models.PedidoResponseModel;
import com.pcforge.tienda_api.services.IPedidoService;

@Component
public class PedidoFacade implements IPedidoFacade {
    private final IPedidoService pedidoService;
    private final PedidoMapper pedidoMapper;
    private final Detalle_PedidoMapper detallePedidoMapper;

    public PedidoFacade(IPedidoService pedidoService, PedidoMapper pedidoMapper, Detalle_PedidoMapper detallePedidoMapper) {
        this.pedidoService = pedidoService;
        this.pedidoMapper = pedidoMapper;
        this.detallePedidoMapper = detallePedidoMapper;
    }

    @Override
    public List<PedidoResponseModel> listarPedidos() {
        return pedidoMapper.toPedidoResponseModelList(pedidoService.listarPedidos());
    }

    @Override
    public PedidoCompletoResponseModel obtenerPedido(Integer idPedido) {
        return toPedidoCompletoResponseModel(pedidoService.obtenerPedido(idPedido));
    }

    @Override
    public List<PedidoResponseModel> listarPedidosPorUsuario(Integer idUsuario) {
        return pedidoMapper.toPedidoResponseModelList(pedidoService.listarPedidosPorUsuario(idUsuario));
    }

    @Override
    public PedidoCompletoResponseModel crearPedido(PedidoRequestModel request, String token) {
        return toPedidoCompletoResponseModel(pedidoService.crearPedido(toPedidoRequestDTO(request), token));
    }

    @Override
    public PedidoResponseModel actualizarEstado(Integer idPedido, String estado) {
        return pedidoMapper.toPedidoResponseModel(pedidoService.actualizarEstado(idPedido, estado));
    }

    private PedidoRequestDTO toPedidoRequestDTO(PedidoRequestModel request) {
        List<Detalle_PedidoRequestDTO> detalles = request.detalles()
            .stream()
            .map(detalle -> new Detalle_PedidoRequestDTO(detalle.idProducto(), detalle.cantidad()))
            .toList();

        return new PedidoRequestDTO(request.idUsuario(), detalles);
    }

    private PedidoCompletoResponseModel toPedidoCompletoResponseModel(PedidoCompletoDTO pedidoDTO) {
        return new PedidoCompletoResponseModel(
            pedidoDTO.id(),
            pedidoDTO.idUsuario(),
            pedidoDTO.fecha(),
            pedidoDTO.total(),
            pedidoDTO.estado(),
            detallePedidoMapper.toDetalle_PedidoResponseModelList(pedidoDTO.detalles())
        );
    }
}
