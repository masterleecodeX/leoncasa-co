import React from 'react';
import { NavigationMenuDemo } from '@/components/ui/navigation-menu-demo';
import { FloatingActionMenuDemo } from '@/components/ui/demo';

export interface HeaderProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userPhotoUrl: string;
  onHome: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  className?: string;
}

export function Header({
  isLoggedIn,
  isAdmin,
  userPhotoUrl,
  onHome,
  onLogin,
  onSignup,
  onLogout,
  className = "w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 flex justify-between items-center relative z-50 pt-4"
}: HeaderProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 md:gap-0">
        <NavigationMenuDemo onHome={onHome} />
        
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {isLoggedIn ? (
          <FloatingActionMenuDemo userPhotoUrl={userPhotoUrl} isAdmin={isAdmin} onLogout={onLogout} />
        ) : (
          <>
            <button 
              onClick={onLogin}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none whitespace-nowrap"
            >
              Log in
            </button>
            <button 
              onClick={onSignup}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-[#1a1a1a] border border-transparent rounded-md hover:bg-black transition-colors focus:outline-none whitespace-nowrap"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
