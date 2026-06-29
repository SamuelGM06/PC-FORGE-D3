import { useState, type FormEvent } from "react";
import {
  registrarUsuario,
  type UsuarioPayload,
} from "../services/UsuarioService";

const emptyUsuario: UsuarioPayload = {
  nombre: "",
  correo: "",
  password: "",
  rol: "CLIENTE",
};

function UserManagement() {
  const [formUsuario, setFormUsuario] = useState<UsuarioPayload>(emptyUsuario);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"info" | "success" | "error">("info");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatusMessage("Registrando usuario...");
    setStatusType("info");

    try {
      const usuario = await registrarUsuario(formUsuario);
      setFormUsuario(emptyUsuario);
      setStatusMessage(`${usuario.nombre} fue registrado correctamente.`);
      setStatusType("success");
    } catch (error) {
      console.error(error);
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "No se pudo registrar. Revisa que la API este activa.",
      );
      setStatusType("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="admin-section" id="usuarios" aria-labelledby="users-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Usuarios</p>
          <h2 id="users-title">Agregar usuario</h2>
        </div>
      </div>

      <form className="product-form user-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            autoComplete="name"
            onChange={(event) =>
              setFormUsuario({ ...formUsuario, nombre: event.target.value })
            }
            required
            type="text"
            value={formUsuario.nombre}
          />
        </label>
        <label>
          Correo
          <input
            autoComplete="email"
            onChange={(event) =>
              setFormUsuario({ ...formUsuario, correo: event.target.value })
            }
            required
            type="email"
            value={formUsuario.correo}
          />
        </label>
        <label>
          Contrasena
          <input
            autoComplete="new-password"
            minLength={6}
            onChange={(event) =>
              setFormUsuario({ ...formUsuario, password: event.target.value })
            }
            required
            type="password"
            value={formUsuario.password}
          />
        </label>
        <button className="primary-action" disabled={isSaving} type="submit">
          {isSaving ? "Registrando..." : "Agregar usuario"}
        </button>
      </form>

      {statusMessage && <p className={`status-message ${statusType}`}>{statusMessage}</p>}
    </section>
  );
}

export default UserManagement;
