const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

// Also fix the layout so ReUI title is next to ChevronLeft correctly
const replacement = `<div className={className}>
      <div className="flex items-center gap-2 md:gap-0">
        <NavigationMenuDemo onHome={onHome} />
        <div className="md:hidden flex items-center">
          <button onClick={onHome} className="font-semibold text-lg tracking-tight">ReUI</button>
        </div>
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
    </div>`;

// Regex matching the return statement of Header
content = content.replace(/<div className=\{className\}>[\s\S]*?<\/div>\n    <\/div>/, replacement);

fs.writeFileSync('src/components/layout/Header.tsx', content);
