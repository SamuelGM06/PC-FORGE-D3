package com.pcforge.tienda_api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pcforge.tienda_api.entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    default List<Usuario> getAllProductos() {
        return findAll();
    }

    Optional<Usuario> findByCorreo(String correo);

    boolean existsByCorreo(String correo);
    
}
