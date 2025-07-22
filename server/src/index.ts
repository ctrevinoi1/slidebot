import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { generateQuiz } from "./quizGenerator";

// Load environment variables from the project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

// Configure multer for in-memory storage (we don't need to save files to disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});

app.post("/generate-quiz", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const buffer = req.file.buffer;
    const originalName = req.file.originalname;
    const ext = path.extname(originalName).toLowerCase();

    const quiz = await generateQuiz(buffer, ext);

    res.json({ quiz });
  } catch (error) {
    console.error("Error generating quiz", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

app.get("/health", (_req, res) => res.send("OK"));

app.listen(port, () => {
  console.log(`SlideBot server listening on port ${port}`);
}); 