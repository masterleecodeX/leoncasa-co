import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API route to send verification code
  app.post("/api/send-code", async (req, res) => {
    try {
      const { email, code } = req.body;
      
      if (!email || !code) {
        return res.status(400).json({ error: "Email and code are required" });
      }

      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        // If no API key, log the code to console for development
        console.warn("RESEND_API_KEY is not set. Email not sent. Code is:", code);
        return res.status(200).json({ success: true, message: "Code logged to console (API key missing)" });
      }

      const resend = new Resend(resendApiKey);

      const { data, error } = await resend.emails.send({
        from: 'noreply@leoncasa.com',
        to: email,
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <p>Thank you for registering on our website!</p>
            <p>Your verification code is: <strong style="font-size: 18px;">${code}</strong></p>
          </div>
        `
      });

      if (error) {
        console.error("Resend API Error:", error);
        return res.status(400).json({ error: error.message || "Validation error" });
      }

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
