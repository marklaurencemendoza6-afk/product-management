import { X } from "lucide-react";

const categories = [
  "Sofa",
  "Chair",
  "Table",
  "Bed",
  "Cabinet",
  "Other"
];

export default function ProductModal({
  open,
  editing,
  form,
  setForm,
  onSubmit,
  onClose
}) {
  if (!open) return null;

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="modal-title">
              {editing ? "Edit Product" : "Add New Product"}
            </h2>
            <p>Enter the furniture product details below.</p>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="product-form">
          <label>
            Product Name *
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="e.g. Modern Sofa"
              required
            />
          </label>

          <div className="form-row">
            <label>
              Category *
              <select
                name="category"
                value={form.category}
                onChange={updateField}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Price (₱) *
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={form.price}
                onChange={updateField}
                placeholder="0.00"
                required
              />
            </label>
          </div>

          <label>
            Stock Quantity *
            <input
              type="number"
              name="stock"
              min="0"
              step="1"
              value={form.stock}
              onChange={updateField}
              placeholder="0"
              required
            />
          </label>

          <label>
            Image URL
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={updateField}
              placeholder="https://example.com/image.jpg"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="Describe the furniture..."
              rows="3"
            />
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-light"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editing ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}