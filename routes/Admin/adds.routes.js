import express from "express";
const addRouter = express.Router();
import { 
    createAdd,
    deleteAdd,
    getAdd,
    updateAdd,
} from "../../controllers/Admin/adds.controller.js";
import { isAdmin, verifyToken } from "../../middlewares/auth.middleware.js";

// @route   POST /api/adds/create
addRouter.post('/create', verifyToken, isAdmin, createAdd);

// @route   PUT /api/adds/update
addRouter.put('/update/:id', verifyToken, isAdmin, updateAdd);

// @route   GET /api/adds/all
addRouter.get('/all', getAdd);



// @route   DELETE /api/adds/delete
addRouter.delete('/delete/:id', verifyToken, isAdmin, deleteAdd);

export default addRouter;
