import { useEffect, useState } from "react";
import { getPedidosPorUsuario } from "../services/PedidoService";
import type { Pedido } from "../models/responses/Pedido";
import type { Usuario } from "../models/responses/Usuario";

const currencyFormatter = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  maximumFractionDigits: 0,
});

interface OrderHistoryDrawerProps {
  currentUser?: Usuario | null;
  onClose: () => void;
  refreshTrigger?: number;
}

function OrderHistoryDrawer({ currentUser, onClose, refreshTrigger }: OrderHistoryDrawerProps) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.rol !== "CLIENTE") {
      setPedidos([]);
      setError("");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    getPedidosPorUsuario(currentUser.id)
      .then(setPedidos)
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los pedidos.");
      })
      .finally(() => setIsLoading(false));
  }, [currentUser, refreshTrigger]);

  return (
    <div className="order-history-layer">
      <button className="order-history-backdrop" onClick={onClose} type="button" />
      <aside className="order-history-drawer" role="dialog" aria-modal="true" aria-labelledby="order-history-title">
        <div className="order-history-header">
          <div>
            <p className="eyebrow">Historial</p>
            <h2 id="order-history-title">Pedidos de {currentUser?.nombre ?? "cliente"}</h2>
          </div>
          <button className="cart-close" onClick={onClose} type="button" aria-label="Cerrar historial">
            ×
          </button>
        </div>

        {currentUser?.rol !== "CLIENTE" ? (
          <div className="order-history-empty">
            <p>Debes iniciar sesión con una cuenta de cliente para ver tu historial.</p>
          </div>
        ) : isLoading ? (
          <p>Cargando historial de pedidos...</p>
        ) : error ? (
          <p className="status-message error">{error}</p>
        ) : pedidos.length === 0 ? (
          <div className="order-history-empty">
            <p>No tienes pedidos registrados aún.</p>
          </div>
        ) : (
          <div className="order-history-table-wrapper">
            <table className="order-history-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.idPedido}>
                    <td>#{pedido.idPedido}</td>
                    <td>{pedido.fecha}</td>
                    <td>{currencyFormatter.format(pedido.total)}</td>
                    <td>{pedido.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button className="primary-action" onClick={onClose} type="button">
          Cerrar historial
        </button>
      </aside>
    </div>
  );
}

export default OrderHistoryDrawer;
