import { useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../lib/firebase";

export function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const hasVisited = localStorage.getItem("hasVisited");
        if (!hasVisited) {
          const docRef = doc(db, "analytics", "visitors");
          const docSnap = await getDoc(docRef);
          
          if (!docSnap.exists()) {
            await setDoc(docRef, { count: 1 });
          } else {
            await updateDoc(docRef, { count: increment(1) });
          }
          localStorage.setItem("hasVisited", "true");
        }
      } catch (error) {
        console.error("Error tracking visitor:", error);
      }
    };
    
    trackVisitor();
  }, []);

  return null;
}
