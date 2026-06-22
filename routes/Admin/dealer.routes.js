import express from "express";
import { 
    createDealer, 
    deleteDealer, 
    getAllDealer, 
    getPaginatedDealer, 
    updateDealer,
    updateDealerStatus,
    getSelectedDealerFields,
    getDealerById
} from "../../controllers/Admin/dealer.controller.js";
import { isAdminOrEmployee, verifyToken } from "../../middlewares/auth.middleware.js";

const dealerRouter = express.Router();

// @route   POST /api/dealer/create
dealerRouter.post('/create', verifyToken, isAdminOrEmployee, createDealer);

// @route   PUT /api/dealer/update
dealerRouter.put('/update/:id', verifyToken, isAdminOrEmployee, updateDealer);

// @route   PUT /api/dealer/status
dealerRouter.put('/status/:id', verifyToken, isAdminOrEmployee, updateDealerStatus);

// @route   POST /api/dealer/get/:id
dealerRouter.get('/get/:id',verifyToken,isAdminOrEmployee, getDealerById);

// @route   GET /api/dealer/all
dealerRouter.get('/all', getAllDealer);

// @route   GET /api/dealer/query?fields=fields
dealerRouter.get('/query', getSelectedDealerFields);

// @route   GET /api/dealer/all
dealerRouter.get('/pagination', getPaginatedDealer);

// @route   DELETE /api/dealer/delete
dealerRouter.delete('/delete/:id', verifyToken, isAdminOrEmployee, deleteDealer);

export default dealerRouter;
