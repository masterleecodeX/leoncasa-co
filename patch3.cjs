const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

// 1. Add forgotPasswordStep state
content = content.replace(
  'const [is2FA, setIs2FA] = useState(false);',
  'const [is2FA, setIs2FA] = useState(false);\n  const [forgotPasswordStep, setForgotPasswordStep] = useState(0);'
);

// 2. Add handlers for forgot password
const handlers = `
  const handleForgotPassword = async () => {
    if (forgotPasswordStep === 1) {
      if (!email) {
        setErrorMessage("Please enter your email.");
        return;
      }
      const usersStr = localStorage.getItem('users');
      const users = usersStr ? JSON.parse(usersStr) : [];
      const user = users.find((u: any) => u.email === email);
      if (!user) {
        setErrorMessage("Account not found.");
        return;
      }
      setErrorMessage("");
      const code = Math.floor(10000 + Math.random() * 90000).toString();
      setGeneratedVerificationCode(code);
      console.log("Forgot Password Code:", code);
      try {
        await fetch('/api/send-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code })
        });
      } catch (err) {}
      setForgotPasswordStep(2);
    } else if (forgotPasswordStep === 3) {
      if (!password || password !== confirmPassword) {
        setErrorMessage("Passwords do not match or are empty.");
        return;
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$/;
      if (!passwordRegex.test(password)) {
        setErrorMessage("Password must be at least 8 characters and contain at least one uppercase letter, one number, and one special character.");
        return;
      }
      
      const hashPassword = async (pwd: string) => {
        const msgUint8 = new TextEncoder().encode(pwd);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      };
      
      const usersStr = localStorage.getItem('users');
      const users = usersStr ? JSON.parse(usersStr) : [];
      const userIndex = users.findIndex((u: any) => u.email === email);
      if (userIndex > -1) {
        const hashedPassword = await hashPassword(password);
        users[userIndex].password = hashedPassword;
        localStorage.setItem('users', JSON.stringify(users));
        setErrorMessage("");
        setForgotPasswordStep(0);
        setIsLogin(true);
      }
    }
  };
`;

content = content.replace(
  'const handleSubmit = async () => {',
  handlers + '\n  const handleSubmit = async () => {'
);

// 3. Update back button logic
content = content.replace(
  'onClick={() => is2FA ? setIs2FA(false) : onBack?.()}',
  'onClick={() => { if (forgotPasswordStep > 0) { setForgotPasswordStep(0); } else if (is2FA) { setIs2FA(false); } else { onBack?.(); } }}'
);
content = content.replace(
  '{(onBack || is2FA) && (',
  '{(onBack || is2FA || forgotPasswordStep > 0) && ('
);
content = content.replace(
  '{is2FA ? "Back" : "Home"}',
  '{is2FA || forgotPasswordStep > 0 ? "Back" : "Home"}'
);

content = content.replace(
  'onClick={() => is2FA ? setIs2FA(false) : onBack?.()}',
  'onClick={() => { if (forgotPasswordStep > 0) { setForgotPasswordStep(0); } else if (is2FA) { setIs2FA(false); } else { onBack?.(); } }}'
);
content = content.replace(
  '{(onBack || is2FA) && ( // For mobile when no left section',
  '{(onBack || is2FA || forgotPasswordStep > 0) && ( // For mobile when no left section'
);
content = content.replace(
  '{is2FA ? "Back" : "Home"}',
  '{is2FA || forgotPasswordStep > 0 ? "Back" : "Home"}'
);

// 4. Update the render logic for forgot password steps
const renderLogic = `
            {forgotPasswordStep > 0 ? (
              <motion.div
                key="forgot-password"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full"
              >
                <div className="flex flex-col items-center mb-6">
                  <h1 className="text-[28px] font-medium text-center mb-2 tracking-tight text-black">
                    {forgotPasswordStep === 1 ? "Reset Password" : forgotPasswordStep === 2 ? "Verify Code" : "New Password"}
                  </h1>
                  <p className="text-gray-500 text-[15px] text-center">
                    {forgotPasswordStep === 1 ? "Enter your email to receive a reset code." : forgotPasswordStep === 2 ? "Enter the verification code sent to your email." : "Enter your new password."}
                  </p>
                </div>
                
                {forgotPasswordStep === 1 && (
                  <div className="relative mb-6">
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-16 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                    />
                  </div>
                )}
                
                {forgotPasswordStep === 2 && (
                  <div className="space-y-6 relative mb-6">
                    <div className="flex gap-4 relative">
                      <div className="w-full">
                        <div className="flex gap-3 justify-center">
                          {twoFACode.map((digit, index) => (
                            <input 
                              key={index}
                              ref={(el) => {
                                inputRefs.current[index] = el;
                              }}
                              type="text" 
                              maxLength={5}
                              value={digit}
                              onChange={(e) => handleCodeChange(index, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              className="w-[50px] h-[48px] border border-gray-300 rounded-xl text-center text-xl font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {forgotPasswordStep === 3 && (
                  <>
                  <div className="relative mb-4">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-28 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-black transition-colors focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="relative mb-6">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-[140px] text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-black transition-colors focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  </>
                )}

                <button 
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors text-[17px]"
                  onClick={() => {
                    if (forgotPasswordStep === 2) {
                      const enteredCode = twoFACode.join("");
                      if (enteredCode === generatedVerificationCode) {
                        setForgotPasswordStep(3);
                        setPassword("");
                        setConfirmPassword("");
                        setErrorMessage("");
                      } else {
                        setErrorMessage("Invalid verification code. Please try again.");
                      }
                    } else {
                      handleForgotPassword();
                    }
                  }}
                >
                  {forgotPasswordStep === 1 ? "Send Code" : forgotPasswordStep === 2 ? "Verify Code" : "Update Password"}
                </button>
                {errorMessage && (
                  <div className="text-red-500 text-sm text-center mt-3">
                    {errorMessage}
                  </div>
                )}
              </motion.div>
            ) : is2FA ? (
`;

content = content.replace(
  '{is2FA ? (',
  renderLogic
);

// 5. Add "Forgot Password?" button in login view
content = content.replace(
  '{isLogin ? "Sign up" : "Log in"}',
  '{isLogin ? "Sign up" : "Log in"}\n                </button>\n                {isLogin && (\n                  <>\n                    <span className="text-gray-500 mx-2">|</span>\n                    <button \n                      onClick={() => setForgotPasswordStep(1)}\n                      className="font-medium text-black hover:underline focus:outline-none"\n                    >\n                      Forgot Password?\n                    </button>\n                  </>\n                )}'
);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
