import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hero10Demo from "./components/demo/Hero10Demo";
import NavigationMenuDemo from "./components/demo/NavigationMenuDemo";
import Hero04Demo from "./components/demo/Hero04Demo";
import LayoutToggleDemo from "./components/demo/LayoutToggleDemo";
import { Footer } from "./components/ui/footer-section";
import AuthSectionTwo from "./components/ui/auth-section-2";
import FloatingActionMenu from "./components/ui/floating-action-menu";
import { Settings, LogOut } from "lucide-react";
import { signOut, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./lib/firebase";
import { useAuth } from "./hooks/useAuth";
import { ErrorBoundary } from "./components/ErrorBoundary";
import AdminPage from "./pages/AdminPage";
import "./index.css";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./lib/firebase";

import { VisitorTracker } from "./components/VisitorTracker";
import HeroFashion from "./components/blocks/hero-fashion";

const scrollPositions: Record<string, number> = {};

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      scrollPositions[location.key] = window.scrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.key]);

  return null;
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    // Disable automatic top scrolling here because it causes the current exiting page to jump up immediately.
    // Instead we handle scrolling in the PageWrapper so it waits for the new page to mount.
    if (location.state?.scrollTo) {
      const scroll = () => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      };
      scroll();
      setTimeout(scroll, 300);
      setTimeout(scroll, 800);
      setTimeout(scroll, 1500);
    }
  }, [location]);
  return null;
}

function ImageProtector() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Prevent right-click context menu on images
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    // Global dragstart prevention as a fallback
    const handleDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}

function GlobalDataPrefetcher() {
  useEffect(() => {
    // Helper to eagerly download images into browser cache
    const preloadImages = (urls: (string | undefined)[]) => {
      urls.forEach((url) => {
        if (url) {
          const img = new Image();
          img.src = url;
        }
      });
    };

    // Eagerly fetch and cache data on app load to eliminate latency


    const unsubscribeProducts = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() }) as any,
          );
          localStorage.setItem("products_grid_cache", JSON.stringify(data));
          preloadImages(data.map((item: any) => item.imageUrl));
        }
      },
      (error) => {
        console.warn("Products listener error (quota exceeded? falling back to cache):", error.message);
      }
    );

    const unsubscribeHeroGallery = onSnapshot(
      collection(db, "hero_gallery"),
      (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() }) as any,
          );
          localStorage.setItem("hero_gallery_cache", JSON.stringify(data));
          preloadImages(data.map((item: any) => item.imageSrc));
        }
      },
      (error) => {
        console.warn("Hero gallery listener error (quota exceeded? falling back to cache):", error.message);
      }
    );

    return () => {
      unsubscribeProducts();
      unsubscribeHeroGallery();
    };
  }, []);

  return null;
}

function HeaderActions() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  if (user) {
    const menuOptions: Array<{
      label: string;
      Icon: React.ReactNode;
      onClick: () => void;
    }> = [];

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
        <FloatingActionMenu user={user} options={menuOptions} />
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
  const navType = useNavigationType();
  const location = useLocation();

  useEffect(() => {
    // Disable browser automatic scroll restoration to prevent fighting
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (navType === "POP") {
      const savedPosition = scrollPositions[location.key];
      if (savedPosition !== undefined) {
        requestAnimationFrame(() => {
          window.scrollTo(0, savedPosition);
          setTimeout(() => window.scrollTo(0, savedPosition), 100);
        });
      }
    } else if (!location.state?.scrollTo) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        setTimeout(() => window.scrollTo(0, 0), 10);
        setTimeout(() => window.scrollTo(0, 0), 50);
        setTimeout(() => window.scrollTo(0, 0), 100);
      });
    }
  }, [navType, location]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex w-full items-center justify-between p-4 relative z-50">
        <div className="flex-1 min-w-0">
          <NavigationMenuDemo />
        </div>
        <div className="shrink-0 flex items-center ml-2 sm:ml-4">
          <HeaderActions />
        </div>
      </header>
      <main className="flex-1 relative z-10 bg-background overflow-x-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16 bg-gradient-to-t from-background to-transparent z-20"></div>
        <Hero10Demo />
      </main>
      <Footer />
    </div>
  );
}

function GetStartedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex w-full items-center justify-between p-4 relative z-50 text-slate-900">
        <div className="flex-1 min-w-0">
          <NavigationMenuDemo showBackArrow={true} />
        </div>
        <div className="shrink-0 flex items-center ml-2 sm:ml-4">
          <HeaderActions />
        </div>
      </header>
      <main className="flex-1 flex flex-col relative z-10 bg-white -mt-[100px] pt-12 pb-24">
        <Hero04Demo />
        <LayoutToggleDemo />
      </main>
    </div>
  );
}

function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex w-full items-center justify-between p-4 relative z-50">
        <div className="flex-1 min-w-0">
          <NavigationMenuDemo showBackArrow={true} />
        </div>
        <div className="shrink-0 flex items-center ml-2 sm:ml-4">
          <HeaderActions />
        </div>
      </header>
      <main className="flex-1 relative z-10 bg-background overflow-x-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16 bg-gradient-to-t from-background to-transparent z-20"></div>
        <Hero04Demo />
      </main>
      <Footer />
    </div>
  );
}

function ProductDetailsPage() {
  const location = useLocation();
  const slideData = location.state?.slide || null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex w-full items-center justify-between p-4 relative z-50 text-slate-900">
        <div className="flex-1 min-w-0">
          <NavigationMenuDemo showBackArrow={true} />
        </div>
        <div className="shrink-0 flex items-center ml-2 sm:ml-4">
          <HeaderActions />
        </div>
      </header>
      <main className="flex-1 flex flex-col relative z-10 bg-white">
        <HeroFashion slide={slideData} />
      </main>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const navType = useNavigationType();
  
  return (
    <AnimatePresence 
      mode="wait"
      onExitComplete={() => {
        // Force the browser to jump to the top of the window exactly as the outgoing page is removed
        if (navType !== "POP" && !location.state?.scrollTo) {
          window.scrollTo(0, 0);
        }
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          }
        />
        <Route
          path="/get-started"
          element={
            <PageWrapper>
              <GetStartedPage />
            </PageWrapper>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageWrapper>
              <GalleryPage />
            </PageWrapper>
          }
        />
        <Route
          path="/details"
          element={
            <PageWrapper>
              <ProductDetailsPage />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <AuthSectionTwo />
            </PageWrapper>
          }
        />
        <Route
          path="/admin"
          element={
            <PageWrapper>
              <AdminPage />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ImageProtector />
        <VisitorTracker />
        <ScrollManager />
        <ScrollToTop />
        <GlobalDataPrefetcher />
        <AnimatedRoutes />
      </Router>
    </ErrorBoundary>
  );
}
