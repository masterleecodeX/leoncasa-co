import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const ADMIN_EMAILS = ["mleongholami08@gmail.com"];
  const isAdmin = user?.email ? ADMIN_EMAILS.includes(user.email) : false;

  return { user, loading, isAdmin };
}
