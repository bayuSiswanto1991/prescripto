import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets_admin/assets";
import { useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddDoctor = () => {
  const { aToken, fetchDoctors } = useContext(AdminContext);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // buat formData karena ada upload foto
    const formData = new FormData();
    formData.append("image", docImg);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("speciality", speciality);
    formData.append("degree", degree);
    formData.append("experience", experience);
    formData.append("about", about);
    formData.append("fees", fees);
    formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

    const res = await fetch(`${backendUrl}/api/admin/add-doctor`, {
      method: "POST",
      headers: { Authorization: `Bearer ${aToken}` },
      // tidak pakai content - type - biar browser set otomatis untuk FormData
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("Dokter berhasil ditambahkan");
      // reset form
      fetchDoctors();
      setDocImg(false);
      setName("");
      setEmail("");
      setPassword("");
      setDegree("");
      setAbout("");
      setFees("");
      setAddress1("");
      setAddress2("");
    } else {
      alert(data.message || "Gagal menambahkan dokter");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen ">
      <form onSubmit={handleSubmit} className="m-4 w-full">
        <p className="mb-4 text-lg font-medium">Add Doctor</p>

        <div className="bg-white px-8 py-8 border border-gray-300 rounded w-full overflow-y-scroll">
          {/* UPLOAD FOTO */}
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="doc-img">
              <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" className="w-16 rounded-full bg-gray-100 cursor-pointer  " />
            </label>
            <input type="file" onChange={(e) => setDocImg(e.target.files[0])} id="doc-img" hidden />
            <p>
              Upload doctor <br />
              picture
            </p>
          </div>

          {/* DUA KOLOM */}
          <div className="flex flex-col md:flex-row gap-10 text-gray-600">
            {/* KOLOM KIRI */}
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p>Doctor name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border rounded px-3 py-2 outline-none " placeholder="Name" required />
              </div>

              <div className="flex flex-col gap-1">
                <p>Doctor Email</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded px-3 py-2 outline-none " placeholder="Your email" required />
              </div>

              <div className="flex flex-col gap-1">
                <p>Doctor Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded px-3 py-2 outline-none " placeholder="Password" required />
              </div>

              <div className="flex flex-col gap-1">
                <p>Experience</p>
                <select value={experience} onChange={(e) => setExperience(e.target.value)} className="border rounded px-3 py-2 outline-none">
                  {["1 Year", "2 Year", "3 Year", "4 Year", "5 Year", "6 Year", "7 Year", "8 Year", "9 Year", "10 Year"].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <p>Fees</p>
                <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} className="border rounded px-3 py-2 outline-none " placeholder="Your fees" required />
              </div>
            </div>

            {/* KOLOM KANAN */}
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p>Speciality</p>
                <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="border rounded px-3 py-2 outline-none">
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <p>Degree</p>
                <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="Degree" required className="border rounded px-3 py-2 outline-none" />
              </div>

              <div className="flex flex-col gap-1">
                <p>Address</p>
                <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Addesss 1" className="border rounded px-3 py-2 outline-none" />
                <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Addesss 2" className="border rounded px-3 py-2 outline-none" />
              </div>
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-1 mt-4">
            <p>About Doctor</p>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="border rounded px-3 py-2 outline-none" rows={5} placeholder="Write about doctor" required></textarea>
          </div>

          {/* TOMBOL */}
          <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full hover:scale-105 transition-all">
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
