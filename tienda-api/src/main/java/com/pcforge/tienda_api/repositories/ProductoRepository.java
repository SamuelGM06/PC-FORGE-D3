package com.pcforge.tienda_api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pcforge.tienda_api.entities.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    default List<Producto> getAllProductos() {
        return findAll();
    }
}
