import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);

  // fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus dari localStorage
    setToken(""); // hapus dari Context
    navigate("/login"); // redirect ke login
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      {/* LOGO */}
      <img src={assets.logo} alt="logo" className="w-[217px] cursor-pointer" onClick={() => navigate("/")} />

      {/* MENU DESKTOP */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/">
          <li>HOME</li>
        </NavLink>
        <NavLink to="/doctors">
          <li>All DOCTORS</li>
        </NavLink>
        <NavLink to="/about">
          <li>ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li>CONTACT</li>
        </NavLink>
      </ul>

      {/* TOMBOL LOGIN PROFILE */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img src={assets.profile_pic} alt="" className="w-8 rounded-full" />
            <img src={assets.dropdown_icon} alt="" className="w-2.5" />
            {/* DROPDOWN MENU */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">
                  My Appoinments
                </p>
                <p onClick={handleLogout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate("/login")} className="bg-primary text-white rounded-full font-light hidden md:block px-8 py-3">
            Creat Account
          </button>
        )}

        {/* HAMBURGER ICON - hanya mobile */}
        <img src={assets.menu_icon} alt="menu" className=" w-6 md:hidden cursor-pointer" onClick={() => setShowMenu(true)} />
      </div>

      {/* MOBILE MENU */}
      <div className={`${showMenu ? " fixed w-full" : "w-0 h-0"} md:hidden right-0 top-0 bottom-0 z-20 bg-white transition-all overflow-hidden `}>
        {/* HEADER MOBILE MENU */}
        <div className="flex items-center justify-between px-5 py-6">
          <img src={assets.logo} alt="logo" className=" w-36" />
          <img src={assets.cross_icon} alt="close" className=" w-7 cursor-pointer" onClick={() => setShowMenu(false)} />
        </div>

        {/* LINKS MOBILE */}
        <ul className=" flex flex-col items-center gap-2 mt-5 text-lg font-medium">
          <NavLink to="/" onClick={() => setShowMenu(false)}>
            <p className="px-2 py-4 rounded inline-block"> HOME</p>
          </NavLink>
          <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
            <p className="px-2 py-4 rounded inline-block">ALL DOCTORS</p>
          </NavLink>
          <NavLink to="/about" onClick={() => setShowMenu(false)}>
            <p className="px-2 py-4 rounded inline-block">ABOUT</p>
          </NavLink>
          <NavLink to="/contact" onClick={() => setShowMenu(false)}>
            <p className="px-2 py-4 rounded inline-block">CONTACT</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
