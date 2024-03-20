import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
// For text-and-image input (multimodal), use the gemini-pro-vision model
async function ImageTextRun(path, prompt) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType,
      },
    };
  }
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const imageParts = [fileToGenerativePart(path, "image/png")];
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  return text;
}

export default ImageTextRun;
