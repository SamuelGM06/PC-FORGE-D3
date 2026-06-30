import { useMemo, useState, type FormEvent } from "react";
import { login, registrarUsuario } from "../services/UsuarioService";
import type { Usuario } from "../models/responses/Usuario";

interface LoginProps {
  onClose: () => void;
  onLoginSuccess: (usuario: Usuario) => void;
}

type AuthMode = "login" | "register";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login({ onClose, onLoginSuccess }: LoginProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);

  const passwordStrengthLabel = ["Muy débil", "Débil", "Aceptable", "Fuerte", "Excelente"][
    passwordScore
  ];

  const validateForm = () => {
    const errors: string[] = [];
    if (!correo.trim()) {
      errors.push("El correo es obligatorio.");
    } else if (!emailPattern.test(correo.trim())) {
      errors.push("Introduce un correo válido.");
    }

    if (!password) {
      errors.push("La contraseña es obligatoria.");
    } else if (password.length < 6) {
      errors.push("La contraseña debe tener al menos 6 caracteres.");
    }

    if (mode === "register") {
      if (!nombre.trim()) {
        errors.push("El nombre es obligatorio para crear la cuenta.");
      }
      if (!confirmPassword) {
        errors.push("Confirma tu contraseña.");
      } else if (password !== confirmPassword) {
        errors.push("Las contraseñas no coinciden.");
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setValidationErrors([]);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const usuario =
        mode === "login"
          ? await login(correo.trim(), password)
          : await registrarUsuario({
              nombre: nombre.trim(),
              correo: correo.trim(),
              password,
              rol: "CLIENTE",
            });

      onLoginSuccess(usuario);
      if (rememberMe) {
        localStorage.setItem("pcforge_user", JSON.stringify(usuario));
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de autenticación");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (nextMode: AuthMode) => {
    setError("");
    setValidationErrors([]);
    setMode(nextMode);
  };

  return (
    <div className="auth-modal-layer" onClick={onClose}>
      <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
        <button className="auth-close" onClick={onClose} type="button" aria-label="Cerrar formulario">
          ×
        </button>

        <div className="auth-header">
          <div>
            <p className="eyebrow">Acceso seguro</p>
            <h2>{mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}</h2>
            <p className="auth-subtitle">
              {mode === "login"
                ? "Inicia sesión para continuar con tu pedido"
                : "Regístrate y compra con un solo clic"}
            </p>
          </div>
        </div>

        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => switchMode("login")}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === "register" ? "active" : ""}`}
            onClick={() => switchMode("register")}
          >
            Registrarse
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === "register" && (
            <label className="auth-field">
              <span>Nombre completo</span>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                autoComplete="name"
                placeholder="Ej. Juan Pérez"
              />
            </label>
          )}

          <label className="auth-field">
            <span>Correo electrónico</span>
            <input
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="tú@correo.com"
            />
          </label>

          <label className="auth-field">
            <span>Contraseña</span>
            <div className="auth-password-row">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                minLength={6}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="Escribe tu contraseña"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </label>

          {mode === "register" && (
            <label className="auth-field">
              <span>Confirmar contraseña</span>
              <div className="auth-password-row">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirmPassword ? "text" : "password"}
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Repite tu contraseña"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                >
                  {showConfirmPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </label>
          )}

          {mode === "register" && (
            <div className="password-strength">
              <span>Seguridad de la contraseña:</span>
              <div className="strength-meter">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`strength-segment ${passwordScore >= level ? "active" : ""}`}
                  />
                ))}
              </div>
              <small>{password ? passwordStrengthLabel : "Al menos 6 caracteres"}</small>
            </div>
          )}

          <div className="auth-bool">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Recordarme en este equipo
            </label>
          </div>

          {(error || validationErrors.length > 0) && (
            <div className="status-panel">
              {error && <p className="status-message error">{error}</p>}
              {validationErrors.length > 0 && (
                <ul className="status-message error">
                  {validationErrors.map((message) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <button className="primary-action auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? mode === "login"
                ? "Iniciando sesión..."
                : "Creando cuenta..."
              : mode === "login"
              ? "Entrar ahora"
              : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-cta">
          {mode === "login" ? (
            <>
              ¿Aún no tienes cuenta?{' '}
              <button type="button" className="link-button" onClick={() => switchMode("register")}>Crear ahora</button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <button type="button" className="link-button" onClick={() => switchMode("login")}>Inicia sesión</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;
