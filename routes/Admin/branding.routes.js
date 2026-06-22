import express from "express";
const brandingRouter = express.Router();
import { createBranding,getBranding, updateBranding } from "../../controllers/Admin/branding.controller.js";
import { isAdmin, verifyToken } from "../../middlewares/auth.middleware.js";

// @route   POST /api/branding/create
brandingRouter.post('/create',verifyToken,isAdmin, createBranding);

// @route   POST /api/branding/update
brandingRouter.put('/update/:id', verifyToken, isAdmin, updateBranding);

// @route   GET /api/branding/get
brandingRouter.get('/get', getBranding);

export default brandingRouter;
