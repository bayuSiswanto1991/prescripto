import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { token, doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const handleBooking = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!slotTime) {
      alert("Pilih jam dulu");
      return;
    }

    // format tanggal → "31_5_2026"
    const date = docSlots[slotIndex][0].dateTime;
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

    // kirim ke backend
    const res = await fetch("http://localhost:4000/api/user/book-appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ docId, slotDate, slotTime }),
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      navigate("/my-appointments");
    }

    console.log("data:", data);
    console.log("slotDate:", slotDate);
    console.log("slotTime:", slotTime);
    console.log("docId:", docId);
  };

  useEffect(() => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  }, [docId]);

  const getAvailabelSlots = () => {
    // waktu sekarang - tidak pernah berubah selama fungsi jalan
    let today = new Date();

    // array untuk menyimpan slot 7 hari
    let slot = [];

    // loop 7 hari kedepan
    for (let i = 0; i < 7; i++) {
      // salinan today untuk hari ke - i
      // i=0 → hari ini, i=1 → besok, i=2 → lusa...
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // batas akhir booking jam 21:00 hari ke i
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // set jam mulai booking
      if (today.getDate() === currentDate.getDate()) {
        // hari ini → mulai jam sekarang + 1
        // supaya tidak bisa booking jam yang sudah lewat
        currentDate.setHours(currentDate.getHours() > 8 ? currentDate.getHours() + 1 : 8);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // hari lain selalu mulai dari jam 08:00
        currentDate.setHours(8, 0, 0, 0);
      }

      // array untuk menyimpan slot jam hari ini
      let timeSlots = [];

      // loop jam dari jam mulai sampi jam 21:00
      // setiap 30 menit
      while (currentDate < endTime) {
        // format jam → "08:00 AM", "08:30 AM"...
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // simpan slot jam ke array
        timeSlots.push({
          dateTime: new Date(currentDate), // object Date lengkap
          time: formattedTime, // texk jam ditampilkan ke UI
        });

        // maju 30 menit → slot berikutnya
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // simpan semua jam hari ini ke slot
      slot.push(timeSlots);
      // slot[0] = [jam hari ini]
      // slot[1] = [jam besok]
      // ...
    }

    // update state dengan semua slot 7 hari
    // react render tampilan di UI
    setDocSlots(slot);
  };

  useEffect(() => {
    getAvailabelSlots();
  }, [docInfo]);

  console.log(docSlots);

  return (
    <div>
      {docInfo && (
        <>
          {/* INFO DOKTER */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <img src={`http://localhost:4000/${docInfo.image.replace(/\\/g, "/")}`} alt={docInfo.name} className="w-full bg-primary rounded-lg sm:max-w-72" />
            </div>
            <div className="flex-1 border border-gray-600 rounded-lg p-8 flex flex-col gap-2">
              <p className="flex items-center gap-2 text-xl">
                {docInfo.name} <img src={assets.verified_icon} alt="" className="w-5" />
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <span className="inline-block px-2 py-0.5 border border-gray-600 rounded-full">{docInfo.experience}</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-600 text-sm font-medium">About</p>
                <p className="text-sm text-gray-500">{docInfo.about}</p>
              </div>
              <p className="text-sm text-gray-500 font-medium mt-4">
                Appointment fee: <span className="text-gray-600">{docInfo.fees}</span>
              </p>
            </div>
          </div>

          {/* BOOKING SLOTS */}
          <div className="mt-8">
            <p className="font-medium text-gray-700">Booking slots</p>

            {/* PILIH HARI */}
            <div className="flex items-center gap-4 w-full  mt-4 overflow-x-scroll pb-2">
              {docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer
                  ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200"}`}
                >
                  <p>{item[0] && item[0].dateTime.toLocaleString("en-US", { weekday: "short" })}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
            </div>

            {/* PILIH JAM */}
            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 pb-2">
              {docSlots[slotIndex]?.map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm flex-shrink-0 px-5 py-2 rounded-full cursor-pointer
                  ${item.time === slotTime ? "bg-primary text-white" : "border border-gray-300"}`}
                >
                  {item.time}
                </p>
              ))}
            </div>

            {/* TOMBOL BOOKING */}
            <button className="bg-primary text-white px-14 py-3 rounded-full mt-6 hover:scale-105 transition-all" onClick={handleBooking}>
              Book an Appointment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Appointment;
