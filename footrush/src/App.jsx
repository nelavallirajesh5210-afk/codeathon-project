import { useEffect, useMemo, useState } from "react";
import {
  Heart,
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
  Lock,
  Truck,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

const logoSrc = "/PROJECTLOGO.jpeg";

const statsData = [
  { value: 500, suffix: "+", label: "Happy Buyers" },
  { value: 80, suffix: "+", label: "Shoe Styles" },
  { value: 49, suffix: "★", label: "Top Rated" },
];

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

function BrandLogo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`overflow-hidden rounded-2xl border border-emerald-400/30 bg-white/10 shadow-[0_0_30px_rgba(16,185,129,0.18)] ${
          compact ? "h-12 w-12" : "h-14 w-14"
        }`}
      >
        <img
          src={logoSrc}
          alt="FOOTRUSH logo"
          className="h-full w-full object-cover"
          style={{ filter: "hue-rotate(-10deg) saturate(1.15) contrast(1.05)" }}
        />
      </div>
      <div>
        <div
          className={`font-black tracking-tight text-emerald-400 ${
            compact ? "text-2xl" : "text-3xl"
          }`}
        >
          FOOTRUSH
        </div>
        <div className="text-xs font-medium uppercase tracking-[0.35em] text-emerald-100/70">
          Footwear Store
        </div>
      </div>
    </div>
  );
}

function CountUp({ value, suffix = "", duration = 1200 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(value * eased));
      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function SpotlightCard({ title, text, image, price }) {
  return (
    <div className="spotlight-card card-premium glass-panel rounded-[28px] p-4">
      <img src={image} alt={title} className="h-56 w-full rounded-[22px] object-cover" />
      <div className="pt-4">
        <div className="text-lg font-bold text-white">{title}</div>
        <div className="mt-2 text-sm text-white/60">{text}</div>
        <div className="mt-3 text-xl font-black text-emerald-300">{price}</div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart, onToggleWishlist, wishlist, onOpen }) {
  const wished = wishlist.includes(product.id);

  return (
    <div className="card-premium overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <div className="relative">
        <img src={product.image} alt={product.name} className="h-64 w-full object-cover" />
        <div className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {product.badge}
        </div>
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`micro-btn absolute right-4 top-4 rounded-full p-2 shadow ${
            wished ? "bg-rose-500 text-white" : "bg-white text-zinc-700"
          }`}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="space-y-3 p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-white/60">{product.category}</p>
          </div>
          <div className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-emerald-200">
            Stock {product.stock}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-amber-400">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-semibold text-white">{product.rating}</span>
          <span className="text-white/50">({product.reviews})</span>
        </div>

        <p className="text-sm text-white/70">{product.description}</p>

        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-white">₹{product.price}</span>
          <span className="text-sm text-white/40 line-through">₹{product.oldPrice}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => onOpen(product)}
            className="micro-btn rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            View
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="micro-btn rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[32px] border border-white/10 bg-[#0c1327] p-6 text-white shadow-2xl">
        {children}
        <button
          onClick={onClose}
          className="micro-btn mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function LoginPage({ onCustomerLogin, onAdminLogin }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050813] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_30%),linear-gradient(135deg,#030712_0%,#071123_45%,#0b1730_100%)]" />
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl animate-pulse [animation-delay:400ms]" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl animate-pulse [animation-delay:800ms]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:px-8">
        <div>
          <BrandLogo />
          <div className="mt-8 inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur">
            Premium Footwear • Customer & Admin Access
          </div>
          <h1 className="mt-6 text-5xl font-black leading-tight lg:text-7xl">
            Enter the world of
            <span className="block bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
              FOOTRUSH
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            A premium footwear shopping experience with customer login, wishlist, cart,
            orders, admin dashboard, product management, and a fully loaded modern
            interface.
          </p>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {statsData.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="text-2xl font-black">
                  <CountUp value={item.value} suffix={item.suffix} />
                </div>
                <div className="text-sm text-white/60">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[38px] bg-gradient-to-r from-emerald-500/20 via-cyan-400/10 to-transparent blur-2xl" />
          <div className="relative rounded-[36px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="grid gap-5">
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 transition hover:border-emerald-400/30 hover:bg-black/25">
                <div className="mb-3 flex items-center gap-3 text-white">
                  <User className="h-5 w-5 text-emerald-300" />
                  <div className="font-bold">Customer Login</div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
                    customer@footrush.com
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
                    ••••••••
                  </div>
                  <button
                    onClick={onCustomerLogin}
                    className="micro-btn flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 font-semibold text-white hover:bg-emerald-400"
                  >
                    <Lock className="h-4 w-4" /> Continue as Customer
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 transition hover:border-cyan-400/30 hover:bg-black/25">
                <div className="mb-3 flex items-center gap-3 text-white">
                  <Shield className="h-5 w-5 text-cyan-300" />
                  <div className="font-bold">Admin Login</div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
                    admin@footrush.com
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
                    ••••••••
                  </div>
                  <button
                    onClick={onAdminLogin}
                    className="micro-btn flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-4 font-semibold text-white hover:bg-cyan-400"
                  >
                    <Shield className="h-4 w-4" /> Continue as Admin
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm text-white/65">
                <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                  <Sparkles className="h-4 w-4 text-emerald-300" /> FOOTRUSH Experience
                </div>
                Customer flow includes product browsing, wishlist, cart, orders, support,
                and admin access includes dashboard, products, orders, and client overview.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("login");
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
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorGlow, setCursorGlow] = useState(false);

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

  const loginAsCustomer = () => {
    setView("site");
    setRole("customer");
    setPage("home");
  };

  const loginAsAdmin = () => {
    setView("site");
    setRole("admin");
    setPage("admin");
  };

  const logout = () => {
    setView("login");
    setMenuOpen(false);
  };

  const trackCursor = (e) => {
    setCursor({ x: e.clientX, y: e.clientY });
    if (!cursorGlow) setCursorGlow(true);
  };

  const NavButton = ({ id, label }) => (
    <button
      onClick={() => {
        setPage(id);
        setMenuOpen(false);
      }}
      className={`micro-btn rounded-xl px-4 py-2 font-semibold transition ${
        page === id
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
          : "bg-white/5 text-white hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );

  if (view === "login") {
    return <LoginPage onCustomerLogin={loginAsCustomer} onAdminLogin={loginAsAdmin} />;
  }

  return (
    <div className="min-h-screen bg-[#050813] text-white" onMouseMove={trackCursor}>
      {cursorGlow && (
        <div
          className="cursor-glow"
          style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
        />
      )}

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_30%),linear-gradient(180deg,#040712_0%,#071122_45%,#0b1730_100%)]" />
      <div className="fixed -left-20 top-20 -z-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="fixed right-0 top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="fixed bottom-0 left-1/3 -z-10 h-64 w-64 rounded-full bg-blue-500/8 blur-3xl" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08101f]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <BrandLogo compact />

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
                if (role === "customer") {
                  setRole("admin");
                  setPage("admin");
                } else {
                  setRole("customer");
                  setPage("home");
                }
              }}
              className="micro-btn hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2 font-semibold text-white hover:opacity-90 md:flex"
            >
              {role === "customer" ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
              {role === "customer" ? "Admin" : "Customer"}
            </button>
            <button
              onClick={logout}
              className="micro-btn hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-semibold text-white hover:bg-white/10 md:flex"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="micro-btn rounded-xl border border-white/10 bg-white/5 p-2 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#08101f] px-6 py-4 md:hidden">
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
                onClick={logout}
                className="micro-btn rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-semibold text-white"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        {role === "customer" && page === "home" && (
          <>
            <section className="sale-banner mb-6 rounded-[24px] px-6 py-4 text-white backdrop-blur-xl">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-200">
                    Limited Time Sale
                  </div>
                  <div className="mt-1 text-2xl font-black">
                    Midnight Sneaker Drop • Up to 35% Off
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {["12", "08", "33", "21"].map((v, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center"
                    >
                      <div className="text-xl font-black text-emerald-300">{v}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55">
                        {["hrs", "min", "sec", "left"][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="hero-premium relative overflow-hidden rounded-[36px] border border-white/10 px-8 py-20 text-white lg:px-14 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="hero-overlay absolute inset-0"></div>
              <div className="hero-grid"></div>
              <div className="hero-circle hero-circle-1"></div>
              <div className="hero-circle hero-circle-2"></div>
              <div className="hero-circle hero-circle-3"></div>

              <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
                <div className="hero-parallax">
                  <div className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-200 backdrop-blur">
                    Premium Footwear • Clean Modern Shopping
                  </div>

                  <h1 className="mt-6 text-5xl font-black leading-tight lg:text-7xl">
                    Step into
                    <span className="block text-emerald-300">ultimate style</span>
                    with FOOTRUSH
                  </h1>

                  <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                    Discover stylish sneakers, casual footwear, and premium shoe collections
                    with a clean shopping experience designed to feel modern, smooth, and
                    premium.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={() => setPage("shop")}
                      className="micro-btn rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
                    >
                      Shop Now
                    </button>

                    <button
                      onClick={() => setPage("wishlist")}
                      className="micro-btn rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur hover:bg-white/20"
                    >
                      Explore More
                    </button>
                  </div>

                  <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                    {statsData.map((item) => (
                      <div key={item.label} className="glass-panel rounded-3xl p-4">
                        <div className="text-2xl font-black">
                          <CountUp value={item.value} suffix={item.suffix} />
                        </div>
                        <div className="text-sm text-white/70">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hero-parallax-slow relative">
                  <div className="absolute -inset-4 rounded-[36px] bg-emerald-500/20 blur-3xl"></div>
                  <div className="glass-panel relative overflow-hidden rounded-[30px] p-4">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
                      alt="Footwear Showcase"
                      className="hero-image h-[480px] w-full rounded-[24px] object-cover"
                    />

                    <div className="absolute bottom-8 left-8 rounded-3xl border border-white/20 bg-black/35 p-5 backdrop-blur">
                      <div className="text-sm text-white/80">Trending Drop</div>
                      <div className="mt-1 text-2xl font-black">RushMax Collection</div>
                      <div className="mt-1 text-emerald-300">Starting at ₹1,999</div>
                    </div>

                    <div className="absolute right-8 top-8 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
                      New Arrival
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="glass-panel premium-hover rounded-[28px] p-6">
                <Truck className="mb-4 h-6 w-6 text-emerald-300" />
                <h3 className="text-lg font-bold">Fast Delivery</h3>
                <p className="mt-2 text-sm text-white/65">Reliable and quick order delivery for footwear.</p>
              </div>
              <div className="glass-panel premium-hover rounded-[28px] p-6">
                <BadgeCheck className="mb-4 h-6 w-6 text-cyan-300" />
                <h3 className="text-lg font-bold">Easy Returns</h3>
                <p className="mt-2 text-sm text-white/65">Hassle-free return support for size issues.</p>
              </div>
              <div className="glass-panel premium-hover rounded-[28px] p-6">
                <Sparkles className="mb-4 h-6 w-6 text-lime-300" />
                <h3 className="text-lg font-bold">Premium Collections</h3>
                <p className="mt-2 text-sm text-white/65">Only footwear-focused premium product experience.</p>
              </div>
              <div className="glass-panel premium-hover rounded-[28px] p-6">
                <Phone className="mb-4 h-6 w-6 text-teal-300" />
                <h3 className="text-lg font-bold">Customer Support</h3>
                <p className="mt-2 text-sm text-white/65">Dedicated customer care and FAQ support.</p>
              </div>
            </section>

            <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="glass-panel rounded-[32px] p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                      Sneaker Spotlight
                    </div>
                    <div className="mt-2 text-3xl font-black">Best Picks This Week</div>
                  </div>
                  <button
                    onClick={() => setPage("shop")}
                    className="micro-btn rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white hover:bg-white/10"
                  >
                    View All
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <SpotlightCard
                    title="Velocity Neon"
                    text="Performance-driven sneaker for active comfort and sharp style."
                    price="₹2,899"
                    image="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80"
                  />
                  <SpotlightCard
                    title="Urban Rush Pro"
                    text="Street-ready silhouette with premium cushioning and modern edge."
                    price="₹3,199"
                    image="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80"
                  />
                </div>
              </div>

              <div className="glass-panel rounded-[32px] p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Featured Notice
                </div>
                <div className="mt-2 text-3xl font-black">Premium Members Perks</div>
                <p className="mt-3 text-white/70">
                  Free delivery, priority restock alerts, and exclusive access to new
                  sneaker launches.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="floating-card rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="font-bold text-white">Early Access Drops</div>
                    <div className="mt-1 text-sm text-white/60">
                      Get first access to limited footwear launches.
                    </div>
                  </div>
                  <div className="floating-card-delay rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="font-bold text-white">Loyalty Discounts</div>
                    <div className="mt-1 text-sm text-white/60">
                      Unlock premium offers on selected collections.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {role === "customer" && page === "shop" && (
          <section className="glass-panel space-y-6 rounded-[32px] p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-black">Shop Footwear</h2>
                <p className="mt-2 text-white/65">Browse premium footwear collections for men and women.</p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search shoes"
                    className="rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none placeholder:text-white/35 focus:border-emerald-400"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-emerald-400"
                >
                  {categories.map((category) => (
                    <option key={category} className="bg-slate-900">
                      {category}
                    </option>
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
          <section className="glass-panel rounded-[32px] p-8">
            <h2 className="text-3xl font-black">Your Wishlist</h2>
            <p className="mt-2 text-white/65">Saved footwear products appear here.</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.filter((product) => wishlist.includes(product.id)).length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/65">
                  No wishlist items yet.
                </div>
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
            <section className="glass-panel rounded-[32px] p-8">
              <h2 className="text-3xl font-black">Your Cart</h2>
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/65">
                    Your cart is empty.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[24px] border border-white/10 bg-black/20 p-4 sm:flex sm:items-center sm:gap-4"
                    >
                      <img src={item.image} alt={item.name} className="h-24 w-full rounded-2xl object-cover sm:w-24" />
                      <div className="mt-4 flex-1 sm:mt-0">
                        <div className="text-lg font-bold">{item.name}</div>
                        <div className="text-sm text-white/55">₹{item.price}</div>
                      </div>
                      <div className="mt-4 flex items-center gap-3 sm:mt-0">
                        <button
                          onClick={() => updateCartQty(item.id, "dec")}
                          className="micro-btn rounded-full border border-white/10 bg-white/5 p-2"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateCartQty(item.id, "inc")}
                          className="micro-btn rounded-full border border-white/10 bg-white/5 p-2"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <aside className="glass-panel rounded-[32px] p-8">
              <h3 className="text-2xl font-black">Order Summary</h3>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Items</span>
                  <span>{cart.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              <button className="micro-btn mt-6 w-full rounded-2xl bg-emerald-500 px-5 py-4 font-semibold text-white hover:bg-emerald-400">
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}

        {role === "customer" && page === "orders" && (
          <section className="glass-panel rounded-[32px] p-8">
            <h2 className="text-3xl font-black">My Orders</h2>
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="font-bold">{order.id}</div>
                      <div className="text-sm text-white/55">{order.product}</div>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === "contact" && (
          <section className="glass-panel rounded-[32px] p-8">
            <h2 className="text-3xl font-black">Contact</h2>
            <div className="mt-6 space-y-4 text-white/80">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-300" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-300" /> care@footrush.com
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-emerald-300" /> Hyderabad, India
              </div>
            </div>
          </section>
        )}

        {page === "faq" && (
          <section className="glass-panel rounded-[32px] p-8">
            <h2 className="text-3xl font-black">FAQ</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="font-bold">How long does delivery take?</div>
                <p className="mt-2 text-white/60">Usually 3–7 business days.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="font-bold">Can I return if size does not fit?</div>
                <p className="mt-2 text-white/60">Yes, within 7 days if unused.</p>
              </div>
            </div>
          </section>
        )}

        {role === "admin" && page === "admin" && (
          <div className="space-y-8">
            <section className="glass-panel rounded-[32px] bg-gradient-to-r from-zinc-950 via-slate-900 to-emerald-950 p-8 text-white">
              <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-emerald-300">
                FOOTRUSH Admin Panel
              </div>
              <h1 className="mt-4 text-4xl font-black">Store Dashboard</h1>
              <p className="mt-3 max-w-2xl text-white/65">
                Monitor clients, orders, inventory, and revenue.
              </p>
            </section>

            <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
              <div className="glass-panel premium-hover rounded-[28px] p-6">
                <Users className="mb-3 h-6 w-6 text-emerald-300" />
                <div className="text-3xl font-black">{totalCustomers}</div>
                <div className="text-sm text-white/60">Customers</div>
              </div>
              <div className="glass-panel premium-hover rounded-[28px] p-6">
                <ClipboardList className="mb-3 h-6 w-6 text-emerald-300" />
                <div className="text-3xl font-black">{orders.length}</div>
                <div className="text-sm text-white/60">Orders</div>
              </div>
              <div className="glass-panel premium-hover rounded-[28px] p-6">
                <IndianRupee className="mb-3 h-6 w-6 text-emerald-300" />
                <div className="text-3xl font-black">₹{totalRevenue}</div>
                <div className="text-sm text-white/60">Revenue</div>
              </div>
              <div className="glass-panel premium-hover rounded-[28px] p-6">
                <Boxes className="mb-3 h-6 w-6 text-emerald-300" />
                <div className="text-3xl font-black">{products.length}</div>
                <div className="text-sm text-white/60">Products</div>
              </div>
            </section>
          </div>
        )}

        {role === "admin" && page === "adminOrders" && (
          <section className="glass-panel rounded-[32px] p-8">
            <h2 className="text-3xl font-black">All Orders</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/55">
                    <th className="pb-3">Order</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-white/10">
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
            <section className="glass-panel rounded-[32px] p-8">
              <h2 className="text-3xl font-black">Add Product</h2>
              <div className="mt-6 space-y-4">
                <input
                  value={adminProduct.name}
                  onChange={(e) => setAdminProduct({ ...adminProduct, name: e.target.value })}
                  placeholder="Product name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-emerald-400"
                />
                <select
                  value={adminProduct.category}
                  onChange={(e) => setAdminProduct({ ...adminProduct, category: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-emerald-400"
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((category) => (
                      <option key={category} className="bg-slate-900">
                        {category}
                      </option>
                    ))}
                </select>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={adminProduct.price}
                    onChange={(e) => setAdminProduct({ ...adminProduct, price: e.target.value })}
                    placeholder="Price"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-emerald-400"
                  />
                  <input
                    value={adminProduct.oldPrice}
                    onChange={(e) => setAdminProduct({ ...adminProduct, oldPrice: e.target.value })}
                    placeholder="Old Price"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-emerald-400"
                  />
                </div>
                <input
                  value={adminProduct.stock}
                  onChange={(e) => setAdminProduct({ ...adminProduct, stock: e.target.value })}
                  placeholder="Stock"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-emerald-400"
                />
                <input
                  value={adminProduct.image}
                  onChange={(e) => setAdminProduct({ ...adminProduct, image: e.target.value })}
                  placeholder="Image URL"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-emerald-400"
                />
                <button
                  onClick={addAdminProduct}
                  className="micro-btn w-full rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white hover:bg-emerald-400"
                >
                  Add Product
                </button>
              </div>
            </section>

            <section className="glass-panel rounded-[32px] p-8">
              <h2 className="text-3xl font-black">Manage Products</h2>
              <div className="mt-6 space-y-4 max-h-[640px] overflow-auto pr-1">
                {products.map((product) => (
                  <div key={product.id} className="rounded-[24px] border border-white/10 bg-black/20 p-4 sm:flex sm:items-center sm:gap-4">
                    <img src={product.image} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="mt-4 flex-1 sm:mt-0">
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm text-white/55">{product.category} • ₹{product.price}</div>
                    </div>
                    <div className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-emerald-200 sm:mt-0">
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
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-[420px] w-full rounded-[28px] object-cover"
            />
            <div>
              <div className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                {selectedProduct.badge}
              </div>
              <h2 className="mt-4 text-4xl font-black tracking-tight">{selectedProduct.name}</h2>
              <p className="mt-3 text-white/70">{selectedProduct.description}</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="text-3xl font-black">₹{selectedProduct.price}</span>
                <span className="text-white/35 line-through">₹{selectedProduct.oldPrice}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold text-white">{selectedProduct.rating}</span>
                <span className="text-white/45">({selectedProduct.reviews} reviews)</span>
              </div>
              <div className="mt-6">
                <div className="text-sm font-bold text-white">Sizes</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="micro-btn rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white hover:bg-emerald-400"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="micro-btn rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white hover:bg-white/10"
                >
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