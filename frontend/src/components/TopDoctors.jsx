import { useNavigate } from "react-router-dom";
import { use, useContext } from "react";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col  items-center gap-16 justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-medium">Top Doctors to Book</h2>
        <p className="text-sm">Simply browse through our extensive list of trusted doctors.</p>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-5">
        {doctors.slice(0, 10).map((doctor, index) => (
          <div
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300 "
            onClick={() => navigate(`/appointment/${doctor._id}`)}
          >
            <div className="w-full bg-blue-50">
              <img src={doctor.image} alt={doctor.name} />
            </div>
            <div className="flex flex-col gap-1 p-4">
              <div className="flex items-center gap-2">
                <span className={` w-2 h-2 rounded-full ${doctor.available ? "bg-green-500" : "bg-gray-500"}`}></span>
                <p className={`text-sm ${doctor.available ? "text-green-500" : "text-gray-200"}`}>{doctor.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-sm font-medium">{doctor.name}</p>
              <p className="texs-sm text-black/70">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/doctors")} className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full hover:scale-105 transition-all">
        More
      </button>
    </div>
  );
};

export default TopDoctors;
