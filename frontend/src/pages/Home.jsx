import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-16 md:gap-20 lg:gap-28">
      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-20">
        {/* KIRI-TEXT */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-[10vh]">
          <p className="text-3xl md:w-4xl lg:text-5xl text-white font-bold font-semibold leading-tight">
            Book Appointment <br /> With Trusted Doctors
          </p>
          <div className="flex flex-col md:flex-row gap-3 text-white text-sm font-light">
            <img src={assets.group_profiles} alt="" className="w-28" />
            <p className="text-sm text-white">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
          </div>
          <button onClick={() => navigate("/doctors")} className="flex items-center gap-2 bg-white px-8 py-3 text-gray-600 rounded-full text-sm font-medium hover:scale-105 transition-all">
            Book appointment <img src={assets.arrow_icon} alt="" className="w-3" />
          </button>
        </div>

        {/* KANAN-GAMBAR */}
        <div className="md:w-1/2 relative">
          <img src={assets.header_img} alt="" className="w-full md:absolute bottom-0" />
        </div>
      </div>

      <SpecialityMenu />

      <TopDoctors />

      <Banner />
    </div>
  );
};

export default Home;
