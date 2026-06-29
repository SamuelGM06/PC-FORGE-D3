import { useState, type FormEvent } from "react";
import { loginUsuario, type LoginPayload, type AuthResponse } from "../services/UsuarioService";

interface LoginProps {
  onLogin: (user: AuthResponse) => void;
}

function Login({ onLogin }: LoginProps) {
  const [formData, setFormData] = useState<LoginPayload>({ correo: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const user = await loginUsuario(formData);
      onLogin(user);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("No se pudo iniciar sesión. Revisa que la API esté activa.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div>
          <p className="eyebrow">Iniciar sesión</p>
          <h1 id="login-title">Bienvenido a PC-FORGE</h1>
          <p>Ingresa con tu correo y contraseña para continuar como cliente o administrador.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Correo
            <input
              autoComplete="email"
              onChange={(event) => setFormData({ ...formData, correo: event.target.value })}
              required
              type="email"
              value={formData.correo}
            />
          </label>

          <label>
            Contraseña
            <input
              autoComplete="current-password"
              minLength={6}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              required
              type="password"
              value={formData.password}
            />
          </label>

          <button className="primary-action" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Entrando..." : "Iniciar sesión"}
          </button>

          {errorMessage && <p className="status-message error">{errorMessage}</p>}
        </form>
      </section>
    </main>
  );
}

export default Login;
