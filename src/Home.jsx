import { useMemo, useState } from "react";
import {
  ArrowRight,
  ShoppingBag,
  Menu,
  X,
  Search,
  Armchair
} from "lucide-react";
import "./Home.css";

const initialProducts = [
  {
    id: 1,
    name: "Luna Lounge Sofa",
    category: "Living Room",
    price: 18500,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85",
    description: "Comfort meets contemporary living."
  },
  {
    id: 2,
    name: "Nordic Accent Chair",
    category: "Living Room",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85",
    description: "A cozy corner, beautifully designed."
  },
  {
    id: 3,
    name: "Oak Dining Table",
    category: "Dining",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85",
    description: "Gather around something timeless."
  },
  {
    id: 4,
    name: "Modern Bed Frame",
    category: "Bedroom",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85",
    description: "Make your bedroom your sanctuary."
  },
  {
    id: 5,
    name: "Minimalist Coffee Table",
    category: "Living Room",
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85",
    description: "Small details. Big difference."
  },
  {
    id: 6,
    name: "Classic Storage Cabinet",
    category: "Storage",
    price: 7600,
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=85",
    description: "Keep your space neat and lovely."
  }
];

const peso = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2
  }).format(amount);

function Home({ products, onAdminClick }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [notice, setNotice] = useState("");

  const catalog = useMemo(() => {
    if (!products) return initialProducts;

    return initialProducts.map((item) => {
      const managedProduct = products.find(
        (product) => product.id === item.id
      );

      return managedProduct
        ? {
            ...item,
            name: managedProduct.name,
            category: managedProduct.category,
            price: managedProduct.price
          }
        : item;
    });
  }, [products]);

  const categories = [
    "All",
    "Living Room",
    "Dining",
    "Bedroom",
    "Storage"
  ];

  const filteredProducts = catalog.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);

      if (found) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to your bag.`);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function updateQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function closeMobileMenu() {
    setMobileMenu(false);
  }

  return (
    <div className="storefront">
      <div className="announcement">
        Thoughtfully designed furniture for the way you live.
      </div>

      <header className="store-header">
        <a href="#home" className="store-logo" onClick={closeMobileMenu}>
          <span className="logo-symbol">ML</span>
          <span>
            <strong>ML FURNITURE</strong>
            <small>HOME & LIVING</small>
          </span>
        </a>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>

        <nav className={mobileMenu ? "store-nav open" : "store-nav"}>
          <a href="#home" onClick={closeMobileMenu}>Home</a>
          <a href="#shop" onClick={closeMobileMenu}>Shop</a>
          <a href="#about" onClick={closeMobileMenu}>Our Story</a>
          <a href="#contact" onClick={closeMobileMenu}>Contact</a>
        </nav>

        <div className="header-actions">
          <button
            className="bag-button"
            onClick={() => setShowCart(true)}
            aria-label="Open shopping bag"
          >
            <ShoppingBag size={20} />
            <span>Bag ({cartCount})</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="hero-kicker">MAKE YOURSELF AT HOME</span>
            <h1>
              A little more
              <br />
              <em>beautiful</em> every day.
            </h1>
            <p>
              Furniture made for real life. Discover timeless pieces
              that bring comfort, character, and warmth to your home.
            </p>

            <a href="#shop" className="hero-button">
              Explore the collection <ArrowRight size={18} />
            </a>

            <div className="hero-note">
              <span className="hero-note-line" />
              Designed with care. Chosen for you.
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90"
              alt="Warm modern living room with elegant furniture"
            />
            <div className="hero-image-label">
              <span>THE ART OF SLOW LIVING</span>
              <strong>Find your kind of comfort.</strong>
            </div>
          </div>

          <span className="hero-decoration">ML.</span>
        </section>

        <section className="benefits">
          <div>
            <span>01</span>
            <p><strong>Thoughtful design</strong><small>Made for modern living</small></p>
          </div>
          <div>
            <span>02</span>
            <p><strong>Everyday comfort</strong><small>Style that feels like home</small></p>
          </div>
          <div>
            <span>03</span>
            <p><strong>Timeless pieces</strong><small>Love them for longer</small></p>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="shop-heading">
            <div>
              <span className="section-kicker">THE ML COLLECTION</span>
              <h2>Pieces to love.</h2>
              <p>Find the perfect pieces for your favorite spaces.</p>
            </div>

            <label className="store-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Find your favorite..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          <div className="category-filters">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category-chip selected" : "category-chip"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <article className="store-product" key={product.id}>
                <div className="product-image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading={index > 2 ? "lazy" : "eager"}
                  />
                  <span className="product-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <button
                    className="quick-add"
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to bag`}
                  >
                    <ShoppingBag size={17} /> Add to bag
                  </button>
                </div>

                <div className="product-details">
                  <div>
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <strong>{peso(product.price)}</strong>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <Armchair size={34} />
              <h3>No pieces found</h3>
              <p>Try another search or choose a different category.</p>
              <button
                className="text-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Show all products
              </button>
            </div>
          )}
        </section>

        <section className="story-section" id="about">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85"
              alt="Calm interior with carefully selected furniture"
              loading="lazy"
            />
          </div>

          <div className="story-copy">
            <span className="section-kicker">A HOME THAT FEELS LIKE YOU</span>
            <h2>Good spaces make room for good living.</h2>
            <p>
              At ML Furniture, we believe that home is more than a place.
              It is where everyday moments become meaningful. Our collection
              brings together practical pieces and thoughtful style to help
              you create a space that feels truly yours.
            </p>
            <a href="#shop" className="story-link">
              Find your favorite pieces <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <span className="section-kicker">LET'S MAKE IT HOME</span>
          <h2>Have a space in mind?</h2>
          <p>
            We would love to help you find furniture that fits your home.
          </p>
          <a className="contact-button" href="mailto:hello@mlfurniture.example">
            Get in touch <ArrowRight size={17} />
          </a>
        </section>
      </main>

      <footer className="store-footer">
        <a href="#home" className="store-logo footer-logo">
          <span className="logo-symbol">ML</span>
          <span>
            <strong>ML FURNITURE</strong>
            <small>HOME & LIVING</small>
          </span>
        </a>

        <p>Make room for what matters.</p>

        <button className="admin-entry" onClick={onAdminClick}>
          Admin Dashboard ↗
        </button>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ML Furniture</span>
          <span>Thoughtfully chosen for your home.</span>
        </div>
      </footer>

      {notice && <div className="store-notice">{notice}</div>}

      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <aside
            className="cart-panel"
            onClick={(event) => event.stopPropagation()}
            aria-label="Shopping bag"
          >
            <div className="cart-heading">
              <div>
                <span className="section-kicker">YOUR SELECTION</span>
                <h2>Your bag ({cartCount})</h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setShowCart(false)}
                aria-label="Close bag"
              >
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={38} />
                <h3>Your bag is waiting.</h3>
                <p>Explore our collection and find something you love.</p>
                <button
                  className="hero-button"
                  onClick={() => {
                    setShowCart(false);
                    document.getElementById("shop")?.scrollIntoView({
                      behavior: "smooth"
                    });
                  }}
                >
                  Explore the collection
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{peso(item.price)}</p>
                        <div className="quantity-controls">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Remove one ${item.name}`}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Add one ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <strong>{peso(item.price * item.quantity)}</strong>
                    </article>
                  ))}
                </div>

                <div className="cart-total">
                  <span>Subtotal</span>
                  <strong>{peso(cartTotal)}</strong>
                </div>

                <p className="cart-disclaimer">
                  Demo shopping bag only. Online payment and checkout are
                  not connected.
                </p>

                <button
                  className="checkout-demo"
                  onClick={() =>
                    alert(
                      "Thanks for visiting ML Furniture! This is a demo store; checkout is not connected yet."
                    )
                  }
                >
                  Continue to checkout
                </button>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default Home;
