/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Hero10, type Hero10Props } from '@/components/ui/hero-10';
import { NavigationMenuDemo } from '@/components/ui/navigation-menu-demo';
import { SignUpPage, MEDIA_URL } from '@/components/ui/signup-page';
import { CircularCarouselDemo } from '@/components/ui/circular-carousel-demo';
import { CardStackDemoPage } from '@/components/ui/card-stack-demo';
import { FloatingActionMenuDemo } from '@/components/ui/demo';


import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'donate' | 'signup' | 'login'>(() => {
    const saved = localStorage.getItem('currentView');
    return (saved as 'home' | 'donate' | 'signup' | 'login') || 'home';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const hero10Values = {
    title: 'Build faster interfaces',
    titleLine2Prefix: 'with',
    titleHighlight: 'Ready-Made Blocks',
    description: 'Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.',
    socialProof: 'Trusted by 2k+ product teams',
    images: [
      'https://images.unsplash.com/photo-1685013640715-8701bbaa2207?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1746467364902-ab40952e33fe?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    imageAlts: ['Design detail', 'Product interface', 'Layout composition'],
    animation: 'subtle',
    primaryCTA: {
      ctaEnabled: true,
      text: 'Let\'s Start',
      link: '#',
      variant: 'default',
      size: 'default',
      onClick: () => setCurrentView('donate')
    },
    secondaryCTA: {
      ctaEnabled: !isLoggedIn,
      text: 'Sign Up',
      link: '#',
      variant: 'outline',
      size: 'default',
      onClick: () => setCurrentView('signup')
    },
  } satisfies Hero10Props;

  React.useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  React.useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView, isLoggedIn]);

  React.useEffect(() => {
    // Preload the sign-up page media to eliminate latency
    if (MEDIA_URL.match(/\.(mp4|webm|ogg)$/i)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = MEDIA_URL;
      document.head.appendChild(link);
    } else {
      const img = new Image();
      img.src = MEDIA_URL;
    }
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'signup':
        return (
          <motion.div key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="min-h-screen">
            <SignUpPage onBack={() => setCurrentView('donate')} initialIsLogin={false} onSignUpSuccess={() => {
              setIsLoggedIn(true);
              setCurrentView('home');
            }} />
          </motion.div>
        );
      case 'login':
        return (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="min-h-screen">
            <SignUpPage onBack={() => setCurrentView('donate')} initialIsLogin={true} onSignUpSuccess={() => {
              setIsLoggedIn(true);
              setCurrentView('home');
            }} />
          </motion.div>
        );
      case 'donate':
        return (
          <motion.div key="donate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <main className="min-h-screen w-full bg-[#f4f4f5] flex flex-col items-center justify-start relative pt-4 pb-32 overflow-x-hidden">
              <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 flex justify-between items-center mb-0 relative z-50">
                <NavigationMenuDemo onHome={() => setCurrentView('home')} />
                <div className="flex items-center gap-3">
                  {isLoggedIn ? (
                    <FloatingActionMenuDemo onLogout={() => setIsLoggedIn(false)} />
                  ) : (
                    <>
                      <button 
                        onClick={() => setCurrentView('login')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none"
                      >
                        Log in
                      </button>
                      <button 
                        onClick={() => setCurrentView('signup')}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#1a1a1a] border border-transparent rounded-md hover:bg-black transition-colors focus:outline-none"
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </div>
              </div>
              <CircularCarouselDemo />
              <CardStackDemoPage />
            </main>
          </motion.div>
        );
      case 'home':
      default:
        return (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <main className="min-h-screen w-full bg-background flex flex-col">
              <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 flex justify-between items-center relative z-50 pt-4">
                <NavigationMenuDemo onHome={() => setCurrentView('home')} />
                <div className="flex items-center gap-3">
                  {isLoggedIn ? (
                    <FloatingActionMenuDemo onLogout={() => setIsLoggedIn(false)} />
                  ) : (
                    <>
                      <button 
                        onClick={() => setCurrentView('login')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none"
                      >
                        Log in
                      </button>
                      <button 
                        onClick={() => setCurrentView('signup')}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#1a1a1a] border border-transparent rounded-md hover:bg-black transition-colors focus:outline-none"
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </div>
              </div>
              <Hero10 {...hero10Values} />
              
              <section className="w-full bg-background py-16 md:py-24">
                <div className="mx-auto w-full max-w-4xl px-6 md:px-16 lg:px-24 text-left">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6 md:mb-8">
                    The Horizon of Engineering
                  </h2>
                  <div className="text-base md:text-lg leading-relaxed text-muted-foreground space-y-5 md:space-y-6">
                    <p>
                      Every curve, every line, and every precision-machined component is a testament to our relentless pursuit of perfection. 
                      We believe that true luxury is not just found in aesthetics, but in the seamless integration of cutting-edge technology with unparalleled human craftsmanship. 
                      When you step inside and grip the steering wheel, you are not simply driving; you are commanding a symphony of dynamic engineering designed to awaken your senses and elevate every journey.
                    </p>
                    <p>
                      Our vision extends far beyond the horizon of today's roads. We are actively pioneering the next generation of mobility solutions without ever compromising the exhilarating performance that defines our legacy. 
                      From highly advanced aerodynamic profiles to revolutionary powertrain systems, every vehicle we craft represents a bold, uncompromising step forward. 
                      Experience the pinnacle of automotive innovation, where comfort meets raw power, and every destination becomes a secondary thought to the thrill of the drive.
                    </p>
                    <p>
                      The architecture of our cabins is built around the driver, emphasizing an intuitive flow that connects human and machine. 
                      Using meticulously sourced, sustainable materials, we've crafted an interior environment that feels both expansive and intimately personal. 
                      Acoustic dampening technologies work in harmony with premium sound systems to transform the cabin into a sanctuary of clarity, allowing you to focus purely on the road ahead.
                    </p>
                    <p>
                      Safety remains the unspoken foundation of our design philosophy. 
                      Embedded within our striking exteriors is a highly intelligent network of sensors and predictive algorithms that monitor the environment thousands of times per second. 
                      This invisible shield ensures that confidence is never a luxury, but a standard feature. We are not just building vehicles; we are crafting the peace of mind required to truly explore the limits of performance.
                    </p>
                    <p>
                      As we look toward an electrified future, our commitment to driving pleasure only grows stronger. 
                      The transition to sustainable power is not a compromise, but a catalyst for unlocking new dimensions of torque, responsiveness, and control. 
                      We invite you to join us on this extraordinary journey, where the heritage of motorsport excellence converges with the boundless possibilities of tomorrow.
                    </p>
                  </div>
                </div>
              </section>
            </main>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderView()}
    </AnimatePresence>
  );
}
