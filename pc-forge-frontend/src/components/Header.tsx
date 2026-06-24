import logo from "../assets/PCFORGE logo.png";
import type { ViewMode } from "../App";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
}

function Header({ viewMode, onViewModeChange }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="PC-FORGE inicio">
        <img src={logo} alt="" />
        <span>PC-FORGE</span>
      </a>

      <nav>
        <button
          className={viewMode === "cliente" ? "active" : ""}
          onClick={() => onViewModeChange("cliente")}
          type="button"
        >
          Cliente
        </button>
        <button
          className={viewMode === "admin" ? "active" : ""}
          onClick={() => onViewModeChange("admin")}
          type="button"
        >
          Admin
        </button>
        <a href="#productos">Productos</a>
      </nav>
    </header>
  );
}

export default Header;
