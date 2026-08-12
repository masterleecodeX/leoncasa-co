import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-serif text-slate-900 mb-8">Admin Portal</h1>
        <button
          onClick={handleLogin}
          className="px-8 py-3 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors"
        >
          Sign In via Google
        </button>
      </div>
    </div>
  );
}
