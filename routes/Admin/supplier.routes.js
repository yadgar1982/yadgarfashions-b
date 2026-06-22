import express from "express";
const supplierRouter = express.Router();
import { 
    createSupplier,
    updateSupplier,
    getAllSupplier,
    getPaginatedSuppliers,
    deleteSupplier,
    updateSupplierStatus, 
    getSelectedSupplierFields,
    getSupplierById
} from "../../controllers/Admin/supplier.controller.js";
import { isAdmin, isAdminOrEmployee, verifyToken } from "../../middlewares/auth.middleware.js";

// @route   POST /api/supplier/create
supplierRouter.post('/create', verifyToken, isAdminOrEmployee, createSupplier);

// @route   PUT /api/supplier/update
supplierRouter.put('/update/:id', verifyToken, isAdminOrEmployee, updateSupplier);

// @route   PUT /api/supplier/status
supplierRouter.put('/status/:id', verifyToken, isAdminOrEmployee, updateSupplierStatus);

// @route   GET /api/supplier/all
supplierRouter.get('/all', getAllSupplier);

// @route   GET /api/supplier/id/:supplierId
supplierRouter.get('/id/:supplierId',verifyToken, isAdminOrEmployee, getSupplierById);

// @route   GET /api/supplier/query?fields=fields
supplierRouter.get('/query', getSelectedSupplierFields);

// @route   GET /api/supplier/all
supplierRouter.get('/pagination', getPaginatedSuppliers);

// @route   DELETE /api/supplier/delete
supplierRouter.delete('/delete/:id', verifyToken, isAdminOrEmployee, deleteSupplier);

export default supplierRouter;
