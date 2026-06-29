package com.pcforge.tienda_api.services;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.pcforge.tienda_api.dtos.LoginRequestDTO;
import com.pcforge.tienda_api.dtos.UsuarioDTO;
import com.pcforge.tienda_api.dtos.UsuarioRequestDTO;
import com.pcforge.tienda_api.entities.Usuario;
import com.pcforge.tienda_api.exceptions.ApiException;
import com.pcforge.tienda_api.mappers.UsuarioMapper;
import com.pcforge.tienda_api.repositories.UsuarioRepository;

@Service
public class UsuarioServicio implements IUsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;
    private final TokenService tokenService;

    public UsuarioServicio(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper, TokenService tokenService) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
        this.tokenService = tokenService;
    }

    @Override
    public UsuarioDTO registrar(UsuarioRequestDTO request) {
        String correo = request.getCorreo().trim().toLowerCase();
        if (usuarioRepository.existsByCorreo(correo)) {
            throw new ApiException(HttpStatus.CONFLICT, "Ya existe un usuario registrado con ese correo.");
        }

        Usuario usuario = Usuario.builder()
            .nombre(request.getNombre().trim())
            .correo(correo)
            .password(hashPassword(request.getPassword()))
            .rol(normalizarRol(request.getRol()))
            .build();

        return usuarioMapper.toUsuarioDTO(usuarioRepository.save(usuario));
    }

    @Override
    public UsuarioDTO login(LoginRequestDTO request) {
        Usuario usuario = usuarioRepository.findByCorreo(request.getCorreo().trim().toLowerCase())
            .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos."));

        String hashedPassword = hashPassword(request.getPassword());
        if (!hashedPassword.equals(usuario.getPassword()) && !request.getPassword().equals(usuario.getPassword())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos.");
        }

        UsuarioDTO usuarioDTO = usuarioMapper.toUsuarioDTO(usuario);
        String token = tokenService.generateTokenFor(usuarioDTO);
        return new UsuarioDTO(usuarioDTO.id(), usuarioDTO.nombre(), usuarioDTO.correo(), usuarioDTO.rol(), token);
    }

    @Override
    public List<UsuarioDTO> listarUsuarios() {
        return usuarioMapper.toUsuarioDTOList(usuarioRepository.findAll());
    }

    @Override
    public Usuario obtenerEntidad(Integer idUsuario) {
        return usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Usuario no encontrado."));
    }

    private String normalizarRol(String rol) {
        if (rol == null || rol.isBlank()) {
            return "CLIENTE";
        }

        String rolNormalizado = rol.trim().toUpperCase();
        if (!rolNormalizado.equals("CLIENTE") && !rolNormalizado.equals("ADMIN")) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "El rol debe ser CLIENTE o ADMIN.");
        }
        return rolNormalizado;
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException exception) {
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "No se pudo procesar la contraseña.");
        }
    }
}
