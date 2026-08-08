const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

// 1. Add new state for countdown
content = content.replace(
  'const [forgotPasswordStep, setForgotPasswordStep] = useState(0);',
  'const [forgotPasswordStep, setForgotPasswordStep] = useState(0);\n  const [countdown, setCountdown] = useState(0);\n  const [isCodeExpired, setIsCodeExpired] = useState(false);'
);

// 2. Add useEffect for countdown and handleResendCode
const useEffectAndResend = `
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
      await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
`;

content = content.replace(
  'const handleCodeChange = (index: number, value: string) => {',
  useEffectAndResend + '\n  const handleCodeChange = (index: number, value: string) => {'
);

// 3. Set countdown when sending code in handleForgotPassword
content = content.replace(
  'setGeneratedVerificationCode(code);\n      console.log("Forgot Password Code:", code);\n      try {',
  'setGeneratedVerificationCode(code);\n      setCountdown(60);\n      setIsCodeExpired(false);\n      console.log("Forgot Password Code:", code);\n      try {'
);

// 4. Set countdown when sending code in handleSubmit
content = content.replace(
  'setGeneratedVerificationCode(code);\n    \n    try {\n      // Send the code to the user\\'s email via the backend',
  'setGeneratedVerificationCode(code);\n    setCountdown(60);\n    setIsCodeExpired(false);\n    \n    try {\n      // Send the code to the user\\'s email via the backend'
);

// 5. Update verify logic for forgotPasswordStep === 2
content = content.replace(
  'if (enteredCode === generatedVerificationCode) {',
  'if (isCodeExpired) {\n                          setErrorMessage("Verification code has expired. Please resend.");\n                        } else if (enteredCode === generatedVerificationCode) {'
);

// 6. Update verify logic for is2FA
content = content.replace(
  'if (enteredCode === generatedVerificationCode) {\n                          onSignUpSuccess?.(email);\n                        } else {',
  'if (isCodeExpired) {\n                          alert("Verification code has expired. Please resend.");\n                        } else if (enteredCode === generatedVerificationCode) {\n                          onSignUpSuccess?.(email);\n                        } else {'
);

// 7. Add UI for timer/resend in forgotPasswordStep === 2
const forgotPasswordTimerUI = `
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-2 mt-4">
                    {countdown > 0 ? (
                      <p className="text-sm text-gray-500">Code expires in {countdown}s</p>
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
`;
content = content.replace(
  '                        </div>\n                      </div>\n                    </div>\n                  </div>\n                )}',
  forgotPasswordTimerUI + '                )}'
);

// 8. Add UI for timer/resend in is2FA
const is2FATimerUI = `
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-2 mt-4">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-500">Code expires in {countdown}s</p>
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
`;
content = content.replace(
  '                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div className="mt-8 flex flex-col gap-3">',
  is2FATimerUI + '\n                <div className="mt-8 flex flex-col gap-3">'
);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
