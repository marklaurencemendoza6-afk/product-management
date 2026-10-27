import { useState } from "react";
import Home from "./Home.jsx";
import "./App.css";

const startingProducts = [
  {
    id: 1,
    name: "Luna Lounge Sofa",
    category: "Living Room",
    price: 18500,
    stock: 8,
    status: "Available"
  },
  {
    id: 2,
    name: "Nordic Accent Chair",
    category: "Living Room",
    price: 4800,
    stock: 12,
    status: "Available"
  },
  {
    id: 3,
    name: "Oak Dining Table",
    category: "Dining",
    price: 12500,
    stock: 5,
    status: "Available"
  },
  {
    id: 4,
    name: "Modern Bed Frame",
    category: "Bedroom",
    price: 22000,
    stock: 4,
    status: "Available"
  },
  {
    id: 5,
    name: "Minimalist Coffee Table",
    category: "Living Room",
    price: 3900,
    stock: 15,
    status: "Available"
  },
  {
    id: 6,
    name: "Classic Storage Cabinet",
    category: "Storage",
    price: 7600,
    stock: 2,
    status: "Low Stock"
  }
];

const peso = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2
  }).format(amount);

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState(startingProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "Living Room",
    price: "",
    stock: ""
  });

  const categories = [
    "All",
    "Living Room",
    "Dining",
    "Bedroom",
    "Storage"
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.stock),
    0
  );

  const inventoryValue = products.reduce(
    (sum, product) =>
      sum + Number(product.price) * Number(product.stock),
    0
  );

  function resetForm() {
    setForm({
      name: "",
      category: "Living Room",
      price: "",
      stock: ""
    });
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      form.price === "" ||
      form.stock === "" ||
      price < 0 ||
      stock < 0 ||
      !Number.isFinite(price) ||
      !Number.isFinite(stock)
    ) {
      alert("Please enter a valid name, price, and stock quantity.");
      return;
    }

    const productData = {
      name: form.name.trim(),
      category: form.category,
      price,
      stock: Math.floor(stock),
      status: stock <= 3 ? "Low Stock" : "Available"
    };

    if (editingId !== null) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingId
            ? { ...product, ...productData }
            : product
        )
      );
    } else {
      setProducts((current) => [
        ...current,
        { id: Date.now(), ...productData }
      ]);
    }

    resetForm();
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      setProducts((current) =>
        current.filter((product) => product.id !== id)
      );

      if (editingId === id) resetForm();
    }
  }

  if (!showAdmin) {
    return (
      <Home
        products={products}
        onAdminClick={() => setShowAdmin(true)}
      />
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <button
          className="admin-brand"
          onClick={() => setShowAdmin(false)}
        >
          <span className="brand-mark">ML</span>
          <span>
            <strong>ML Furniture</strong>
            <small>Management System</small>
          </span>
        </button>

        <p className="sidebar-label">WORKSPACE</p>

        <button className="sidebar-link active">
          <span>▦</span> Dashboard
        </button>

        <button
          className="sidebar-link"
          onClick={() =>
            document
              .getElementById("product-management")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span>▤</span> Products
        </button>

        <button
          className="sidebar-link"
          onClick={() =>
            document
              .getElementById("product-management")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span>▣</span> Inventory
        </button>

        <div className="sidebar-bottom">
          <p>Storefront preview</p>
          <button
            className="back-store-button"
            onClick={() => setShowAdmin(false)}
          >
            ← Back to Homepage
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">ML FURNITURE / OVERVIEW</p>
            <h1>Dashboard</h1>
          </div>

          <button
            className="outline-button"
            onClick={() => setShowAdmin(false)}
          >
            View Storefront ↗
          </button>
        </header>

        <section className="welcome-banner">
          <div>
            <p className="eyebrow">YOUR BUSINESS AT A GLANCE</p>
            <h2>Welcome to ML Furniture.</h2>
            <p>
              Manage your furniture products and keep track of your stock.
            </p>
          </div>
          <span className="welcome-symbol">ML.</span>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <span className="stat-icon">▤</span>
            <p>Total Products</p>
            <h2>{products.length}</h2>
            <small>Products in your catalog</small>
          </article>

          <article className="stat-card">
            <span className="stat-icon">▦</span>
            <p>Total Stock Units</p>
            <h2>{totalStock}</h2>
            <small>Items currently in inventory</small>
          </article>

          <article className="stat-card">
            <span className="stat-icon">₱</span>
            <p>Inventory Value</p>
            <h2>{peso(inventoryValue)}</h2>
            <small>Based on price × stock</small>
          </article>

          <article className="stat-card">
            <span className="stat-icon">!</span>
            <p>Low Stock Items</p>
            <h2>
              {products.filter((product) => product.stock <= 3).length}
            </h2>
            <small>Products with 3 units or fewer</small>
          </article>
        </section>

        <section
          className="management-panel"
          id="product-management"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">CATALOG MANAGEMENT</p>
              <h2>{editingId !== null ? "Edit Product" : "Add a Product"}</h2>
            </div>
            {editingId !== null && (
              <button className="outline-button" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>

          <form className="product-form" onSubmit={handleSubmit}>
            <label>
              Product Name
              <input
                type="text"
                placeholder="e.g. Wooden Bookshelf"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
              />
            </label>

            <label>
              Category
              <select
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
              >
                {categories
                  .filter((item) => item !== "All")
                  .map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              Price (₱)
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={(event) =>
                  setForm({ ...form, price: event.target.value })
                }
                required
              />
            </label>

            <label>
              Stock Quantity
              <input
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={form.stock}
                onChange={(event) =>
                  setForm({ ...form, stock: event.target.value })
                }
                required
              />
            </label>

            <button className="primary-button form-submit" type="submit">
              {editingId !== null ? "Save Changes" : "+ Add Product"}
            </button>
          </form>
        </section>

        <section className="management-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR INVENTORY</p>
              <h2>All Products ({products.length})</h2>
            </div>

            <input
              className="admin-search"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="table-product-name">{product.name}</td>
                    <td>{product.category}</td>
                    <td>{peso(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span
                        className={
                          product.stock <= 3
                            ? "status-pill low"
                            : "status-pill available"
                        }
                      >
                        {product.stock <= 3 ? "Low Stock" : "Available"}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="admin-footer">
          ML Furniture · Product Management System
        </footer>
      </main>
    </div>
  );
}

export default App;
