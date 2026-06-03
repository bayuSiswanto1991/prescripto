import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const DoctorsList = () => {
  const { aToken, doctors, fetchDoctors } = useContext(AdminContext);

  // toggle available dokter
  const toggleAvailable = async (docId) => {
    const res = await fetch(`http://localhost:4000/api/admin/toggle-available/${docId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${aToken}` },
    });

    const data = await res.json();
    if (data.success) {
      fetchDoctors();
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-5">All Doctors</h1>

      {/* GRID DOCTORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {doctors.map((doctor, index) => (
          <div key={index} className="border border-[#C9D8FF] rounded-xl overflow-hidden hover:translate-y-[-5px] transition-all">
            {/* FOTO */}
            <img src={`http://localhost:4000/${doctor.image.replace(/\\/g, "/")}`} alt={doctor.name} className=" w-full bg-[#EAEFFF] " />
            {/* INFO */}
            <div className=" p-4">
              <p className=" font-medium text-gray-800">{doctor.name}</p>
              <p className=" text-sm text-gray-500 mt-1">{doctor.speciality}</p>
              {/* TOGGLE AVAILABLE */}
              <div className=" flex items-center gap-2 mt-3">
                <input type="checkbox" checked={doctor.available} onChange={() => toggleAvailable(doctor._id)} className=" cursor-pointer" />
                <p className=" text-sm text-gray-600">{doctor.available ? "Available" : "Not Available"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
