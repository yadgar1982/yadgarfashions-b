import express from "express";
import { 
    sendEmailOnCancel,
    sendEmailOnRegister,
    sendOTPOnEmail,
    sendEmailForRating,
    sendOTPOnEmailChange,
    //sendEmailOnOrder
} from "../../services/sendEmail.service.js";
const emailRouter = express.Router();

// @route   POST /api/send-email/otp
emailRouter.post("/otp", sendOTPOnEmail);

// @route   POST /api/send-email/order
//emailRouter.post("/order", sendEmailOnOrder);

// @route   POST /api/send-email/otp/change
emailRouter.post("/otp/change", sendOTPOnEmailChange);

// @route   POST /api/send-email/register
emailRouter.post("/register", sendEmailOnRegister);

// @route   POST /api/send-email/cancel
emailRouter.post("/cancel", sendEmailOnCancel);

// @route   POST /api/send-email/rating
emailRouter.post("/rating", sendEmailForRating);

export default emailRouter;
