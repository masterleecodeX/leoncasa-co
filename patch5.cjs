const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

// 1. handleForgotPassword
content = content.replace(
  'const handleForgotPassword = async () => {',
  'const handleForgotPassword = async () => {\n    setIsLoading(true);\n    try {'
);

content = content.replace(
  'setForgotPasswordStep(2);\n    } else if (forgotPasswordStep === 3) {',
  'setForgotPasswordStep(2);\n    } finally {\n      setIsLoading(false);\n    }\n    } else if (forgotPasswordStep === 3) {'
);

content = content.replace(
  'setForgotPasswordStep(0);\n        setIsLogin(true);\n      }\n    }\n  };',
  'setForgotPasswordStep(0);\n        setIsLogin(true);\n      }\n      setIsLoading(false);\n    }\n  };'
);

// We need to carefully handle early returns.
