import express from "express";
import { 
    createCurrency,
    deleteCurrency, 
    getAllCurrency, 
    getPaginatedCurrency, 
    updateCurrency 
} from "../../controllers/Admin/currency.controller.js";
import { isAdmin, verifyToken } from "../../middlewares/auth.middleware.js";

const currencyRouter = express.Router();

// @route   POST /api/currency/create
currencyRouter.post('/create', verifyToken, isAdmin, createCurrency);

// @route   PUT /api/currency/update
currencyRouter.put('/update/:id', verifyToken, isAdmin, updateCurrency);

// @route   GET /api/currency/all
currencyRouter.get('/all', getAllCurrency);

// @route   GET /api/currency/all
currencyRouter.get('/pagination', getPaginatedCurrency);

// @route   DELETE /api/currency/delete
currencyRouter.delete('/delete/:id', verifyToken, isAdmin, deleteCurrency);

export default currencyRouter;
