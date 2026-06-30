package com.pcforge.tienda_api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.pcforge.tienda_api.dtos.UsuarioRequestDTO;
import com.pcforge.tienda_api.repositories.UsuarioRepository;
import com.pcforge.tienda_api.services.IUsuarioService;

@SpringBootApplication
public class TiendaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TiendaApiApplication.class, args);
	}

	@Bean
	public CommandLineRunner adminBootstrap(IUsuarioService usuarioService, UsuarioRepository usuarioRepository) {
		return args -> {
			String adminName = System.getenv().getOrDefault("ADMIN_NAME", "Administrador");
			String adminEmail = System.getenv().getOrDefault("ADMIN_EMAIL", "admin@pcforge.com").trim().toLowerCase();
			String adminPassword = System.getenv().getOrDefault("ADMIN_PASSWORD", "Admin1234!");

			if (!usuarioRepository.existsByCorreo(adminEmail)) {
				UsuarioRequestDTO adminRequest = new UsuarioRequestDTO(
					adminName,
					adminEmail,
					adminPassword,
					"ADMIN"
				);
				usuarioService.registrar(adminRequest);
				System.out.println("Admin inicial creado: " + adminEmail);
			} else {
				System.out.println("Admin existente detectado: " + adminEmail);
			}
		};
	}
}
