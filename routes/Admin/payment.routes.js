import express from "express";
import { 
    createPayment,
    updatePayment,
    deletePayment,
    getPayments,
    getPaymentsById,
    getPaginatedPayment
} from "../../controllers/Admin/payment.controller.js";
import { isAdminOrEmployee, verifyToken,isAdminOrEmployeeOrDealer } from "../../middlewares/auth.middleware.js";

const paymentRouter = express.Router();

// @route   POST /api/payment/create
paymentRouter.post('/create', verifyToken, isAdminOrEmployeeOrDealer, createPayment);

// @route   PUT /api/payment/update
paymentRouter.put('/update/:id', verifyToken, isAdminOrEmployeeOrDealer, updatePayment);


// @route   GET /api/payment/get/:id
paymentRouter.get('/get/:id',verifyToken,isAdminOrEmployeeOrDealer, getPaymentsById);

// @route   GET /api/payment/all
paymentRouter.get('/all', getPayments);

// @route   GET /api/payment/query?fields=fields
// paymentRouter.get('/query', getSelectedDealerFields);

// @route   GET /api/payment/all
paymentRouter.get('/pagination', getPaginatedPayment);

// @route   DELETE /api/payment/delete
paymentRouter.delete('/delete/:id', verifyToken, isAdminOrEmployee, deletePayment);

export default paymentRouter;
