import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/user/my-appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        console.warn("❌ API response success=false:", data.pesan);
      }
    } catch (error) {
      console.error("❌ Error fetching appointments:", error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    const res = await fetch(`http://localhost:4000/api/user/cancel-appointment/${appointmentId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      fetchAppointments();
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointments();
    } else {
      console.warn("⚠️ Token kosong, skip fetch appointments");
    }
  }, [token]);

  return (
    <div>
      <p className=" text-lg font-medium mb-5">My Appointments</p>

      {/* loop appoinemts */}
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <div key={index} className=" flex py-4 border-b flex-col border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* FOTO DOKTER */}
                <div className="w-40 bg-[#EAEFFF]">
                  <img
                    src={appointment.docData.image?.startsWith("http") ? appointment.docData.image : `http://localhost:4000/${appointment.docData.image?.replace(/\\/g, "/")}`}
                    alt=""
                    className="w-full"
                  />
                </div>

                {/* INFO */}
                <div className="flex flex-col gap-5">
                  <p className="text-xl font-medium text-gray-600">{appointment.docData.name}</p>
                  <p className="text-sm text-gray-400">{appointment.docData.speciality}</p>
                  <p className="text-sm text-gray-400">
                    {appointment.slotDate} | {appointment.slotTime}
                  </p>
                </div>
              </div>

              {/* TOMBOL CANCEL */}
              {appointment.cancelled ? (
                <p>Canceled</p>
              ) : (
                <button
                  onClick={() => cancelAppointment(appointment._id)}
                  className=" text-sm text-stone-500 border border-stone-500 rounded hover:bg-red-500 transition-all hover:text-white px-4 py-2"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center py-10">{token ? "Tidak ada appointments 📋" : "Silakan login terlebih dahulu"}</p>
      )}
    </div>
  );
};

export default MyAppointments;
