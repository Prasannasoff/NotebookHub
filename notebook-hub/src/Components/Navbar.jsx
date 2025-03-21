import { Link, useLocation } from "react-router-dom";
import { Book, Search, ShoppingBag, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop Notebooks", href: "/shop" },
  { name: "Custom Orders", href: "/custom" },
  { name: "Order Tracking", href: "/tracking" },
  { name: "Live Chat", href: "/chat" },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Book className="h-6 w-6" />
            <span>NotebookWholesale</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
          <button className="relative h-10 w-10 items-center justify-center rounded-md hover:bg-accent">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              3
            </span>
          </button>
          <button className="hidden md:flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </button>
          <button className="hidden md:flex h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md" onClick={() => navigate('/register')}>
            Register
          </button>
          <button className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">
            Admin
          </button>
        </div>
      </div>
    </header>
  );
}
