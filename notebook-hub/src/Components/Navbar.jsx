import { Link, useLocation } from "react-router-dom";
import { Book, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../Context/UserContext"; // wherever your context is
const navItems = {
  user: [
    { name: "Home", href: "/" },
    { name: "Shop Notebooks", href: "/shop" },
    { name: "Custom Orders", href: "/custom" },
    { name: "Order Tracking", href: "/tracking" },
    // { name: "Live Chat", href: "/chat" }
  ],

  admin: [
    { name: "Admin Dashboard", href: "/admin-dashboard" },
    { name: "Add notebooks", href: "/admin" },
    { name: "View Orders", href: "/view-order" },
  ],
};

export function Navbar() {
  const { userDetails, setUserDetails } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (userDetails === null) {
    navigate("login");
    // return (
    //   <div className="w-full h-16 flex items-center justify-center">
    //     <span className="text-muted-foreground text-sm">Loading...</span>

    //   </div>
    // );
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setUserDetails(null);
    navigate("/login");
  };
  const currentNavItems = userDetails?.admin ? navItems.admin : navItems.user;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-yellow-500"
          >
            <Book className="h-6 w-6" />
            <span>Barane Paper Boards</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 ml-6">
            {currentNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? "text-yellow-500 border-b-2 border-yellow-600 pb-1"
                    : "text-gray-600 hover:text-yellow-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="hidden md:inline-block px-4 py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-emerald-50 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>

          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md border-t border-gray-200 px-6 py-4">
          <div className="flex flex-col gap-3">
            {currentNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? "text-emerald-600"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              className="text-left text-base font-medium text-gray-700 hover:text-red-500"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
