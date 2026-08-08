const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

const target = `                   <button 
                    className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors text-[17px]"
                    onClick={() => {
                      const enteredCode = twoFACode.join("");
                      if (enteredCode === generatedVerificationCode) {
                        onSignUpSuccess?.(email);
                      } else {
                        alert("Invalid verification code. Please try again.");
                      }
                    }}
                  >
                    Verify & Continue
                  </button>`;

const replacement = `                   <button 
                    className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors text-[17px] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={() => {
                      if (isLoading) return;
                      setIsLoading(true);
                      try {
                        const enteredCode = twoFACode.join("");
                        if (enteredCode === generatedVerificationCode) {
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
                  </button>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
