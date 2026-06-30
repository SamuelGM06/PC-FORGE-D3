import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Cart from "./components/Cart";
import OrderHistoryDrawer from "./components/OrderHistoryDrawer";
import Login from "./components/Login";
import type { CartItem } from "./models/CartItem";
import type { Producto } from "./models/responses/Producto";
import "./App.css";
import type { Usuario } from "./models/responses/Usuario";
import { crearPedido } from "./services/PedidoService";

export type ViewMode = "cliente" | "admin";

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("cliente");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [successFeedback, setSuccessFeedback] = useState("");
  const [orderRefreshKey, setOrderRefreshKey] = useState(0);

  const cartItemCount = cartItems.reduce(
    (currentCount, item) => currentCount + item.quantity,
    0,
  );

  const handleViewModeChange = (nextViewMode: ViewMode) => {
    setViewMode(nextViewMode);

    if (nextViewMode === "admin") {
      setIsCartOpen(false);
    }
  };

  const handleAddToCart = (product: Producto) => {
    setCartItems((currentItems) => {
      const currentItem = currentItems.find(
        (item) => item.product.idProducto === product.idProducto,
      );

      if (!currentItem) {
        return [...currentItems, { product, quantity: 1 }];
      }

      return currentItems.map((item) =>
        item.product.idProducto === product.idProducto
          ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
          : item,
      );
    });
    setIsCartOpen(true);
  };

  const handleLoginSuccess = (usuario: Usuario) => {
    setCurrentUser(usuario);
    localStorage.setItem("pcforge_user", JSON.stringify(usuario));
    if (usuario.rol === "ADMIN") {
      setViewMode("admin");
    } else {
      setViewMode("cliente");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("pcforge_user");
    setViewMode("cliente");
    setIsOrdersOpen(false);
  };

  const handleOrdersOpen = () => {
    setIsOrdersOpen(true);
  };

  const handleOrdersClose = () => {
    setIsOrdersOpen(false);
  };

  const handleFinalize = async () => {
    if (!currentUser) return;

    const payload = {
      idUsuario: currentUser.id,
      detalles: cartItems.map((item) => ({ idProducto: item.product.idProducto, cantidad: item.quantity })),
    };

    try {
      await crearPedido(payload, currentUser.token);
      setCartItems([]);
      setIsCartOpen(false);
      setOrderRefreshKey((current) => current + 1);
      setSuccessFeedback("La compra fue realizada con éxito.");
    } catch (error) {
      setSuccessFeedback(error instanceof Error ? error.message : "Error al crear pedido");
    }
  };

  const closeFeedback = () => setSuccessFeedback("");

  // Try to restore user from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("pcforge_user");
    if (raw) {
      try {
        const u: Usuario = JSON.parse(raw);
        setCurrentUser(u);
        if (u.rol === "ADMIN") setViewMode("admin");
      } catch {
        // ignore
      }
    }
  }, []);

  const handleUpdateQuantity = (idProducto: number, quantity: number) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.idProducto === idProducto
          ? {
              ...item,
              quantity: Math.max(1, Math.min(quantity, item.product.stock)),
            }
          : item,
      ),
    );
  };

  const handleRemoveFromCart = (idProducto: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.idProducto !== idProducto),
    );
  };

  return (
    <>
      <Header
        cartItemCount={cartItemCount}
        onCartOpen={() => setIsCartOpen(true)}
        onOrderHistoryOpen={handleOrdersOpen}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        currentUser={currentUser}
        onLoginOpen={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />
      {successFeedback && (
        <div className="feedback-modal-layer" role="alertdialog" aria-modal="true" aria-labelledby="feedback-title">
          <div className="feedback-backdrop" onClick={closeFeedback} />
          <aside className="feedback-modal">
            <div className="feedback-modal-header">
              <h2 id="feedback-title">Compra realizada</h2>
            </div>
            <p>{successFeedback}</p>
            <button className="primary-action" onClick={closeFeedback} type="button">
              Cerrar
            </button>
          </aside>
        </div>
      )}
      <Home
        onAddToCart={handleAddToCart}
        viewMode={viewMode}
      />
      {viewMode === "cliente" && isOrdersOpen && (
        <OrderHistoryDrawer
          currentUser={currentUser}
          onClose={handleOrdersClose}
          refreshTrigger={orderRefreshKey}
        />
      )}
      {viewMode === "cliente" && isCartOpen && (
        <Cart
          items={cartItems}
          onClear={() => setCartItems([])}
          onClose={() => setIsCartOpen(false)}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          currentUser={currentUser}
          onLoginOpen={() => setIsLoginOpen(true)}
          onFinalize={handleFinalize}
        />
      )}
      {isLoginOpen && (
        <Login
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      <Footer />
    </>
  );
}

export default App;

/*import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App*/
