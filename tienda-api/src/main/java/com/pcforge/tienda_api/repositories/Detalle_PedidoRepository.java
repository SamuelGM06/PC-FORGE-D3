package com.pcforge.tienda_api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pcforge.tienda_api.entities.Detalle_Pedido;

@Repository
public interface Detalle_PedidoRepository extends JpaRepository<Detalle_Pedido, Integer> {
    default List<Detalle_Pedido> getAllProductos() {
        return findAll();
    }

    List<Detalle_Pedido> findByIdPedido(Integer idPedido);
    
}
