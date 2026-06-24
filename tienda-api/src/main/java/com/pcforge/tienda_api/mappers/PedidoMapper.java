package com.pcforge.tienda_api.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.pcforge.tienda_api.dtos.PedidoDTO;
import com.pcforge.tienda_api.entities.Pedido;
import com.pcforge.tienda_api.models.PedidoResponseModel;

@Component
public class PedidoMapper {
    public PedidoDTO toPedidoDTO(Pedido pedido) {
        if (pedido == null) {
            return null;
        }

        return new PedidoDTO(
            pedido.getId(),
            pedido.getIdUsuario(),
            pedido.getFecha(),
            pedido.getTotal(),
            pedido.getEstado()
        );
    }

    public List<PedidoDTO> toPedidoDTOList(List<Pedido> pedidos) {
        if (pedidos == null) {
            return null;
        }

        return pedidos.stream()
            .map(this::toPedidoDTO)
            .collect(Collectors.toList());
    }
    
    public PedidoResponseModel toPedidoResponseModel(PedidoDTO pedidoDTO) {
        if (pedidoDTO == null) {
            return null;
        }

        return new PedidoResponseModel(
            pedidoDTO.id(),
            pedidoDTO.idUsuario(),
            pedidoDTO.fecha(),
            pedidoDTO.total(),
            pedidoDTO.estado()
        );
    }

    public List<PedidoResponseModel> toPedidoResponseModelList(List<PedidoDTO> pedidoDTOS) {
        if (pedidoDTOS == null) {
            return null;
        }

        return pedidoDTOS.stream()
            .map(this::toPedidoResponseModel)
            .collect(Collectors.toList());
    }
}
