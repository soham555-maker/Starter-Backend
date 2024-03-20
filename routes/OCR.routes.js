import { Router } from "express";

// Import the controller
import OCR from "../controllers/OCR.controllers.js";    
import upload from "../middleware/multer.js";

// Create an instance of the router
const router = Router();

// Define the routes
router.post("/", upload.single("image"), OCR.getName);

export default router;