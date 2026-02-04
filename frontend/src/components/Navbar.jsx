import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ search, setSearch }) => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT — Logo */}
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          ContactManager
        </h1>

        {/* CENTER — Search */}
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-[380px]
            border border-gray-300
            px-4 py-2
            rounded-full
            outline-none
            focus:border-red-500
            transition
          "
        />

        {/* RIGHT — Logout */}
        <button
          onClick={logout}
          className="
            bg-red-600 
            hover:bg-red-700 
            text-white 
            px-5 
            py-2 
            rounded-full 
            font-medium
            transition
          "
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
