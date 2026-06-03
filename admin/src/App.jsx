import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddDoctor from "./pages/AddDoctor";
import DoctorList from "./pages/DoctorsList";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    // sudah login tampilkan admin panel
    <div className=" bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorList />} />
            <Route path="/appointments" element={<Appointments />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    // belum login → tamiplkan halan login
    <Routes>
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};

export default App;
