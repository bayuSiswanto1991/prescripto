import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets_admin/assets";
import { useContext } from "react";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);

  const handleLogout = () => {
    localStorage.removeItem("aToken");
    setAToken("");
  };
  return (
    <div className="flex items-center justify-between py-3  border-b border-gray-300 bg-white px-4 sm:px-10">
      <div className="flex items-center gap-2 ">
        <img src={assets.admin_logo} alt="logo" className="w-[217px]" />
        <p className="border border-gray-500 text-gray-600 rounded-full px-2.5 py-0.5 text-xs">Admin</p>
      </div>
      <button onClick={handleLogout} className="bg-primary rounded-full px-10 py-2 text-white text-sm ">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
