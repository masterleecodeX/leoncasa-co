const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

const target1 = `                <button 
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
                </button>`;

const replacement1 = `                <button 
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors text-[17px] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  onClick={async () => {
                    if (isLoading) return;
                    setIsLoading(true);
                    try {
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
                        await handleForgotPassword();
                      }
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  {isLoading ? "Loading..." : forgotPasswordStep === 1 ? "Send Code" : forgotPasswordStep === 2 ? "Verify Code" : "Update Password"}
                </button>`;

content = content.replace(target1, replacement1);

const target2 = `              <button 
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2.5 rounded-md transition-colors mb-6 text-[17px]"
                onClick={handleSubmit}
              >
                Submit
              </button>`;

const replacement2 = `              <button 
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
              </button>`;

content = content.replace(target2, replacement2);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
