package com.pcforge.tienda_api.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.pcforge.tienda_api.dtos.Detalle_PedidoDTO;
import com.pcforge.tienda_api.entities.Detalle_Pedido;
import com.pcforge.tienda_api.models.Detalle_PedidoResponseModel;

@Component
public class Detalle_PedidoMapper {
     public Detalle_PedidoDTO toDetalle_PedidoDTO(Detalle_Pedido detalle_pedido) {
        if (detalle_pedido == null) {
            return null;
        }

        return new Detalle_PedidoDTO(
            detalle_pedido.getId(),
            detalle_pedido.getIdPedido(),
            detalle_pedido.getIdProducto(),
            detalle_pedido.getCantidad(),
            detalle_pedido.getPrecioUnitario()
        );
    }

    public List<Detalle_PedidoDTO> toDetalle_PedidoDTOList(List<Detalle_Pedido> detalle_pedidos) {
        if (detalle_pedidos == null) {
            return null;
        }

        return detalle_pedidos.stream()
            .map(this::toDetalle_PedidoDTO)
            .collect(Collectors.toList());
    }
    
    public Detalle_PedidoResponseModel toDetalle_PedidoResponseModel(Detalle_PedidoDTO detalle_pedidoDTO) {
        if (detalle_pedidoDTO == null) {
            return null;
        }

        return new Detalle_PedidoResponseModel(
            detalle_pedidoDTO.idDetalle(),
            detalle_pedidoDTO.idPedido(),
            detalle_pedidoDTO.idProducto(),
            detalle_pedidoDTO.cantidad(),
            detalle_pedidoDTO.precioUnitario()
        );
    }

    public List<Detalle_PedidoResponseModel> toDetalle_PedidoResponseModelList(List<Detalle_PedidoDTO> detalle_pedidoDTOS) {
        if (detalle_pedidoDTOS == null) {
            return null;
        }

        return detalle_pedidoDTOS.stream()
            .map(this::toDetalle_PedidoResponseModel)
            .collect(Collectors.toList());
    }
}
