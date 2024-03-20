// Import required modules
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import EmployeesRouter from "./routes/Employees.routes.js";
import OCRRouter from "./routes/OCR.routes.js";
import upload from "./middleware/multer.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

// Load environment variables from the .env file
dotenv.config({ path: "./.env" });
const genAI = new GoogleGenerativeAI("AIzaSyCLYM0kmGiMn70ME1I-FqvKXDxTTGR-pOQ");

// Create an instance of Express
const app = express();
// Middleware to allow cross-origin requests
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
// Middleware to parse the request body as JSON
app.use(express.json({limit: "32kb", extended: true}));
// Middleware to parse cookies from the request
app.use(cookieParser());
// Middleware to parse the request body as URL encoded data
app.use(express.urlencoded({ extended: true, limit: "32kb"}));
// Middleware to serve static files
app.use(express.static("public"));
// Set the port for the server
const port = process.env.PORT || 3000;
// Connect to the database
connectDB()
  .then(() => {
    //  Starts the server and listens on the specified port
    app.listen(port, () => {
      console.log(`Server is running on [http://localhost:${port}/]`);
    });
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!!", error);
  });
// Handles the root route and sends a response with "Hello, World!"
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// handles the route for comments and sends a response with a list of comments
app.get("/comments", (req, res) => {
  res.send("List of comments");
});

// Handles the route for employees and uses the EmployeesRouter
app.use("/employees", EmployeesRouter);

// Handles the route for image testing and uses the ImageTestingRouter
app.use("/OCR", OCRRouter);

app.post("/upload", upload.single("image"), async (req, res) => { 
  console.log({"hfjk": req.file.path})
  function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType,
      },
    };
  }
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  
    const prompt = "explain the image.";
  
    const imageParts = [
      fileToGenerativePart(req.file.path, "image/png")
    ];
  
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  res.send(text);
}
);

  

export default app;
