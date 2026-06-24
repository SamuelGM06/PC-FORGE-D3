package com.pcforge.tienda_api.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.pcforge.tienda_api.dtos.UsuarioDTO;
import com.pcforge.tienda_api.entities.Usuario;
import com.pcforge.tienda_api.models.UsuarioResponseModel;

@Component
public class UsuarioMapper {
        public UsuarioDTO toUsuarioDTO(Usuario usuario) {
        if (usuario == null) {
            return null;
        }

        return new UsuarioDTO(
            usuario.getId(),
            usuario.getNombre(),
            usuario.getCorreo(),
            usuario.getRol()
        );
    }

    public List<UsuarioDTO> toUsuarioDTOList(List<Usuario> usuarios) {
        if (usuarios == null) {
            return null;
        }

        return usuarios.stream()
            .map(this::toUsuarioDTO)
            .collect(Collectors.toList());
    }
    
    public UsuarioResponseModel toUsuarioResponseModel(UsuarioDTO usuarioDTO) {
        if (usuarioDTO == null) {
            return null;
        }

        return new UsuarioResponseModel(
            usuarioDTO.id(),
            usuarioDTO.nombre(),
            usuarioDTO.correo(),
            usuarioDTO.rol()
        );
    }

    public List<UsuarioResponseModel> toUsuarioResponseModelList(List<UsuarioDTO> usuarioDTOS) {
        if (usuarioDTOS == null) {
            return null;
        }

        return usuarioDTOS.stream()
            .map(this::toUsuarioResponseModel)
            .collect(Collectors.toList());
    }

}
