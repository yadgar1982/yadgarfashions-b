// route code
import express from "express";
const stripeRouter = express.Router();
import { createCheckoutSession } from "../../controllers/commonControllers/payment.controller.js";
import { isAdminEmployeeOrUser, verifyToken } from "../../middlewares/auth.middleware.js";


// @route POST /api/stripe/create-checkout-session
stripeRouter.post("/create-checkout-session", verifyToken, isAdminEmployeeOrUser, createCheckoutSession);

export default stripeRouter;
