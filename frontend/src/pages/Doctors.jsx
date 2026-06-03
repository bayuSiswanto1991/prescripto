import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { specialityData } from "../assets/assets_frontend/assets";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);

  // filter dokter setiap kali speciality di URL berubah
  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      // tidak ada speciality → tampilan semua dokter
      setFilterDoc(doctors);
    }
  }, [speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="flex flex-col md:flex-row gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm">
          {specialityData.map((item, index) => (
            <p
              key={index}
              // klik yang aktif → hapus filter
              // klik yang tidak aktif pasang filter
              onClick={() => (item.speciality === speciality ? navigate("/doctors") : navigate(`/doctors/${item.speciality}`))}
              className={`${item.speciality === speciality ? "bg-[#E2E5FF]" : ""} border border-gray-600 px-4 py-2 w-50 text-gray-600 text-sm cursor-pointer rounded`}
            >
              {item.speciality}
            </p>
          ))}
        </div>

        {/* GRID DOKTER - tampilkan hasil filter */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5">
          {filterDoc.map((doctor, index) => (
            // card dokter - klik → ke halam appointment
            <div
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300 "
              onClick={() => navigate(`/appointment/${doctor._id}`)}
            >
              {/* FOTO DOKTER */}
              <div className="w-full bg-blue-50">
                <img src={doctor.image} alt={doctor.name} />
              </div>
              <div className="flex flex-col gap-1 p-4">
                {/* NAMA DAN SPESIALIS */}
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
      </div>
    </div>
  );
};

export default Doctors;
