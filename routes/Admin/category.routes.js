import express from "express";
const categoryRouter = express.Router();
import { 
    createCategory, 
    deleteCategory, 
    getAllCategory, 
    getPaginatedCategory, 
    getSelectedCategoryFields, 
    updateCategory 
} from "../../controllers/Admin/category.controller.js";
import { isAdmin, verifyToken } from "../../middlewares/auth.middleware.js";

// @route   POST /api/category/create
categoryRouter.post('/create', verifyToken, isAdmin, createCategory);

// @route   PUT /api/category/update
categoryRouter.put('/update/:id', verifyToken, isAdmin, updateCategory);

// @route   GET /api/category/all
categoryRouter.get('/all', getAllCategory);

// @route   GET /api/category/all
categoryRouter.get('/pagination', getPaginatedCategory);

// @route   GET /api/category/query
categoryRouter.get('/query', getSelectedCategoryFields);

// @route   DELETE /api/category/delete
categoryRouter.delete('/delete/:id', verifyToken, isAdmin, deleteCategory);

export default categoryRouter;
