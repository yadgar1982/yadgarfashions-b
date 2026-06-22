import express from "express";
const showcaseRouter = express.Router();
import { 
    createShowcase, 
    deleteShowcase, 
    getAllShowcase, 
    getAllShowcaseByCategoryId, 
    getPaginatedShowcase, 
    updateShowcase 
} from "../../controllers/Admin/showcase.controller.js";
import { isAdminOrEmployee, verifyToken } from "../../middlewares/auth.middleware.js";

// @route   POST /api/showcase/create
showcaseRouter.post('/create', verifyToken, isAdminOrEmployee, createShowcase);

// @route   PUT /api/showcase/update
showcaseRouter.put('/update/:id', verifyToken, isAdminOrEmployee, updateShowcase);

// @route   GET /api/showcase/all
showcaseRouter.get('/all', getAllShowcase);

// @route   GET /api/showcase/category/:categoryId
showcaseRouter.get('/category/:categoryId', getAllShowcaseByCategoryId);

// @route   GET /api/showcase/pagination/:categoryId
showcaseRouter.get('/pagination/:categoryId', getPaginatedShowcase);

// @route   DELETE /api/showcase/delete
showcaseRouter.delete('/delete/:id', verifyToken, isAdminOrEmployee, deleteShowcase);

export default showcaseRouter;
