import axios from "axios";
import React, { useState } from "react";
import { url } from "../services/ApiRoutes";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate(); // Fixed the incorrect 'Navigate' usage
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${url.baseApiUrl}api/users/login`, {
        email,
        password,
      });

      const { token, user } = response.data || {};
      const { name, role } = user || {};

      if (!token || !role) {
        throw new Error("Invalid login response");
      }

      // Store user information in cookies
      Cookies.set("userRole", role, { expires: 1 });
      Cookies.set("userToken", token);
      Cookies.set("userName", name);

      toast.success("Logged in successfully!");
      console.log("role", role);

      // Redirect user based on role
      switch (role) {
        case "admin":
          navigate("/dashboard");
          break;
        case "city_manager":
          navigate("/citystats");
          break;
        case "branch_manager":
          navigate("/branchHistory");
          break;
        default:
          navigate("/NotAllowed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to login. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
      <div className="bg-black shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Login</h1>
        <input
          type="email"
          placeholder="Email"
          aria-label="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          disabled={loading}
          onClick={handleLogin}
          className={`w-full py-2 px-4 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}

export default Login;
