import express from "express";
const menSizeRouter = express.Router();

import { 
    createMenSize, 
    deleteMenSize, 
    getAllMenSize, 
    getAllUserMenSize, 
    getSizeIdMenSize, 
    updateMenSize
} from "../../controllers/User/menSize.controller.js";
import { isAdminEmployeeOrUser, verifyToken } from "../../middlewares/auth.middleware.js";


// @route   POST /api/men-size/create
menSizeRouter.post('/create', verifyToken,isAdminEmployeeOrUser, createMenSize);

// @route   PUT /api/men-size/update/sizeId=sizeId
menSizeRouter.put('/update/:id', verifyToken,isAdminEmployeeOrUser, updateMenSize);

// @route   GET /api/men-size/all
menSizeRouter.get('/all', verifyToken,isAdminEmployeeOrUser, getAllMenSize);

// @route   GET /api/men-size/user?userId=userId
menSizeRouter.get('/user', verifyToken,isAdminEmployeeOrUser, getAllUserMenSize);

// @route   GET /api/men-size/size?sizeId=sizeId
menSizeRouter.get('/size', verifyToken,isAdminEmployeeOrUser, getSizeIdMenSize );

// @route   DELETE /api/men-size/delete/sizeId
menSizeRouter.delete('/delete/:id', deleteMenSize);

export default menSizeRouter;
