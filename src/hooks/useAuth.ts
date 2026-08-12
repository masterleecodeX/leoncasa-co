import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let unsubscribeAdmin: (() => void) | undefined;
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser?.email) {
        if (currentUser.email === 'mleongholami08@gmail.com') {
          setIsAdmin(true);
          setLoading(false);
        } else {
          // Listen to admin doc changes
          unsubscribeAdmin = onSnapshot(doc(db, "admins", currentUser.email), (doc) => {
            setIsAdmin(doc.exists());
            setLoading(false);
          }, () => {
            setIsAdmin(false);
            setLoading(false);
          });
        }
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });
    
    return () => {
      unsubscribe();
      if (unsubscribeAdmin) unsubscribeAdmin();
    };
  }, []);

  return { user, loading, isAdmin };
}
