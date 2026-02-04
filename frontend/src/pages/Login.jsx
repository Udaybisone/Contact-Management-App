import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate("/");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">

      {/* Page Heading */}
      <div className="max-w-6xl w-full mx-auto pt-16 px-6">
        <h1 className="text-2xl font-semibold">
          Login / Register
        </h1>
      </div>

      {/* Center Card */}
      <div className="flex flex-grow justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl border border-gray-200 w-[400px]"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
            Welcome to ContactManager
          </h2>

          <input
            type="email"
            className="w-full border border-gray-300 p-3 mb-5 rounded-full outline-none focus:border-red-500 transition"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="w-full border border-gray-300 p-3 mb-6 rounded-full outline-none focus:border-red-500 transition"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="bg-red-600 hover:bg-red-700 transition duration-300 w-full text-white p-3 rounded-full font-medium">
            Log In / Sign Up
          </button>

          <p className="mt-6 text-center">
            <Link
              to="/register"
              className="text-red-500 hover:underline font-medium"
            >
              Switch to Register / Login
            </Link>
          </p>
        </form>
      </div>

    </div>
  );
};

export default Login;
