import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    // padding kiri kanan - mobile: 16px, destok 10%
    <div className="mx-4 sm:mx-[10%]">
      {/* Navbar - tampil disemua halaman */}
      <Navbar />

      {/* Routes - halaman berganti sesuai URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} /> {/* filter by speciality */}
        <Route path="/appointment/:docId" element={<Appointment />} /> {/* detail dokter + booking */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} /> {/* register + login */}
        <Route path="/my-profile" element={<MyProfile />} /> {/* edit profil user */}
        <Route path="/my-appointments" element={<MyAppointments />} /> {/* riwayat booking */}
      </Routes>

      {/* Footer - tampil di semua halaman */}
      <Footer />
    </div>
  );
};

export default App;
