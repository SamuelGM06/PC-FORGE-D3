import { useState } from "react";
import logo from "../assets/PCFORGE logo.png";
import type { ViewMode } from "../App";
import type { AuthResponse } from "../services/UsuarioService";

interface HeaderProps {
  authUser: AuthResponse;
  cartItemCount: number;
  onCartOpen: () => void;
  onLogout: () => void;
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
}

function Header({ authUser, cartItemCount, onCartOpen, onLogout, viewMode, onViewModeChange }: HeaderProps) {
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const isAdminUser = authUser.rol === "ADMIN";

  const handleClientClick = () => {
    setIsAdminMenuOpen(false);
    onViewModeChange("cliente");
  };

  const handleAdminClick = () => {
    onViewModeChange("admin");
    setIsAdminMenuOpen((isOpen) => !isOpen);
  };

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="PC-FORGE inicio">
        <img src={logo} alt="" />
        <span>PC-FORGE</span>
      </a>

      <nav>
        <button
          className={viewMode === "cliente" ? "active" : ""}
          onClick={handleClientClick}
          type="button"
        >
          Cliente
        </button>
        {isAdminUser && (
          <div className="admin-menu">
            <button
              aria-expanded={isAdminMenuOpen}
              aria-haspopup="menu"
              className={viewMode === "admin" ? "active" : ""}
              onClick={handleAdminClick}
              type="button"
            >
              Admin {isAdminMenuOpen ? "▴" : "▾"}
            </button>
            {isAdminMenuOpen && (
              <div className="admin-menu-dropdown" role="menu">
                <a href="#productos" onClick={() => setIsAdminMenuOpen(false)} role="menuitem">
                  Productos
                </a>
                <a href="#usuarios" onClick={() => setIsAdminMenuOpen(false)} role="menuitem">
                  Usuarios
                </a>
              </div>
            )}
          </div>
        )}
        {viewMode === "cliente" && (
          <>
            <a href="#productos">Productos</a>
            <button className="cart-button" onClick={onCartOpen} type="button">
              Carrito <span>{cartItemCount}</span>
            </button>
          </>
        )}
      </nav>
      <div className="user-actions">
        <span className="user-badge">{authUser.nombre}</span>
        <button className="secondary-action" onClick={onLogout} type="button">
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;
