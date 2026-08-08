/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Hero10, type Hero10Props } from "@/components/ui/hero-10";
import { SignUpPage, MEDIA_URL } from "@/components/ui/signup-page";
import { HomeView } from "@/views/HomeView";
import { DonateView } from "@/views/DonateView";
import { AdminView } from "@/views/AdminView";
import { PostView } from "@/views/PostView";

import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [currentView, setCurrentView] = useState<
    "home" | "donate" | "signup" | "login" | "admin"
  >("home");

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "";
  });

  const [userPhotoUrl, setUserPhotoUrl] = useState(() => {
    return localStorage.getItem("userPhotoUrl") || "";
  });
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const adminEmails = ["kannyio08@gmail.com", "mleongholami08@gmail.com"];
  const isAdmin = isLoggedIn && adminEmails.includes(userEmail);

  const hero10Values = {
    title: "Build faster interfaces",
    titleLine2Prefix: "with",
    titleHighlight: "Ready-Made Blocks",
    description:
      "Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.",
    socialProof: "Trusted by 2k+ product teams",
    images: [
      "https://images.unsplash.com/photo-1685013640715-8701bbaa2207?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1746467364902-ab40952e33fe?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    imageAlts: ["Design detail", "Product interface", "Layout composition"],
    animation: "subtle",
    primaryCTA: {
      ctaEnabled: true,
      text: "Let's Start",
      link: "#",
      variant: "default",
      size: "default",
      onClick: () => setCurrentView("donate"),
    },
    secondaryCTA: {
      ctaEnabled: !isLoggedIn,
      text: "Sign Up",
      link: "#",
      variant: "outline",
      size: "default",
      onClick: () => setCurrentView("signup"),
    },
  } satisfies Hero10Props;

  React.useEffect(() => {
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userPhotoUrl", userPhotoUrl);
  }, [isLoggedIn, userEmail, userPhotoUrl]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [currentView, isLoggedIn]);

  React.useEffect(() => {
    // Preload the sign-up page media to eliminate latency
    if (MEDIA_URL.match(/\.(mp4|webm|ogg)$/i)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = MEDIA_URL;
      document.head.appendChild(link);
    } else {
      const img = new Image();
      img.src = MEDIA_URL;
    }
  }, []);

  const headerProps = {
    isLoggedIn,
    isAdmin,
    userPhotoUrl,
    onHome: () => setCurrentView("home"),
    onLogin: () => setCurrentView("login"),
    onSignup: () => setCurrentView("signup"),
    onAdmin: () => setCurrentView("admin"),
    onViewPost: (post?: any) => {
      setSelectedPost(post || null);
      setCurrentView("post");
    },
    onLogout: () => {
      setIsLoggedIn(false);
      setUserEmail("");
      setUserPhotoUrl("");
    },
  };

  const renderView = () => {
    switch (currentView) {
      case "post":
        return <PostView {...headerProps} post={selectedPost} />;
      case "admin":
        return <AdminView {...headerProps} />;
      case "signup":
        return (
          <motion.div
            key="signup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            <SignUpPage
              onBack={() => setCurrentView("donate")}
              initialIsLogin={false}
              onSignUpSuccess={(email, photoUrl) => {
                setIsLoggedIn(true);
                setUserEmail(email);
                setUserPhotoUrl(photoUrl || "");
                setCurrentView("home");
              }}
            />
          </motion.div>
        );
      case "login":
        return (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            <SignUpPage
              onBack={() => setCurrentView("donate")}
              initialIsLogin={true}
              onSignUpSuccess={(email, photoUrl) => {
                setIsLoggedIn(true);
                setUserEmail(email);
                setUserPhotoUrl(photoUrl || "");
                setCurrentView("home");
              }}
            />
          </motion.div>
        );
      case "donate":
        return <DonateView {...headerProps} />;
      case "home":
      default:
        return <HomeView hero10Values={hero10Values} {...headerProps} />;
    }
  };

  return <AnimatePresence mode="wait">{renderView()}</AnimatePresence>;
}
