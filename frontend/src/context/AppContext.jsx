import { createContext, useState, useEffect } from "react";

// buat gudang kosong
export const AppContext = createContext();

// buat provider yang membungkus semua komponeng
const AppContextProvider = ({ children }) => {
  // data yang disimpan didalam gudang
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // list dokter dari API
  const [doctors, setDoctors] = useState([]);

  const fetchDoctor = async () => {
    const res = await fetch("http://localhost:4000/api/doctor/list");
    const data = await res.json();
    if (data.success) {
      setDoctors(data.doctors);
    }
  };

  // fetch doctors saat pertama kali app dibuka
  useEffect(() => {
    fetchDoctor();
  }, []);

  // nilai yang bisa diakses semua komponen
  const value = {
    token,
    setToken,
    doctors, // list dokter dari API
    fetchDoctor, // fungsi fetch ulang
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
