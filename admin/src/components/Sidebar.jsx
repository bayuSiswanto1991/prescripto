import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets_admin/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-white ">
      {aToken && (
        <ul>
          {/* DASHBOARD */}
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-4 py-4 px-3 md:px-8 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`}>
            <img src={assets.home_icon} alt="" className="w-5" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          {/* APPOINTMENTS */}
          <NavLink to="/appointments" className={({ isActive }) => `flex items-center gap-4 py-4 px-3 md:px-8 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`}>
            <img src={assets.appointment_icon} alt="" className="w-5" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          {/* ADD DOCTOR */}
          <NavLink to="/add-doctor" className={({ isActive }) => `flex items-center gap-4 py-4 px-3 md:px-8 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`}>
            <img src={assets.add_icon} alt="" className="w-5" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          {/* DOCTORS LIST */}
          <NavLink to="/doctor-list" className={({ isActive }) => `flex items-center gap-4 py-4 px-3 md:px-8 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`}>
            <img src={assets.people_icon} alt="" className="w-5" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
