import { useEffect, useState, type FormEvent } from "react";
import {
  getUsuarios,
  registrarUsuario,
  type UsuarioPayload,
} from "../services/UsuarioService";
import type { Usuario } from "../models/responses/Usuario";
import UserOrders from "./UserOrders";

const emptyUsuario: UsuarioPayload = {
  nombre: "",
  correo: "",
  password: "",
  rol: "CLIENTE",
};

function UserManagement() {
  const [formUsuario, setFormUsuario] = useState<UsuarioPayload>(emptyUsuario);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"info" | "success" | "error">("info");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    getUsuarios()
      .then(setUsuarios)
      .catch((error) => {
        console.error(error);
        setUsersError("No se pudieron cargar los usuarios.");
      })
      .finally(() => setIsLoadingUsers(false));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatusMessage("Registrando usuario...");
    setStatusType("info");

    try {
      const usuario = await registrarUsuario(formUsuario);
      setUsuarios((currentUsers) => [usuario, ...currentUsers]);
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

      <div className="user-list">
        <div className="user-list-heading">
          <div>
            <p className="eyebrow">Directorio</p>
            <h3>Usuarios registrados</h3>
          </div>
          {!isLoadingUsers && !usersError && <span>{usuarios.length}</span>}
        </div>

        {isLoadingUsers ? (
          <p className="user-list-message">Cargando usuarios...</p>
        ) : usersError ? (
          <p className="user-list-message error">{usersError}</p>
        ) : usuarios.length === 0 ? (
          <p className="user-list-message">No hay usuarios registrados.</p>
        ) : (
          <div className="user-table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr
                    className={selectedUsuario?.id === usuario.id ? "selected-row" : ""}
                    key={usuario.id}
                    onClick={() => setSelectedUsuario(usuario)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setSelectedUsuario(usuario);
                      }
                    }}
                  >
                    <td>#{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>
                      <span className={`role-badge ${usuario.rol.toLowerCase()}`}>
                        {usuario.rol}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <UserOrders selectedUser={selectedUsuario} />
    </section>
  );
}

export default UserManagement;
