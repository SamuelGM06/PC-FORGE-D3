import { useState, type FormEvent } from "react";
import { login } from "../services/UsuarioService";
import type { Usuario } from "../models/responses/Usuario";

interface LoginProps {
  onClose: () => void;
  onLoginSuccess: (usuario: Usuario) => void;
}

function Login({ onClose, onLoginSuccess }: LoginProps) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const usuario = await login(correo, password);
      onLoginSuccess(usuario);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de login");
    }
  };

  return (
    <div className="modal-layer">
      <div className="modal">
        <h3>Iniciar sesión</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Correo
            <input value={correo} onChange={(e) => setCorreo(e.target.value)} required type="email" />
          </label>
          <label>
            Contraseña
            <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
          </label>
          {error && <p className="status-message error">{error}</p>}
          <div className="modal-actions">
            <button className="primary-action" type="submit">Iniciar sesión</button>
            <button type="button" onClick={onClose}>Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
