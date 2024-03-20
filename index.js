// Import required modules
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import EmployeesRouter from "./routes/Employees.routes.js";
import OCRRouter from "./routes/OCR.routes.js";
import UploadsRouter from "./routes/Uploads.routes.js";

// Load environment variables from the .env file
dotenv.config({ path: "./.env" });

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

// Handles the route for uploads and uses the UploadsRouter
app.use("/uploads", UploadsRouter);
  

export default app;
