import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import Home from "./Pages/Home";
import CustomOrderPage from "./Pages/CustomOrderPage";
import TrackingPage from "./Pages/TrackingPage";
import ShopPage from "./Pages/ShopPage";
import ChatPage from "./Pages/ChatPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import AddNotebook from "./Pages/Admin/AddNotebook.jsx";
import ViewOrders from "./Pages/Admin/ViewOrders.jsx";
import { UserProvider } from "../src/Context/UserContext.jsx";
import PaymentSuccess from "./Components/ui/Model/PaymentSuccess.jsx";
import SetCustomPrices from "./Pages/Admin/SetCustomPrices.jsx";
import CustomPaymentSuccess from "./Components/ui/Model/CustomPaymentSuccess.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
function LayoutWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  // src/main.jsx or src/App.jsx

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/custom" element={<CustomOrderPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AddNotebook />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/view-order" element={<ViewOrders />} />
        <Route path="/custom-prices" element={<SetCustomPrices />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route
          path="/payment-success-custom"
          element={<CustomPaymentSuccess />}
        />
      </Routes>
    </>
  );
}
function App() {
  return (
    <UserProvider>
      <Router>
        <LayoutWrapper />
      </Router>
    </UserProvider>
  );
}

export default App;
