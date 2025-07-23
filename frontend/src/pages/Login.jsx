import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Feather } from "lucide-react";
import ThemeSwitcher from "../components/ThemeSwitcher.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error("Login failed");

      const data = JSON.parse(text);
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1000); // Delay to show success
    } catch (err) {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-sm bg-base-100 p-8 rounded-box shadow-lg border border-base-300">
        <div
          className="tooltip tooltip-bottom mb-4 cursor-pointer"
          data-tip="“oryn — from ‘auryn’, meaning breeze or clarity; a space where thoughts quietly bloom.”"
        >
          <h1 className="text-3xl font-bold text-primary text-center flex items-center justify-center gap-2 font-serif italic">
            <Feather className="w-6 h-6" />
            oryn
          </h1>
        </div>

        <h2 className="text-lg font-semibold italic text-center mb-6 text-base-content/80">
          "My personal note-taking app. Other users won’t be allowed—at least for now."
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-full">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
