import { useMemo, useState } from "react";
import {
  Heart,
  ShoppingCart,
  User,
  Shield,
  Menu,
  X,
  Search,
  Star,
  Phone,
  Mail,
  MapPin,
  Package,
  Users,
  IndianRupee,
  ClipboardList,
  Boxes,
  Plus,
  Minus,
  LogOut,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "RushMax Runner",
    category: "Men",
    price: 1999,
    oldPrice: 2599,
    rating: 4.8,
    reviews: 126,
    badge: "Trending Drop",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    description: "Lightweight running-inspired sneaker for everyday comfort.",
    sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 2,
    name: "Urban Street Sole",
    category: "Casual",
    price: 2399,
    oldPrice: 2999,
    rating: 4.7,
    reviews: 94,
    badge: "Best Seller",
    stock: 16,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
    description: "Clean and modern casual footwear for daily style.",
    sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 3,
    name: "CoreFlex Trainer",
    category: "Sports",
    price: 2899,
    oldPrice: 3499,
    rating: 4.9,
    reviews: 210,
    badge: "Top Rated",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80",
    description: "Responsive training footwear for gym and active routines.",
    sizes: [7, 8, 9, 10, 11],
  },
  {
    id: 4,
    name: "CloudWalk Women",
    category: "Women",
    price: 2199,
    oldPrice: 2799,
    rating: 4.6,
    reviews: 81,
    badge: "New Arrival",
    stock: 14,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
    description: "Soft-cushioned women’s footwear for comfort and style.",
    sizes: [5, 6, 7, 8, 9],
  },
  {
    id: 5,
    name: "StreetEdge High",
    category: "Men",
    price: 3199,
    oldPrice: 3899,
    rating: 4.5,
    reviews: 68,
    badge: "Editor Pick",
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
    description: "Bold high-top design for premium streetwear looks.",
    sizes: [7, 8, 9, 10],
  },
  {
    id: 6,
    name: "MotionKnit Lite",
    category: "Women",
    price: 2599,
    oldPrice: 3199,
    rating: 4.7,
    reviews: 103,
    badge: "Hot Deal",
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
    description: "Flexible knit footwear with lightweight all-day support.",
    sizes: [5, 6, 7, 8],
  },
];

const sampleOrders = [
  {
    id: "FR-1001",
    customer: "Aarav Sharma",
    email: "aarav@example.com",
    product: "RushMax Runner",
    qty: 1,
    amount: 1999,
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "FR-1002",
    customer: "Priya Nair",
    email: "priya@example.com",
    product: "CloudWalk Women",
    qty: 1,
    amount: 2199,
    status: "Shipped",
    payment: "Paid",
  },
  {
    id: "FR-1003",
    customer: "Rohit Kumar",
    email: "rohit@example.com",
    product: "CoreFlex Trainer",
    qty: 1,
    amount: 2899,
    status: "Processing",
    payment: "Paid",
  },
];

function ProductCard({ product, onAddToCart, onToggleWishlist, wishlist, onOpen }) {
  const wished = wishlist.includes(product.id);

  return (
    <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img src={product.image} alt={product.name} className="h-64 w-full object-cover" />
        <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {product.badge}
        </div>
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute right-4 top-4 rounded-full p-2 shadow ${wished ? "bg-rose-500 text-white" : "bg-white text-zinc-700"}`}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">{product.name}</h3>
            <p className="text-sm text-zinc-500">{product.category}</p>
          </div>
          <div className="rounded-xl bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-700">
            Stock {product.stock}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-amber-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-semibold text-zinc-800">{product.rating}</span>
          <span className="text-zinc-500">({product.reviews})</span>
        </div>

        <p className="text-sm text-zinc-600">{product.description}</p>

        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-zinc-900">₹{product.price}</span>
          <span className="text-sm text-zinc-400 line-through">₹{product.oldPrice}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => onOpen(product)}
            className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
          >
            View
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-white hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[32px] bg-white p-6 shadow-2xl">
        {children}
        <button
          onClick={onClose}
          className="mt-6 rounded-2xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState("customer");
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(sampleOrders);
  const [adminProduct, setAdminProduct] = useState({
    name: "",
    category: "Men",
    price: "",
    oldPrice: "",
    stock: "",
    image: "",
  });

  const categories = ["All", "Men", "Women", "Sports", "Casual"];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [products, search, selectedCategory]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartQty = (id, type) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const qty = type === "inc" ? item.qty + 1 : item.qty - 1;
          return { ...item, qty };
        })
        .filter((item) => item.qty > 0)
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCustomers = new Set(orders.map((o) => o.email)).size;
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  const addAdminProduct = () => {
    if (!adminProduct.name || !adminProduct.price || !adminProduct.stock) return;
    const newProduct = {
      id: products.length + 1,
      name: adminProduct.name,
      category: adminProduct.category,
      price: Number(adminProduct.price),
      oldPrice: Number(adminProduct.oldPrice || adminProduct.price),
      rating: 4.5,
      reviews: 0,
      badge: "New",
      stock: Number(adminProduct.stock),
      image:
        adminProduct.image ||
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
      description: "New footwear product added by admin.",
      sizes: [6, 7, 8, 9],
    };
    setProducts((prev) => [newProduct, ...prev]);
    setAdminProduct({
      name: "",
      category: "Men",
      price: "",
      oldPrice: "",
      stock: "",
      image: "",
    });
  };

  const NavButton = ({ id, label }) => (
    <button
      onClick={() => {
        setPage(id);
        setMenuOpen(false);
      }}
      className={`rounded-xl px-4 py-2 font-semibold transition ${
        page === id ? "bg-green-500 text-white" : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#eef1f7] text-zinc-900">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-3xl font-black tracking-tight text-green-500">FOOTRUSH</div>

          <div className="hidden items-center gap-3 md:flex">
            {role === "customer" ? (
              <>
                <NavButton id="home" label="Home" />
                <NavButton id="shop" label="Shop" />
                <NavButton id="wishlist" label={`Wishlist (${wishlist.length})`} />
                <NavButton id="cart" label={`Cart (${cart.length})`} />
                <NavButton id="orders" label="Orders" />
                <NavButton id="contact" label="Contact" />
                <NavButton id="faq" label="FAQ" />
              </>
            ) : (
              <>
                <NavButton id="admin" label="Dashboard" />
                <NavButton id="adminOrders" label="Orders" />
                <NavButton id="adminProducts" label="Products" />
                <NavButton id="contact" label="Support" />
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRole(role === "customer" ? "admin" : "customer");
                setPage(role === "customer" ? "admin" : "home");
              }}
              className="hidden items-center gap-2 rounded-2xl bg-green-500 px-5 py-2 font-semibold text-white hover:bg-green-600 md:flex"
            >
              {role === "customer" ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
              {role === "customer" ? "Admin Login" : "Customer Login"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-zinc-200 p-2 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-zinc-200 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {role === "customer" ? (
                <>
                  <NavButton id="home" label="Home" />
                  <NavButton id="shop" label="Shop" />
                  <NavButton id="wishlist" label={`Wishlist (${wishlist.length})`} />
                  <NavButton id="cart" label={`Cart (${cart.length})`} />
                  <NavButton id="orders" label="Orders" />
                  <NavButton id="contact" label="Contact" />
                  <NavButton id="faq" label="FAQ" />
                </>
              ) : (
                <>
                  <NavButton id="admin" label="Dashboard" />
                  <NavButton id="adminOrders" label="Orders" />
                  <NavButton id="adminProducts" label="Products" />
                  <NavButton id="contact" label="Support" />
                </>
              )}
              <button
                onClick={() => {
                  setRole(role === "customer" ? "admin" : "customer");
                  setPage(role === "customer" ? "admin" : "home");
                  setMenuOpen(false);
                }}
                className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-white"
              >
                {role === "customer" ? "Admin Login" : "Customer Login"}
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        {role === "customer" && page === "home" && (
          <>
            <section className="hero-premium relative overflow-hidden rounded-[36px] px-8 py-20 text-white lg:px-14">
              <div className="hero-overlay absolute inset-0"></div>
              <div className="hero-circle hero-circle-1"></div>
              <div className="hero-circle hero-circle-2"></div>
              <div className="hero-circle hero-circle-3"></div>

              <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <div className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-green-200 backdrop-blur">
                    Premium Footwear • Clean Modern Shopping
                  </div>

                  <h1 className="mt-6 text-5xl font-black leading-tight lg:text-7xl">
                    Step into
                    <span className="block text-green-300">ultimate style</span>
                    with FOOTRUSH
                  </h1>

                  <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-200">
                    Discover stylish sneakers, casual footwear, and premium shoe collections with a clean shopping experience designed to feel modern, smooth, and premium.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={() => setPage("shop")}
                      className="rounded-2xl bg-green-500 px-6 py-4 font-semibold text-white shadow-lg shadow-green-500/30 transition hover:scale-105 hover:bg-green-400"
                    >
                      Shop Now
                    </button>

                    <button
                      onClick={() => setPage("wishlist")}
                      className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                    >
                      Explore More
                    </button>
                  </div>

                  <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                    <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <div className="text-2xl font-black">500+</div>
                      <div className="text-sm text-zinc-200">Happy Buyers</div>
                    </div>
                    <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <div className="text-2xl font-black">80+</div>
                      <div className="text-sm text-zinc-200">Shoe Styles</div>
                    </div>
                    <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <div className="text-2xl font-black">4.9★</div>
                      <div className="text-sm text-zinc-200">Top Rated</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 rounded-[36px] bg-green-500/20 blur-3xl"></div>
                  <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
                      alt="Footwear Showcase"
                      className="hero-image h-[480px] w-full rounded-[24px] object-cover"
                    />

                    <div className="absolute bottom-8 left-8 rounded-3xl border border-white/20 bg-black/35 p-5 backdrop-blur">
                      <div className="text-sm text-zinc-200">Trending Drop</div>
                      <div className="mt-1 text-2xl font-black">RushMax Collection</div>
                      <div className="mt-1 text-green-300">Starting at ₹1,999</div>
                    </div>

                    <div className="absolute right-8 top-8 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
                      New Arrival
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="rounded-[28px] border border-zinc-200 bg-gradient-to-br from-white to-emerald-50 p-6 shadow-sm">
                <h3 className="text-lg font-bold">Fast Delivery</h3>
                <p className="mt-2 text-sm text-zinc-600">Reliable and quick order delivery for footwear.</p>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-gradient-to-br from-white to-cyan-50 p-6 shadow-sm">
                <h3 className="text-lg font-bold">Easy Returns</h3>
                <p className="mt-2 text-sm text-zinc-600">Hassle-free return support for size issues.</p>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-gradient-to-br from-white to-lime-50 p-6 shadow-sm">
                <h3 className="text-lg font-bold">Premium Collections</h3>
                <p className="mt-2 text-sm text-zinc-600">Only footwear-focused premium product experience.</p>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-gradient-to-br from-white to-teal-50 p-6 shadow-sm">
                <h3 className="text-lg font-bold">Customer Support</h3>
                <p className="mt-2 text-sm text-zinc-600">Dedicated customer care and FAQ support.</p>
              </div>
            </section>
          </>
        )}

        {role === "customer" && page === "shop" && (
          <section className="space-y-6 rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-black">Shop Footwear</h2>
                <p className="mt-2 text-zinc-600">Browse premium footwear collections for men and women.</p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search shoes"
                    className="rounded-2xl border border-zinc-200 py-3 pl-11 pr-4 outline-none focus:border-green-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500"
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                  onOpen={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        )}

        {role === "customer" && page === "wishlist" && (
          <section className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-rose-50 p-8 shadow-sm">
            <h2 className="text-3xl font-black">Your Wishlist</h2>
            <p className="mt-2 text-zinc-600">Saved footwear products appear here.</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.filter((product) => wishlist.includes(product.id)).length === 0 ? (
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600">No wishlist items yet.</div>
              ) : (
                products
                  .filter((product) => wishlist.includes(product.id))
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      onToggleWishlist={toggleWishlist}
                      wishlist={wishlist}
                      onOpen={setSelectedProduct}
                    />
                  ))
              )}
            </div>
          </section>
        )}

        {role === "customer" && page === "cart" && (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-emerald-50 p-8 shadow-sm">
              <h2 className="text-3xl font-black">Your Cart</h2>
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="rounded-2xl bg-white p-6 text-zinc-600">Your cart is empty.</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex flex-col gap-4 rounded-[24px] border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center">
                      <img src={item.image} alt={item.name} className="h-24 w-full rounded-2xl object-cover sm:w-24" />
                      <div className="flex-1">
                        <div className="text-lg font-bold">{item.name}</div>
                        <div className="text-sm text-zinc-500">₹{item.price}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateCartQty(item.id, "dec")} className="rounded-full border border-zinc-200 p-2"><Minus className="h-4 w-4" /></button>
                        <span className="font-semibold">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.id, "inc")} className="rounded-full border border-zinc-200 p-2"><Plus className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <aside className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-cyan-50 p-8 shadow-sm">
              <h3 className="text-2xl font-black">Order Summary</h3>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-zinc-600">Items</span><span>{cart.length}</span></div>
                <div className="flex justify-between"><span className="text-zinc-600">Total</span><span>₹{cartTotal}</span></div>
              </div>
              <button className="mt-6 w-full rounded-2xl bg-green-500 px-5 py-4 font-semibold text-white hover:bg-green-600">
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}

        {role === "customer" && page === "orders" && (
          <section className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-sky-50 p-8 shadow-sm">
            <h2 className="text-3xl font-black">My Orders</h2>
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-[24px] border border-zinc-200 bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="font-bold">{order.id}</div>
                      <div className="text-sm text-zinc-500">{order.product}</div>
                    </div>
                    <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === "contact" && (
          <section className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-emerald-50 p-8 shadow-sm">
            <h2 className="text-3xl font-black">Contact</h2>
            <div className="mt-6 space-y-4 text-zinc-700">
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-green-700" /> +91 98765 43210</div>
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-green-700" /> care@footrush.com</div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-green-700" /> Hyderabad, India</div>
            </div>
          </section>
        )}

        {page === "faq" && (
          <section className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-lime-50 p-8 shadow-sm">
            <h2 className="text-3xl font-black">FAQ</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                <div className="font-bold">How long does delivery take?</div>
                <p className="mt-2 text-zinc-600">Usually 3–7 business days.</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                <div className="font-bold">Can I return if size does not fit?</div>
                <p className="mt-2 text-zinc-600">Yes, within 7 days if unused.</p>
              </div>
            </div>
          </section>
        )}

        {role === "admin" && page === "admin" && (
          <div className="space-y-8">
            <section className="rounded-[32px] bg-gradient-to-r from-zinc-950 via-slate-900 to-emerald-950 p-8 text-white shadow-sm">
              <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-green-300">FOOTRUSH Admin Panel</div>
              <h1 className="mt-4 text-4xl font-black">Store Dashboard</h1>
              <p className="mt-3 max-w-2xl text-zinc-300">Monitor clients, orders, inventory, and revenue.</p>
            </section>

            <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
              <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                <Users className="mb-3 h-6 w-6 text-green-700" />
                <div className="text-3xl font-black">{totalCustomers}</div>
                <div className="text-sm text-zinc-600">Customers</div>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                <ClipboardList className="mb-3 h-6 w-6 text-green-700" />
                <div className="text-3xl font-black">{orders.length}</div>
                <div className="text-sm text-zinc-600">Orders</div>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                <IndianRupee className="mb-3 h-6 w-6 text-green-700" />
                <div className="text-3xl font-black">₹{totalRevenue}</div>
                <div className="text-sm text-zinc-600">Revenue</div>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                <Boxes className="mb-3 h-6 w-6 text-green-700" />
                <div className="text-3xl font-black">{products.length}</div>
                <div className="text-sm text-zinc-600">Products</div>
              </div>
            </section>
          </div>
        )}

        {role === "admin" && page === "adminOrders" && (
          <section className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-sky-50 p-8 shadow-sm">
            <h2 className="text-3xl font-black">All Orders</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500">
                    <th className="pb-3">Order</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-zinc-100">
                      <td className="py-4 font-semibold">{order.id}</td>
                      <td className="py-4">{order.customer}</td>
                      <td className="py-4">{order.product}</td>
                      <td className="py-4">₹{order.amount}</td>
                      <td className="py-4">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {role === "admin" && page === "adminProducts" && (
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-emerald-50 p-8 shadow-sm">
              <h2 className="text-3xl font-black">Add Product</h2>
              <div className="mt-6 space-y-4">
                <input value={adminProduct.name} onChange={(e) => setAdminProduct({ ...adminProduct, name: e.target.value })} placeholder="Product name" className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500" />
                <select value={adminProduct.category} onChange={(e) => setAdminProduct({ ...adminProduct, category: e.target.value })} className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500">
                  {categories.filter((c) => c !== "All").map((category) => <option key={category}>{category}</option>)}
                </select>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input value={adminProduct.price} onChange={(e) => setAdminProduct({ ...adminProduct, price: e.target.value })} placeholder="Price" className="rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500" />
                  <input value={adminProduct.oldPrice} onChange={(e) => setAdminProduct({ ...adminProduct, oldPrice: e.target.value })} placeholder="Old Price" className="rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500" />
                </div>
                <input value={adminProduct.stock} onChange={(e) => setAdminProduct({ ...adminProduct, stock: e.target.value })} placeholder="Stock" className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500" />
                <input value={adminProduct.image} onChange={(e) => setAdminProduct({ ...adminProduct, image: e.target.value })} placeholder="Image URL" className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500" />
                <button onClick={addAdminProduct} className="w-full rounded-2xl bg-green-500 px-6 py-4 font-semibold text-white hover:bg-green-600">
                  Add Product
                </button>
              </div>
            </section>

            <section className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-cyan-50 p-8 shadow-sm">
              <h2 className="text-3xl font-black">Manage Products</h2>
              <div className="mt-6 space-y-4 max-h-[640px] overflow-auto pr-1">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 rounded-[24px] border border-zinc-200 bg-white p-4">
                    <img src={product.image} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm text-zinc-500">{product.category} • ₹{product.price}</div>
                    </div>
                    <div className="rounded-xl bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-700">
                      Stock {product.stock}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <Modal open={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <div className="grid gap-8 lg:grid-cols-2">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="h-[420px] w-full rounded-[28px] object-cover" />
            <div>
              <div className="inline-flex rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                {selectedProduct.badge}
              </div>
              <h2 className="mt-4 text-4xl font-black tracking-tight">{selectedProduct.name}</h2>
              <p className="mt-3 text-zinc-600">{selectedProduct.description}</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="text-3xl font-black">₹{selectedProduct.price}</span>
                <span className="text-zinc-400 line-through">₹{selectedProduct.oldPrice}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold text-zinc-800">{selectedProduct.rating}</span>
                <span className="text-zinc-500">({selectedProduct.reviews} reviews)</span>
              </div>
              <div className="mt-6">
                <div className="text-sm font-bold text-zinc-900">Sizes</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <span key={size} className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => addToCart(selectedProduct)} className="rounded-2xl bg-green-500 px-6 py-4 font-semibold text-white hover:bg-green-600">
                  Add to Cart
                </button>
                <button onClick={() => toggleWishlist(selectedProduct.id)} className="rounded-2xl border border-zinc-200 px-6 py-4 font-semibold text-zinc-800 hover:bg-zinc-50">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
