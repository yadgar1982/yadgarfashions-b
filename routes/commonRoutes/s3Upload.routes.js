import express from "express";
import multer from "multer";
import { isAdminOrEmployee, verifyToken } from "../../middlewares/auth.middleware.js";
import { uploadFile } from "../../controllers/commonControllers/s3Upload.controller.js";

const s3Router = express.Router();

const upload = multer({storage:multer.memoryStorage()});

s3Router.post("/upload",verifyToken,isAdminOrEmployee,upload.single("file"),uploadFile);

export default s3Router;