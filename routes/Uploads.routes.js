import { Router } from "express";
import upload from "../middleware/multer.js";
import { uploadImage } from "../controllers/Uploads.controllers.js";

const UploadsRouter = Router();

UploadsRouter.post("/", upload.single("image"), uploadImage);

export default UploadsRouter;