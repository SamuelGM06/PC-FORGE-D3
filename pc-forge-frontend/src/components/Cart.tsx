import type { CartItem } from "../models/CartItem";

const currencyFormatter = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  maximumFractionDigits: 0,
});

interface CartProps {
  items: CartItem[];
  onClear: () => void;
  onClose: () => void;
  onRemove: (idProducto: number) => void;
  onUpdateQuantity: (idProducto: number, quantity: number) => void;
}

function Cart({ items, onClear, onClose, onRemove, onUpdateQuantity }: CartProps) {
  const total = items.reduce(
    (currentTotal, item) => currentTotal + item.product.precio * item.quantity,
    0,
  );

  return (
    <div className="cart-layer">
      <button
        aria-label="Cerrar carrito"
        className="cart-backdrop"
        onClick={onClose}
        type="button"
      />
      <aside aria-labelledby="cart-title" aria-modal="true" className="cart-drawer" role="dialog">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Tu compra</p>
            <h2 id="cart-title">Carrito</h2>
          </div>
          <button aria-label="Cerrar carrito" className="cart-close" onClick={onClose} type="button">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Tu carrito esta vacio.</p>
            <button className="secondary-action" onClick={onClose} type="button">
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <article className="cart-item" key={product.idProducto}>
                  <img src={product.imagen} alt="" />
                  <div className="cart-item-info">
                    <h3>{product.nombre}</h3>
                    <strong>{currencyFormatter.format(product.precio * quantity)}</strong>
                    <div className="cart-item-actions">
                      <div className="quantity-control" aria-label={`Cantidad de ${product.nombre}`}>
                        <button
                          aria-label={`Reducir cantidad de ${product.nombre}`}
                          disabled={quantity === 1}
                          onClick={() => onUpdateQuantity(product.idProducto, quantity - 1)}
                          type="button"
                        >
                          −
                        </button>
                        <span>{quantity}</span>
                        <button
                          aria-label={`Aumentar cantidad de ${product.nombre}`}
                          disabled={quantity === product.stock}
                          onClick={() => onUpdateQuantity(product.idProducto, quantity + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="cart-remove"
                        onClick={() => onRemove(product.idProducto)}
                        type="button"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Total</span>
                <strong>{currencyFormatter.format(total)}</strong>
              </div>
              <p>El pago se habilitara cuando el cliente pueda iniciar sesion.</p>
              <button className="primary-action" disabled type="button">
                Finalizar compra
              </button>
              <button className="cart-clear" onClick={onClear} type="button">
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default Cart;
