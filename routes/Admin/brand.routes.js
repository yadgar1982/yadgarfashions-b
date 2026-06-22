import express from "express";
const brandRouter = express.Router();
import { 
    createBrand,
    deleteBrand,
    getAllBrand,
    getPaginatedBrands,
    getSelectedBrandsFields,
    updateBrand,
} from "../../controllers/Admin/brand.controller.js";
import { isAdmin, verifyToken } from "../../middlewares/auth.middleware.js";

// @route   POST /api/brand/create
brandRouter.post('/create', verifyToken, isAdmin, createBrand);

// @route   PUT /api/brand/update
brandRouter.put('/update/:id', verifyToken, isAdmin, updateBrand);

// @route   GET /api/brand/all
brandRouter.get('/all', getAllBrand);

// @route   GET /api/brand/query/:categoryId?fields=fields
brandRouter.get('/query/:categoryId', getSelectedBrandsFields);

// @route   GET /api/brand/pagination/:categoryId?page=1&limi=10
brandRouter.get('/pagination/:categoryId', getPaginatedBrands);

// @route   DELETE /api/brand/delete
brandRouter.delete('/delete/:id', verifyToken, isAdmin, deleteBrand);

export default brandRouter;
