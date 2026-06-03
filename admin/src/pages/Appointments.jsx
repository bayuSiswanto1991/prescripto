import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { aToken } = useContext(AdminContext);

  const fetchAppointments = async () => {
    const res = await fetch(`${backendUrl}/api/admin/appointments`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });

    const data = await res.json();
    if (data.success) {
      setAppointments(data.appointments);
    }
  };

  const handleAppoinmentCancel = async (appointmentId) => {
    const res = await fetch(`${backendUrl}/api/admin/cancel-appointment/${appointmentId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${aToken}` },
    });

    const data = await res.json();
    if (data.success) {
      fetchAppointments();
    }
  };

  useEffect(() => {
    if (aToken) fetchAppointments();
  }, [aToken]);
  return (
    <div className="m-5 w-full">
      <h1 className=" text-lg font-medium mb-5">All Appointments</h1>

      {/* TABLE */}
      <div className=" bg-white border rounded text-sm">
        {/* HEADER */}
        <div className=" grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b text-gray-500 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* ROW */}
        {appointments.map((appointment, index) => (
          <div key={index} className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b text-gray-600 hover:bg-gray-50">
            {/* NOMOR */}
            <p>{index + 1}</p>

            {/* PATIENT */}
            <div className="flex items-center gap-2">
              <img
                src={appointment.userData.image}
                alt=""
                className="w-8 rounded-full bg-gray-100"
              />
              <p>{appointment.userData.name}</p>
            </div>

            {/* AGE */}
            <p>{appointment.userData.dob || "-"}</p>

            {/* DATE & TIME */}
            <p>
              {appointment.slotDate} | {appointment.slotTime}
            </p>

            {/* DOCTOR */}
            <div className="flex items-center gap-2">
              <img
                src={appointment.docData.image}
                alt=""
                className="w-8 rounded-full bg-gray-100"
              />
              <p>{appointment.docData.name}</p>
            </div>

            {/* FEES */}
            <p>${appointment.amount}</p>

            {/* ACTION */}
            {appointment.cancelled ? (
              <p className=" text-red-400 text-xs font-medium">Cancelled</p>
            ) : (
              <button onClick={() => handleAppoinmentCancel(appointment._id)} className=" text-red-400 hover:text-red-600 text-xs border border-red-300 px-2 py-1">
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
