import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

// ─────────────────────────────────────
// HALAMAN LOGIN & REGISTER
// → state "Sign Up" → form register
// → state "Login"   → form login
// → toggle antara keduanya dengan klik link
// ─────────────────────────────────────
const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  // state untuk toggle form Sign Up / Login
  // default "Sign Up" → pertama buka halaman = form register
  const [state, setState] = useState("Sign Up");

  // state untuk menyimpan nilai input form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ─────────────────────────────────────
  // HANDLE SUBMIT
  // → dipanggil saat user klik tombol
  // → cek state → pilih API yang sesuai
  // ─────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault(); //cegah relod halaman

    if (state === "Sign Up") {
      // REGISTER - kirim name, email, password ke API
      const res = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      // register berhasil pindah ke login
      if (data.user) {
        setState("Login");
      }
    } else {
      // LOGIN — kirim email + password saja (tidak butuh name)
      const res = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // login berhasil → simpan token → ke home
      if (data.token) {
        localStorage.setItem("token", data.token); // simpan ke browser
        setToken(data.token); // simpan ke Context
        navigate("/");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex items-center">
      <div className="flex flex-col gap-4 p-8 items-start m-auto border border-gray-600 shadow text-gray-600 rounded-xl min-w-[340px] sm:min-w-96">
        {/* JUDUL */}
        <p className="text-2xl font-medium text-gray-600">{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up " : "login"} to book appointmen</p>

        {/* INPUT NAME -hanya muncul saat Sign Up */}
        {state === "Sign Up" && (
          <div className="w-full">
            <p className="mb-1">Full Name</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-600 p-2 outline-none rounded" />
          </div>
        )}

        {/* INPUT EMAIL */}
        <div className="w-full">
          <p className="mb-1">Email</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-600 p-2 outline-none rounded" />
        </div>

        {/* INPUT PASSWORD */}
        <div className="w-full">
          <p className="mb-1">Password</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-600 p-2 outline-none rounded" />
        </div>

        {/* TOMBOL SUBMIT */}
        <button type="submit" className="w-full bg-primary rounded text-sm text-white py-3 hover:scale-105 transition-all">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* TOMBOL SIGN UP / LOGIN */}
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("Login")} className="text-primary underline">
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")} className="text-primary underline">
              Create Account
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
