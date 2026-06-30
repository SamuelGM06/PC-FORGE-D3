import { useState } from "react";
import logo from "../assets/PCFORGE logo.png";
import type { ViewMode } from "../App";
import type { Usuario } from "../models/responses/Usuario";

interface HeaderProps {
  cartItemCount: number;
  onCartOpen: () => void;
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
  currentUser?: Usuario | null;
  onLoginOpen: () => void;
  onLogout: () => void;
}

function Header({ cartItemCount, onCartOpen, viewMode, onViewModeChange, currentUser, onLoginOpen, onLogout }: HeaderProps) {
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const handleClientClick = () => {
    setIsAdminMenuOpen(false);
    onViewModeChange("cliente");
  };

  const handleAdminClick = () => {
    onViewModeChange("admin");
    setIsAdminMenuOpen((isOpen) => !isOpen);
  };

  const isAdmin = currentUser?.rol === "ADMIN";

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
        <div className="admin-menu">
          <button
            aria-expanded={isAdminMenuOpen}
            aria-haspopup="menu"
            className={viewMode === "admin" ? "active" : ""}
            onClick={handleAdminClick}
            type="button"
            disabled={!isAdmin}
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
        {viewMode === "cliente" && (
          <>
            <a href="#productos">Productos</a>
            <button className="cart-button" onClick={onCartOpen} type="button">
              Carrito <span>{cartItemCount}</span>
            </button>
          </>
        )}

        <div className="auth-actions">
          {currentUser ? (
            <>
              <span className="user-name">{currentUser.nombre}</span>
              <button className="secondary-action" onClick={onLogout} type="button">
                Cerrar sesión
              </button>
            </>
          ) : (
            <button className="primary-action" onClick={onLoginOpen} type="button">
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
