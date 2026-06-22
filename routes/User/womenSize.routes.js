import express from "express";
import { 
    createWomenSize, 
    deleteWomenSize, 
    getAllUserWomenSize, 
    getAllWomenSize, 
    getSizeIdWomenSize, 
    updateWomenSize 
} from "../../controllers/User/womenSize.controller.js";
import { isAdminEmployeeOrUser, verifyToken } from "../../middlewares/auth.middleware.js";

const womenSizeRouter = express.Router();


// @route   POST /api/women-size/create
womenSizeRouter.post('/create', verifyToken,isAdminEmployeeOrUser, createWomenSize);

// @route   PUT /api/women-size/update/sizeId=sizeId
womenSizeRouter.put('/update/:id', verifyToken,isAdminEmployeeOrUser, updateWomenSize);

// @route   GET /api/women-size/all
womenSizeRouter.get('/all', verifyToken,isAdminEmployeeOrUser, getAllWomenSize);

// @route   GET /api/women-size/user?userId=userId
womenSizeRouter.get('/user', verifyToken,isAdminEmployeeOrUser, getAllUserWomenSize);

// @route   GET /api/women-size/size?sizeId=sizeId
womenSizeRouter.get('/size', verifyToken,isAdminEmployeeOrUser, getSizeIdWomenSize);

// @route   DELETE /api/women-size/delete/sizeId
womenSizeRouter.delete('/delete/:id', verifyToken,isAdminEmployeeOrUser, deleteWomenSize);

export default womenSizeRouter;
