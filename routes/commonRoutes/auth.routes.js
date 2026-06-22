import express from "express";
const authRouter = express.Router();
import { getAuth, loginUser,verifyTokenController,updatePasswrod } from "../../controllers/commonControllers/auth.controller.js";

// @route   POST /api/auth/login
authRouter.post("/login", loginUser);

// @route   POST /api/auth/verify-token
authRouter.post("/verify-token", verifyTokenController);
// @route   get /api/auth/:email
authRouter.get("/:email", getAuth);
// @route   put /api/auth/:email
authRouter.put("/:email", updatePasswrod);

export default authRouter;
