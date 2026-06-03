import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AdminContext = createContext();

const AdminContexProvider = ({ children }) => {
  // token admin disimpan di localStorage
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");

  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const res = await fetch(`${backendUrl}/api/admin/all-doctor`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });
    const data = await res.json();
    if (data.success) {
      setDoctors(data.doctors);
    }
  };

  useEffect(() => {
    if (aToken) fetchDoctors();
  }, [aToken]);

  const value = {
    aToken,
    setAToken,
    doctors,
    fetchDoctors,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContexProvider;
