import { BrowserRouter as Router, Routes, Route, useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hero10Demo from "./components/demo/Hero10Demo";
import NavigationMenuDemo from "./components/demo/NavigationMenuDemo";
import TextGradientScrollDemo from "./components/demo/TextGradientScrollDemo";
import Hero04Demo from "./components/demo/Hero04Demo";
import LayoutToggleDemo from "./components/demo/LayoutToggleDemo";
import CoverflowDemo from "./components/demo/CoverflowDemo";
import { Footer } from "./components/ui/footer-section";
import { Button } from "./components/ui/button";
import AuthSectionTwo from "./components/ui/auth-section-2";
import FloatingActionMenu from "./components/ui/floating-action-menu";
import { Settings, User as UserIcon, LogOut } from "lucide-react";
import { signOut, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./lib/firebase";
import { useAuth } from "./hooks/useAuth";
import { ErrorBoundary } from "./components/ErrorBoundary";
import AdminPage from "./pages/AdminPage";
import "./index.css";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./lib/firebase";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function GlobalDataPrefetcher() {
  useEffect(() => {
    // Eagerly fetch and cache data on app load to eliminate latency
    const unsubscribeCoverflow = onSnapshot(collection(db, "coverflow"), (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => doc.data() as any);
        localStorage.setItem("coverflow_slides_cache", JSON.stringify(data));
      }
    });

    const unsubscribeProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as any);
        localStorage.setItem("products_grid_cache", JSON.stringify(data));
      }
    });

    return () => {
      unsubscribeCoverflow();
      unsubscribeProducts();
    };
  }, []);
  
  return null;
}

function HeaderActions() {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  if (loading) return null;

  if (user) {
    const menuOptions: Array<{label: string; Icon: React.ReactNode; onClick: () => void}> = [];

    if (isAdmin) {
      menuOptions.push({
        label: "Admin Panel",
        Icon: <Settings className="w-4 h-4" />,
        onClick: () => navigate("/admin"),
      });
    }

    menuOptions.push({
      label: "Logout",
      Icon: <LogOut className="w-4 h-4" />,
      onClick: () => signOut(auth),
    });

    return (
      <div className="ml-auto flex items-center justify-end mr-4">
        <FloatingActionMenu
          user={user}
          options={menuOptions}
        />
      </div>
    );
  }

  return (
    <button 
      onClick={() => signInWithPopup(auth, googleProvider)}
      className="fixed bottom-1 right-1 p-3 text-[10px] leading-none text-slate-400 opacity-20 hover:opacity-100 transition-opacity z-50 focus:outline-none"
      title="."
    >
      .
    </button>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(4px)" }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="min-h-screen bg-background"
    >
      {children}
    </motion.div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex w-full items-center justify-between p-4 relative z-50 text-slate-900">
        <NavigationMenuDemo />
        <HeaderActions />
      </header>
      <main className="flex-1 flex flex-col relative z-10 bg-white -mt-[100px] pt-12 pb-24">
        <Hero04Demo />
        <LayoutToggleDemo />
      </main>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><AuthSectionTwo /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><AdminPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <GlobalDataPrefetcher />
        <AnimatedRoutes />
      </Router>
    </ErrorBoundary>
  );
}
