import React from 'react';
import { Hero10, type Hero10Props } from '@/components/ui/hero-10';
import { Header, type HeaderProps } from '@/components/layout/Header';
import { motion } from 'motion/react';

export interface HomeViewProps extends HeaderProps {
  hero10Values: Hero10Props;
}

export function HomeView({ hero10Values, ...headerProps }: HomeViewProps) {
  return (
    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <main className="min-h-screen w-full bg-background flex flex-col">
        <Header {...headerProps} />
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
