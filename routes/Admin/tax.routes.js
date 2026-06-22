import express from "express";
const taxRouter = express.Router();
import { 
    createTax, 
    deleteTax, 
    getAllTax, 
    updateTax,
    getPaginatedTax,
    getSelectedTaxFields

} from "../../controllers/Admin/tax.controller.js";
import { isAdmin, verifyToken } from "../../middlewares/auth.middleware.js";

// @route   POST /api/tax/create
taxRouter.post('/create', verifyToken, isAdmin, createTax);

// @route   PUT /api/tax/update
taxRouter.put('/update/:id', verifyToken, isAdmin, updateTax);

// @route   GET /api/tax/all
taxRouter.get('/all', getAllTax);

// @route   GET /api/tax/query?fields=fields
taxRouter.get('/query', getSelectedTaxFields);

// @route   GET /api/tax/all
taxRouter.get('/pagination', getPaginatedTax);

// @route   DELETE /api/tax/delete
taxRouter.delete('/delete/:id', verifyToken, isAdmin, deleteTax);

export default taxRouter;
