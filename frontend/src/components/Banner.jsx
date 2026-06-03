import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-20 items-center md:mx-10 my-20 justify-between  ">
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-14 ">
        <h1 className=" text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">Book Appointment With 100+ Trusted Doctors</h1>
        <button onClick={() => navigate("/login")} className="text-gray-600 text-sm px-12 py-3 rounded-full bg-white hover:scale-105 transition-all mt-8">
          Create account
        </button>
      </div>

      <div className="hidden md:block md:flex-1 lg:w-[370px] relative">
        <img src={assets.appointment_img} alt="" className="w-full bottom-0 right-0 max-w-md" />
      </div>
    </div>
  );
};

export default Banner;
