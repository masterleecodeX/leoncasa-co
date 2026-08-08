"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const MEDIA_URL =
  "https://cdn.phototourl.com/free/2026-08-02-d4ecf953-4dd8-47a0-9043-284111be4877.png";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 384 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

export function SignUpPage({
  onBack,
  onSignUpSuccess,
  initialIsLogin = false,
}: {
  onBack?: () => void;
  onSignUpSuccess?: (email: string, photoURL?: string | null) => void;
  initialIsLogin?: boolean;
}) {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [is2FA, setIs2FA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [twoFACode, setTwoFACode] = useState(["", "", "", "", ""]);
  const [generatedVerificationCode, setGeneratedVerificationCode] =
    useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && (is2FA || forgotPasswordStep === 2)) {
      setIsCodeExpired(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, is2FA, forgotPasswordStep]);

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      const code = Math.floor(10000 + Math.random() * 90000).toString();
      setGeneratedVerificationCode(code);
      setCountdown(60);
      setIsCodeExpired(false);
      setErrorMessage("");
      await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    // only allow digits (optional, but good practice)
    const sanitizedValue = value.replace(/\D/g, "");

    if (sanitizedValue.length > 1) {
      // Handle paste or multiple chars (optional but good)
      const newCode = [...twoFACode];
      for (let i = 0; i < sanitizedValue.length && index + i < 5; i++) {
        newCode[index + i] = sanitizedValue[i];
      }
      setTwoFACode(newCode);
      const nextIndex = Math.min(index + sanitizedValue.length, 4);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newCode = [...twoFACode];
    newCode[index] = sanitizedValue;
    setTwoFACode(newCode);

    if (sanitizedValue && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !twoFACode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleForgotPassword = async () => {
    if (forgotPasswordStep === 1) {
      if (!email) {
        setErrorMessage("Please enter your email.");
        return;
      }
      const usersStr = localStorage.getItem("users");
      const users = usersStr ? JSON.parse(usersStr) : [];
      const user = users.find((u: any) => u.email === email);
      if (!user) {
        setErrorMessage("Account not found.");
        return;
      }
      setErrorMessage("");
      const code = Math.floor(10000 + Math.random() * 90000).toString();
      setGeneratedVerificationCode(code);
      setCountdown(60);
      setIsCodeExpired(false);
      console.log("Forgot Password Code:", code);
      try {
        await fetch("/api/send-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        });
      } catch (err) {}
      setForgotPasswordStep(2);
    } else if (forgotPasswordStep === 3) {
      if (!password || password !== confirmPassword) {
        setErrorMessage("Passwords do not match or are empty.");
        return;
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
      if (!passwordRegex.test(password)) {
        setErrorMessage(
          "Password must be at least 8 characters and contain at least one uppercase letter, one number, and one special character.",
        );
        return;
      }

      const hashPassword = async (pwd: string) => {
        const msgUint8 = new TextEncoder().encode(pwd);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      };

      const usersStr = localStorage.getItem("users");
      const users = usersStr ? JSON.parse(usersStr) : [];
      const userIndex = users.findIndex((u: any) => u.email === email);
      if (userIndex > -1) {
        const hashedPassword = await hashPassword(password);
        users[userIndex].password = hashedPassword;
        localStorage.setItem("users", JSON.stringify(users));
        setErrorMessage("");
        setForgotPasswordStep(0);
        setIsLogin(true);
      }
    }
  };

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setErrorMessage("");

    try {
      const { auth } = await import("@/lib/firebase");
      const {
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        updateProfile,
      } = await import("firebase/auth");

      if (isLogin) {
        if (!email || !password) {
          setErrorMessage("Please fill in all fields.");
          return;
        }
        if (!emailRegex.test(email)) {
          setErrorMessage("Please enter a valid email address.");
          return;
        }

        await signInWithEmailAndPassword(auth, email, password);
        onSignUpSuccess?.(email, auth.currentUser?.photoURL || undefined);
      } else {
        if (
          !firstName ||
          !lastName ||
          !email ||
          !password ||
          !confirmPassword
        ) {
          setErrorMessage("Please fill in all fields.");
          return;
        }
        if (!emailRegex.test(email)) {
          setErrorMessage("Please enter a valid email address.");
          return;
        }
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }
        if (!agreedToTerms) {
          setErrorMessage(
            "You must agree to the Terms and Services and Privacy Policy.",
          );
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        });
        onSignUpSuccess?.(email, userCredential.user.photoURL || undefined);
      }
    } catch (e: any) {
      console.error(e);
      if (e.code === "auth/email-already-in-use") {
        setErrorMessage("An account with this email already exists.");
      } else if (e.code === "auth/invalid-credential") {
        setErrorMessage("Incorrect email or password.");
      } else if (e.code === "auth/weak-password") {
        setErrorMessage("Password is too weak. Must be at least 6 characters.");
      } else {
        setErrorMessage(e.message || "An error occurred.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { auth } = await import("@/lib/firebase");
      const { GoogleAuthProvider, signInWithPopup } =
        await import("firebase/auth");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      onSignUpSuccess?.(
        result.user.email || "",
        result.user.photoURL || undefined,
      );
    } catch (e: any) {
      console.error(e);
      setErrorMessage(e.message || "An error occurred with Google Sign In.");
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-white font-sans text-black">
      {/* Left Section */}
      <div className="hidden md:flex md:w-1/2 bg-black text-white flex-col justify-between p-8 relative overflow-hidden">
        {(onBack || is2FA || forgotPasswordStep > 0) && (
          <button
            onClick={() => {
              if (forgotPasswordStep > 0) {
                setForgotPasswordStep(0);
              } else if (is2FA) {
                setIs2FA(false);
              } else {
                onBack?.();
              }
            }}
            className="absolute top-8 left-8 flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {is2FA || forgotPasswordStep > 0 ? "Back" : "Home"}
          </button>
        )}

        <div className="flex justify-center items-center mt-6 z-10">
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 22h20L12 2z" />
          </svg>
          <span className="font-medium tracking-wide">Platform</span>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto w-full z-10 mt-12">
          {/* Mock image area */}
          <div className="w-full relative aspect-square max-h-[300px] mb-8">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30"></div>

            <img
              src={MEDIA_URL}
              alt="Creative workspace"
              className="w-full h-full object-cover p-2 rounded-lg"
            />
          </div>

          <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 mb-8 backdrop-blur-sm relative">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="text-white font-semibold">/imagine</span> private
              in a bot channel, 8k in the style of a painting, realism, Romantic
              style, a beautiful Swedish summer with a field of daisies a young
              blond Nordic woman in a white Romantic dress she is blocking the
              flowers, sunny summer day, intense beautiful colors
            </p>
            <button className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <h2 className="text-xl md:text-2xl font-medium text-center leading-snug">
            A creative workspace for
            <br />
            visionaries and builders
          </h2>

          <div className="flex gap-2 mt-8">
            <div className="w-8 h-1 bg-white rounded-full"></div>
            <div className="w-2 h-1 bg-white/30 rounded-full"></div>
            <div className="w-2 h-1 bg-white/30 rounded-full"></div>
            <div className="w-2 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative overflow-y-auto">
        {(onBack || is2FA || forgotPasswordStep > 0) && ( // For mobile when no left section
          <button
            onClick={() => {
              if (forgotPasswordStep > 0) {
                setForgotPasswordStep(0);
              } else if (is2FA) {
                setIs2FA(false);
              } else {
                onBack?.();
              }
            }}
            className="md:hidden absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors z-20"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {is2FA || forgotPasswordStep > 0 ? "Back" : "Home"}
          </button>
        )}

        <div className="w-full max-w-[480px] mx-auto pt-12 md:pt-0">
          <AnimatePresence mode="wait" initial={false}>
            {forgotPasswordStep > 0 ? (
              <motion.div
                key="forgot-password"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                <div className="flex flex-col items-center mb-6">
                  <h1 className="text-[28px] font-medium text-center mb-2 tracking-tight text-black">
                    {forgotPasswordStep === 1
                      ? "Reset Password"
                      : forgotPasswordStep === 2
                        ? "Verify Code"
                        : "New Password"}
                  </h1>
                  <p className="text-gray-500 text-[15px] text-center">
                    {forgotPasswordStep === 1
                      ? "Enter your email to receive a reset code."
                      : forgotPasswordStep === 2
                        ? "Enter the verification code sent to your email."
                        : "Enter your new password."}
                  </p>
                </div>

                {forgotPasswordStep === 1 && (
                  <div className="relative mb-6">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                    />
                  </div>
                )}

                {forgotPasswordStep === 2 && (
                  <>
                    <div className="space-y-6 relative mb-6">
                      <div className="flex gap-4 relative">
                        <div className="w-full">
                          <div className="flex gap-2 sm:gap-3 justify-center">
                            {twoFACode.map((digit, index) => (
                              <input
                                key={index}
                                ref={(el) => {
                                  inputRefs.current[index] = el;
                                }}
                                type="text"
                                maxLength={5}
                                value={digit}
                                onChange={(e) =>
                                  handleCodeChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-10 h-12 sm:w-[50px] sm:h-[48px] border border-gray-300 rounded-xl text-center text-lg sm:text-xl font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-6 mb-6">
                      {countdown > 0 ? (
                        <p className="text-sm text-gray-500">
                          Code expires in {countdown}s
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendCode}
                          disabled={isLoading}
                          className="text-sm text-black underline font-medium focus:outline-none disabled:opacity-50"
                        >
                          Resend Code
                        </button>
                      )}
                    </div>
                  </>
                )}

                {forgotPasswordStep === 3 && (
                  <>
                    <div className="relative mb-4">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-black transition-colors focus:outline-none"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="relative mb-6">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-gray-400 hover:text-black transition-colors focus:outline-none"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <button
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors text-[17px] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  onClick={async () => {
                    if (isLoading) return;
                    setIsLoading(true);
                    try {
                      if (forgotPasswordStep === 2) {
                        const enteredCode = twoFACode.join("");
                        if (isCodeExpired) {
                          setErrorMessage(
                            "Verification code has expired. Please resend.",
                          );
                        } else if (enteredCode === generatedVerificationCode) {
                          setForgotPasswordStep(3);
                          setPassword("");
                          setConfirmPassword("");
                          setErrorMessage("");
                        } else {
                          setErrorMessage(
                            "Invalid verification code. Please try again.",
                          );
                        }
                      } else {
                        await handleForgotPassword();
                      }
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  {isLoading
                    ? "Loading..."
                    : forgotPasswordStep === 1
                      ? "Send Code"
                      : forgotPasswordStep === 2
                        ? "Verify Code"
                        : "Update Password"}
                </button>
                {errorMessage && (
                  <div className="text-red-500 text-sm text-center mt-3">
                    {errorMessage}
                  </div>
                )}
              </motion.div>
            ) : is2FA ? (
              <motion.div
                key="2fa"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                <div className="flex flex-col items-center mb-6">
                  <h1 className="text-[28px] font-medium text-center mb-2 tracking-tight text-black">
                    Enable Authentication
                  </h1>
                  <p className="text-gray-500 text-[15px] text-center">
                    Secure your account with an additional layer of protection.
                  </p>
                </div>

                <div className="border-t border-gray-200 mb-6 w-full max-w-[400px] mx-auto"></div>

                <div className="space-y-6 relative">
                  <div className="flex gap-4 relative">
                    <div className="w-full">
                      <h3 className="font-medium text-black text-base mb-1">
                        Verify your email
                      </h3>
                      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        We've sent a verification code to{" "}
                        <span className="font-medium text-black">
                          {email || "your email"}
                        </span>
                        . Please enter it below.
                      </p>
                      <div className="flex gap-2 sm:gap-3 justify-center">
                        {twoFACode.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              inputRefs.current[index] = el;
                            }}
                            type="text"
                            maxLength={5} // Allow multiple characters for pasting
                            value={digit}
                            onChange={(e) =>
                              handleCodeChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-10 h-12 sm:w-[50px] sm:h-[48px] border border-gray-300 rounded-xl text-center text-lg sm:text-xl font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6 -mb-2">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-500">
                      Code expires in {countdown}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={isLoading}
                      className="text-sm text-black underline font-medium focus:outline-none disabled:opacity-50"
                    >
                      Resend Code
                    </button>
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors text-[17px] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={() => {
                      if (isLoading) return;
                      setIsLoading(true);
                      try {
                        const enteredCode = twoFACode.join("");
                        if (isCodeExpired) {
                          alert(
                            "Verification code has expired. Please resend.",
                          );
                        } else if (enteredCode === generatedVerificationCode) {
                          onSignUpSuccess?.(email);
                        } else {
                          alert("Invalid verification code. Please try again.");
                        }
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                  >
                    {isLoading ? "Loading..." : "Verify & Continue"}
                  </button>
                  {errorMessage && (
                    <div className="text-red-500 text-sm text-center">
                      {errorMessage}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                <>
                  <h1 className="text-4xl sm:text-[44px] font-semibold text-center mb-10 tracking-tight text-black">
                    {isLogin ? "Welcome back" : "Create an account"}
                  </h1>

                  <div className="flex flex-col gap-3 mb-8">
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="flex items-center justify-center gap-3 w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[15px] font-medium text-black"
                    >
                      <GoogleIcon className="w-5 h-5" />
                      {isLogin ? "Sign in with Google" : "Sign up with Google"}
                    </button>
                    <button className="flex items-center justify-center gap-3 w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[15px] font-medium text-black">
                      <AppleIcon className="w-5 h-5" />
                      {isLogin ? "Sign in with Apple" : "Sign up with Apple"}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-sm text-gray-400 lowercase">or</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </div>

                  {!isLogin && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) =>
                            setFirstName(e.target.value.replace(/\d/g, ""))
                          }
                          className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) =>
                            setLastName(e.target.value.replace(/\d/g, ""))
                          }
                          className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                        />
                      </div>
                    </div>
                  )}

                  <div className="relative mb-4">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                    />
                  </div>

                  <div className={`relative ${isLogin ? "mb-6" : "mb-4"}`}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-black transition-colors focus:outline-none"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="relative mb-6">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-gray-400 hover:text-black transition-colors focus:outline-none"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="space-y-4 mb-8">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="mt-0.5 relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="peer appearance-none w-5 h-5 border border-gray-300 rounded-md checked:bg-black checked:border-black transition-colors cursor-pointer"
                          />
                          <svg
                            className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-500 leading-snug">
                          I don't want to receive emails about new feature
                          updates
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="mt-0.5 relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="peer appearance-none w-5 h-5 border border-gray-300 rounded-md checked:bg-black checked:border-black transition-colors cursor-pointer"
                          />
                          <svg
                            className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-500 leading-snug">
                          By creating an account, you agree to our{" "}
                          <a
                            href="#"
                            className="underline hover:text-black transition-colors"
                          >
                            Terms and Services
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="underline hover:text-black transition-colors"
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  )}

                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          marginBottom: 24,
                        }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-2 gap-2 sm:gap-0 border border-red-500/30 rounded-xl sm:rounded-full bg-red-500/10 p-2 sm:p-0.5 text-sm text-red-500 mx-auto w-full max-w-full">
                          <div className="flex items-center space-x-1 bg-red-500 text-white border border-red-500/30 rounded-2xl px-2.5 py-0.5 shrink-0">
                            <svg
                              width="16"
                              height="14"
                              viewBox="0 0 20 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 6.5v3.334m0 3.333h.008M8.575 2.217 1.516 14a1.666 1.666 0 0 0 1.425 2.5h14.117a1.667 1.667 0 0 0 1.425-2.5L11.425 2.217a1.667 1.667 0 0 0-2.85 0"
                                stroke="#fff"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="whitespace-nowrap">Action failed!</p>
                          </div>
                          <p className="sm:pr-2.5 flex-1 text-center sm:text-left leading-snug">
                            {errorMessage}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2.5 rounded-md transition-colors mb-6 text-[17px] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={async () => {
                      if (isLoading) return;
                      setIsLoading(true);
                      try {
                        await handleSubmit();
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                  >
                    {isLoading ? "Loading..." : "Submit"}
                  </button>

                  <div className="text-center text-base">
                    <span className="text-gray-500">
                      {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    </span>
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="font-medium text-black hover:underline focus:outline-none"
                    >
                      {isLogin ? "Sign up" : "Log in"}
                    </button>
                    {isLogin && (
                      <>
                        <span className="text-gray-500 mx-2">|</span>
                        <button
                          onClick={() => setForgotPasswordStep(1)}
                          className="font-medium text-black hover:underline focus:outline-none"
                        >
                          Forgot Password?
                        </button>
                      </>
                    )}
                  </div>
                </>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
