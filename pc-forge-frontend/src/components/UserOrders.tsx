import { useEffect, useState } from "react";
import { getPedidosPorUsuario } from "../services/PedidoService";
import type { Pedido } from "../models/responses/Pedido";
import type { Usuario } from "../models/responses/Usuario";

interface UserOrdersProps {
  selectedUser?: Usuario | null;
  refreshTrigger?: number;
}

function UserOrders({ selectedUser, refreshTrigger }: UserOrdersProps) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedUser) {
      setPedidos([]);
      setError("");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    getPedidosPorUsuario(selectedUser.id)
      .then(setPedidos)
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los pedidos del usuario.");
      })
      .finally(() => setIsLoading(false));
  }, [selectedUser, refreshTrigger]);

  if (!selectedUser) {
    return (
      <section className="admin-section" id="user-orders" aria-labelledby="user-orders-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Historial</p>
            <h2 id="user-orders-title">Selecciona un usuario</h2>
          </div>
        </div>
        <p>Haz clic en un usuario para ver su historial de pedidos.</p>
      </section>
    );
  }

  return (
    <section className="admin-section" id="user-orders" aria-labelledby="user-orders-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Historial</p>
          <h2 id="user-orders-title">Pedidos de {selectedUser.nombre}</h2>
        </div>
      </div>

      {isLoading ? (
        <p>Cargando historial de pedidos...</p>
      ) : error ? (
        <p className="status-message error">{error}</p>
      ) : pedidos.length === 0 ? (
        <p>No hay pedidos registrados para este usuario.</p>
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
                  <td>{pedido.total}</td>
                  <td>{pedido.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default UserOrders;
