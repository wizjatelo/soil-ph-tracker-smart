import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const phReport = async (req, res) => {
  const googleApi = process.env.GEMINI_API_KEY;

  if (!req.file) {
    return res.status(400).json({ status: false, message: "No image provided" });
  }

  try {
    // Convert file to Base64
    const base64Data = fs.readFileSync(req.file.path, { encoding: "base64" });

    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: req.file.mimetype,
        },
      },
    ];

    const prompt = `Analyze this soil image and return JSON:
      {
        "soiltype": "type of soil",
        "phValue": "estimated pH value",
        "confidence": confidence level (0-1)
      }`;

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(googleApi);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Send request to Gemini AI
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();

    try {
      const parsedResult = JSON.parse(text.trim());

      if (parsedResult.soiltype && parsedResult.phValue && parsedResult.confidence) {
        return res.status(200).json({
          status: true,
          data: parsedResult,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Invalid AI response",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Failed to process AI response",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
