package com.pcforge.tienda_api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pcforge.tienda_api.entities.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    default List<Pedido> getAllProductos() {
        return findAll();
    }

    List<Pedido> findByIdUsuario(Integer idUsuario);
    
}
