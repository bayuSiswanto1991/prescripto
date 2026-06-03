import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);

    if (data.token) {
      localStorage.setItem("aToken", data.token);
      setAToken(data.token);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="min-h-screen flex items-center">
        <div className="flex flex-col gap-4 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl border-gray-600  ">
          {/* JUDUL */}
          <p className="text-2xl font-semibold text-gray-800">Admin Login</p>
          <p className="text-gray-500">Login to acess admin panel</p>

          {/* EMAIL */}
          <div className="w-full">
            <p className="mb-1">Email</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 w-full rounded p-2 outline-none" required />
          </div>

          {/* PASSWORD */}
          <div className="w-full">
            <p className="mb-1">Password</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 w-full rounded p-2 outline-none" required />
          </div>

          {/* TOMBOL */}
          <button type="submit" className="bg-primary text-white w-full rounded-md hover:scale-105 transition-all py-3">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
