import { useState, type FormEvent } from "react";
import { login, registrarUsuario } from "../services/UsuarioService";
import type { Usuario } from "../models/responses/Usuario";

interface LoginProps {
  onClose: () => void;
  onLoginSuccess: (usuario: Usuario) => void;
}

type AuthMode = "login" | "register";

function Login({ onClose, onLoginSuccess }: LoginProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const usuario =
        mode === "login"
          ? await login(correo, password)
          : await registrarUsuario({ nombre, correo, password, rol: "CLIENTE" });

      onLoginSuccess(usuario);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de autenticación");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setError("");
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <div className="modal-layer">
      <div className="modal">
        <h3>{mode === "login" ? "Iniciar sesión" : "Registrar cuenta"}</h3>
        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>
              Nombre
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                type="text"
                autoComplete="name"
              />
            </label>
          )}
          <label>
            Correo
            <input
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              type="email"
              autoComplete="email"
            />
          </label>
          <label>
            Contraseña
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </label>
          {error && <p className="status-message error">{error}</p>}
          <div className="modal-actions">
            <button className="primary-action" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "login"
                  ? "Iniciando..."
                  : "Registrando..."
                : mode === "login"
                ? "Iniciar sesión"
                : "Crear cuenta"}
            </button>
            <button type="button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
        <div className="auth-toggle">
          {mode === "login" ? (
            <p>
              ¿No tienes cuenta?{' '}
              <button className="link-button" onClick={toggleMode} type="button">
                Regístrate
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{' '}
              <button className="link-button" onClick={toggleMode} type="button">
                Iniciar sesión
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
