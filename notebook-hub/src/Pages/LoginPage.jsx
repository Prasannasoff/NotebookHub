import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../Context/UserContext.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserDetails } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:9092/auth/login`, {
        email,
        password,
      });
      const token = response.data.token;
      const user = response.data.userDetails;
      console.log(user.user_id);
      setUserDetails(user);
      localStorage.setItem("token", token);
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <div className="w-full max-w-md p-10 rounded-2xl bg-white bg-opacity-30 backdrop-blur-md shadow-lg flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center">
            <UserCircle className="w-12 h-12 text-white" />
          </div>
          <div className="text-black text-2xl font-semibold font-poppins mt-3">
            Login
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 items-center">
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-blue-900 text-white text-lg outline-none placeholder-gray-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-blue-900 text-white text-lg outline-none placeholder-gray-300"
          />

          <button
            onClick={handleLogin}
            className="w-3/5 p-3 rounded-lg bg-blue-900 text-white text-lg font-semibold transition duration-200 hover:bg-blue-800"
          >
            LOGIN
          </button>
        </div>

        <Link to="/register" className="text-gray-700 text-sm hover:underline">
          CLICK HERE TO REGISTER
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
