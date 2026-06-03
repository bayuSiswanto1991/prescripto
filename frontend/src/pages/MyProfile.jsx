import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MyProfile = () => {
  const { token } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const fetchProfile = async () => {
    const res = await fetch(`${backendUrl}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setUserData(data.user);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("phone", userData.phone);
    formData.append("dob", userData.dob);
    formData.append("gender", userData.gender);
    formData.append("address", JSON.stringify(userData.address));
    if (userData.image && userData.image !== userData.image) {
      formData.append("image", userData.image);
    }

    const res = await fetch(`${backendUrl}/api/user/update-profile`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    console.log("response:", data);
    if (data.success) {
      alert("Profil berhasil diupdate!");
      fetchProfile(); // refresh data
      setIsEdit(false);
    }

    console.log("handleUpdate dipanggil");
    console.log("userData:", userData);
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);
  return (
    userData && (
      <div className="max-w-lg mx-auto mt-10 p-5">
        {/* FOTO PROFIL */}
        <div className="flex items-center gap-4 mb-6">
          <label htmlFor="profile-img">
            <img
              src={
                userData.image instanceof File ? URL.createObjectURL(userData.image) : userData.image?.startsWith("http") ? userData.image : `${backendUrl}/${userData.image?.replace(/\\\\/g, "/")}`
              }
              alt=""
              className="w-24 h-24 rounded-full object-cover cursor-pointer bg-gray-100"
            />
          </label>
          {isEdit && <input type="file" id="profile-img" hidden onChange={(e) => setUserData((prev) => ({ ...prev, image: e.target.files[0] }))} />}
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              className="border rounded px-3 py-2 outline-none text-xl font-medium"
            />
          ) : (
            <p className="text-2xl font-medium">{userData.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-1">Email</p>
          <p className="text-gray-600">{userData.email}</p>
        </div>

        <hr className="my-4" />

        {/* PHONE */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-1">Phone</p>
          {isEdit ? (
            <input type="text" value={userData.phone} onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} className="border rounded px-3 py-2 outline-none w-full" />
          ) : (
            <p className="text-gray-600">{userData.phone}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-1">Address</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={userData.address?.line1}
                onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                className="border rounded px-3 py-2 outline-none"
                placeholder="Address line 1"
              />
              <input
                type="text"
                value={userData.address?.line2}
                onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                className="border rounded px-3 py-2 outline-none"
                placeholder="Address line 2"
              />
            </div>
          ) : (
            <p className="text-gray-600">
              {userData.address?.line1}
              <br />
              {userData.address?.line2}
            </p>
          )}
        </div>

        {/* DOB */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-1">Date of Birth</p>
          {isEdit ? (
            <input type="date" value={userData.dob} onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))} className="border rounded px-3 py-2 outline-none" />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>

        {/* GENDER */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm mb-1">Gender</p>
          {isEdit ? (
            <select value={userData.gender} onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))} className="border rounded px-3 py-2 outline-none">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Not Selected">Not Selected</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}
        </div>

        {/* TOMBOL */}
        {isEdit ? (
          <button onClick={handleUpdate} className="bg-primary text-white px-8 py-2 rounded-full hover:scale-105 transition-all">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEdit(true)} className="border border-primary text-primary px-8 py-2 rounded-full hover:scale-105 transition-all">
            Edit
          </button>
        )}
      </div>
    )
  );
};

export default MyProfile;
