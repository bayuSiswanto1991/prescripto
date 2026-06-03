import { useNavigate } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";

const SpecialityMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-gray-900  gap-8">
      <div className="flex flex-col items-center justify-between gap-4">
        <h2 className="text-3xl font-medium">Find by Speciality </h2>
        <p className="text-center text-sm text-gray-500 ">
          Simply browse through our extensive list of trusted doctors, schedule <br /> your appointment hassle-free.
        </p>
      </div>

      <div className="flex w-full sm:justify-center pt-5 gap-4 overflow-x-auto pb-2 px-4 ">
        {specialityData.map((item, index) => (
          <div key={index} className="flex items-center flex-col gap-3 hover:translate-y-[-5px] transition-all duration-300 flex-shrink-0" onClick={() => navigate(`/doctors/${item.speciality}`)}>
            <img src={item.image} alt="" className="w-[123px]" />
            <p className="text-sm text-black/70 whitespace-nowrap">{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
