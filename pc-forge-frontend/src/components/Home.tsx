import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  type ProductoPayload,
} from "../services/ProductoService";
import type { Producto } from "../models/responses/Producto";
import type { Usuario } from "../models/responses/Usuario";
import type { ViewMode } from "../App";
import UserManagement from "./UserManagement";
import UserOrders from "./UserOrders";

const currencyFormatter = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  maximumFractionDigits: 0,
});

const emptyProduct: ProductoPayload = {
  nombre: "",
  descripcion: "",
  categoria: "",
  precio: 0,
  stock: 0,
  imagen: "",
};

interface HomeProps {
  onAddToCart: (product: Producto) => void;
  viewMode: ViewMode;
  currentUser?: Usuario | null;
  orderRefreshTrigger?: number;
}

function Home({ onAddToCart, viewMode, currentUser, orderRefreshTrigger }: HomeProps) {
  const [products, setProducts] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [formProduct, setFormProduct] = useState<ProductoPayload>(emptyProduct);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"info" | "success" | "error">("info");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);
  const isAdmin = viewMode === "admin";

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(products.map((product) => product.categoria)))],
    [products],
  );

  const visibleProducts = useMemo(() => {
    if (selectedCategory === "Todos") {
      return products;
    }

    return products.filter((product) => product.categoria === selectedCategory);
  }, [products, selectedCategory]);

  const resetForm = () => {
    setFormProduct(emptyProduct);
    setEditingId(null);
  };

  const showStatus = (message: string, type: "info" | "success" | "error" = "info") => {
    setStatusMessage(message);
    setStatusType(type);
  };

  const highlightProduct = (idProducto: number) => {
    setHighlightedId(idProducto);
    window.setTimeout(() => setHighlightedId(null), 1400);
  };

  const pulseForm = () => {
    setIsFormHighlighted(true);
    window.setTimeout(() => setIsFormHighlighted(false), 900);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    showStatus(editingId ? "Guardando cambios..." : "Agregando producto...", "info");

    try {
      if (editingId) {
        const updatedProduct = await updateProduct(editingId, formProduct);
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.idProducto === editingId ? updatedProduct : product,
          ),
        );
        highlightProduct(editingId);
        showStatus("Producto actualizado correctamente.", "success");
      } else {
        const createdProduct = await createProduct(formProduct);
        setProducts((currentProducts) => [createdProduct, ...currentProducts]);
        highlightProduct(createdProduct.idProducto);
        showStatus("Producto agregado correctamente.", "success");
      }

      resetForm();
    } catch (error) {
      console.error(error);
      showStatus("No se pudo guardar. Revisa que la API este activa.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (product: Producto) => {
    setEditingId(product.idProducto);
    setFormProduct({
      nombre: product.nombre,
      descripcion: product.descripcion,
      categoria: product.categoria,
      precio: product.precio,
      stock: product.stock,
      imagen: product.imagen,
    });
    showStatus(`Editando ${product.nombre}.`, "info");
    highlightProduct(product.idProducto);
    pulseForm();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (product: Producto) => {
    const shouldDelete = window.confirm(`Eliminar ${product.nombre}?`);

    if (!shouldDelete) {
      return;
    }

    setDeletingId(product.idProducto);
    showStatus(`Eliminando ${product.nombre}...`, "info");

    try {
      await deleteProduct(product.idProducto);
      setProducts((currentProducts) =>
        currentProducts.filter((item) => item.idProducto !== product.idProducto),
      );
      showStatus("Producto eliminado correctamente.", "success");
    } catch (error) {
      console.error(error);
      showStatus("No se pudo eliminar. Revisa que la API este activa.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="storefront">
      <section className="hero-section" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">{isAdmin ? "Panel de administracion" : "Componentes para armar sin miedo"}</p>
          <h2 id="home-title">{isAdmin ? "Admin PC-FORGE" : "PC-FORGE"}</h2>
          <p>
            {isAdmin
              ? "Agrega, actualiza y elimina productos del catalogo desde una vista sencilla."
              : "Compra procesadores, graficas, memoria y almacenamiento para llevar tu setup al siguiente nivel."}
          </p>
          <a className="primary-action" href="#productos">
            {isAdmin ? "Gestionar productos" : "Ver catalogo"}
          </a>
        </div>

        <div className="hero-panel" aria-label="Resumen de inventario">
          <span>{products.length}</span>
          <p>productos disponibles</p>
        </div>
      </section>

      {!isAdmin && currentUser?.rol === "CLIENTE" && (
        <UserOrders selectedUser={currentUser} refreshTrigger={orderRefreshTrigger} />
      )}

      {isAdmin && (
        <section className="admin-section" aria-labelledby="admin-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Admin</p>
              <h2 id="admin-title">{editingId ? "Actualizar producto" : "Agregar producto"}</h2>
            </div>
            {editingId && (
              <button className="secondary-action" onClick={resetForm} type="button">
                Cancelar edicion
              </button>
            )}
          </div>

          <form
            className={`product-form${isFormHighlighted ? " form-highlight" : ""}`}
            onSubmit={handleSubmit}
          >
            <label>
              Nombre
              <input
                onChange={(event) => setFormProduct({ ...formProduct, nombre: event.target.value })}
                required
                type="text"
                value={formProduct.nombre}
              />
            </label>
            <label>
              Categoria
              <input
                onChange={(event) => setFormProduct({ ...formProduct, categoria: event.target.value })}
                required
                type="text"
                value={formProduct.categoria}
              />
            </label>
            <label>
              Precio
              <input
                min="1"
                onChange={(event) => setFormProduct({ ...formProduct, precio: Number(event.target.value) })}
                required
                type="number"
                value={formProduct.precio}
              />
            </label>
            <label>
              Stock
              <input
                min="0"
                onChange={(event) => setFormProduct({ ...formProduct, stock: Number(event.target.value) })}
                required
                type="number"
                value={formProduct.stock}
              />
            </label>
            <label className="span-2">
              Imagen URL
              <input
                onChange={(event) => setFormProduct({ ...formProduct, imagen: event.target.value })}
                type="url"
                value={formProduct.imagen}
              />
            </label>
            <label className="span-2">
              Descripcion
              <textarea
                onChange={(event) => setFormProduct({ ...formProduct, descripcion: event.target.value })}
                rows={3}
                value={formProduct.descripcion}
              />
            </label>
            <button className="primary-action" disabled={isSaving} type="submit">
              {isSaving ? "Guardando..." : editingId ? "Guardar cambios" : "Agregar producto"}
            </button>
          </form>

          {statusMessage && <p className={`status-message ${statusType}`}>{statusMessage}</p>}
        </section>
      )}

      {isAdmin && <UserManagement />}

      <section className="catalog-section" id="productos" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Catalogo</p>
            <h2 id="catalog-title">{isAdmin ? "Inventario" : "Productos destacados"}</h2>
          </div>
          <div className="category-filter" aria-label="Filtrar por categoria">
            {categories.map((category) => (
              <button
                className={category === selectedCategory ? "active" : ""}
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="status-message">Cargando productos...</p>
        ) : (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article
                className={[
                  "product-card",
                  highlightedId === product.idProducto ? "product-card-highlight" : "",
                  deletingId === product.idProducto ? "product-card-removing" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={product.idProducto}
              >
                <img src={product.imagen} alt={product.nombre} />
                <div className="product-info">
                  <span>{product.categoria}</span>
                  <h3>{product.nombre}</h3>
                  <p>{product.descripcion}</p>
                  <div className="product-meta">
                    <strong>{currencyFormatter.format(product.precio)}</strong>
                    <small>{product.stock} en stock</small>
                  </div>
                  {isAdmin ? (
                    <div className="admin-actions">
                      <button onClick={() => handleEdit(product)} type="button">
                        Editar
                      </button>
                      <button
                        className="danger-action"
                        disabled={deletingId === product.idProducto}
                        onClick={() => handleDelete(product)}
                        type="button"
                      >
                        {deletingId === product.idProducto ? "Eliminando..." : "Eliminar"}
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={product.stock === 0}
                      onClick={() => onAddToCart(product)}
                      type="button"
                    >
                      {product.stock === 0 ? "Agotado" : "Agregar"}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
