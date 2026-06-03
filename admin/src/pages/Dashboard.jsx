import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets_admin/assets";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const { aToken } = useContext(AdminContext);
  const [dashData, setDashData] = useState(null);

  const fetchDashData = async () => {
    const res = await fetch(`${backendUrl}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });

    const data = await res.json();
    if (data.success) {
      setDashData(data.dashData);
    }
  };

  useEffect(() => {
    fetchDashData();
  }, [aToken]);

  return (
    dashData && (
      <div className=" m-5">
        {/* STAT CARD */}
        <div className=" flex flex-wrap gap-4">
          {/* DOCTORS */}
          <div className=" flex items-center gap-2 bg-white p-4 min-w-52 rounded border border-gray-100  hover:scale-105 cursor-pointer transition-all">
            <img src={assets.doctor_icon} alt="" className=" w-14" />
            <div>
              <p className=" text-xl font-semibold text-gray-600">{dashData.doctors}</p>
              <p className=" text-gray-400">Doctors</p>
            </div>
          </div>

          {/* APPOINMENTS */}
          <div className=" flex items-center gap-2 bg-white p-4 min-w-52 rounded border border-gray-100  hover:scale-105 cursor-pointer transition-all">
            <img src={assets.appointments_icon} alt="" className=" w-14" />
            <div>
              <p className=" text-xl font-semibold text-gray-600">{dashData.appointments}</p>
              <p className=" text-gray-400">Appointments</p>
            </div>
          </div>

          {/* PATIENTS */}
          <div className=" flex items-center gap-2 bg-white p-4 min-w-52 rounded border border-gray-100  hover:scale-105 cursor-pointer transition-all">
            <img src={assets.patients_icon} alt="" className=" w-14" />
            <div>
              <p className=" text-xl font-semibold text-gray-600">{dashData.patients}</p>
              <p className=" text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* LATES APPOINTMENTS */}
        <div className=" bg-white mt-10 rounded border border-gray-100">
          {/* HEADER */}
          <div className="flex gap-2 px-4 py-3 border border-gray-100">
            <img src={assets.list_icon} alt="" className=" w-5" />
            <p className=" font-medium">Latest Appointment</p>
          </div>

          {/* LIST */}
          {dashData.latestAppointments.map((appointment, index) => (
            <div key={index} className="flex items-center gap-4 px-6 py-3 border-b hover:bg-gray-50">
              {/* FOTO DOKTER */}
              <img
                src={appointment.docData.image}
                alt=""
                className="w-10 rounded-full bg-gray-100"
              />

              {/* INFO */}
              <div className="flex-1">
                <p className="font-medium text-gray-800">{appointment.docData.name}</p>
                <p className="text-sm text-gray-500">{appointment.slotDate}</p>
              </div>

              {/* STATUS */}
              {appointment.cancelled ? <p className="text-red-400 text-xs font-medium">Cancelled</p> : <p className="text-green-400 text-xs font-medium">Confirmed</p>}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Dashboard;
