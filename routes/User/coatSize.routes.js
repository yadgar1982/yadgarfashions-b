import express from "express";
import { 
    createCoatSize, 
    deleteCoatSize, 
    getAllCoatSize, 
    getAllUserCoatSize, 
    getSizeIdCoatSize, 
    updateCoatSize
} from "../../controllers/User/coatSize.controller.js";
import { isAdminEmployeeOrUser, verifyToken } from "../../middlewares/auth.middleware.js";
const coatSizeRouter = express.Router();

// @route   POST /api/coat-size/create
coatSizeRouter.post('/create', verifyToken,isAdminEmployeeOrUser, createCoatSize);

// @route   PUT /api/coat-size/update
coatSizeRouter.put('/update/:id', verifyToken,isAdminEmployeeOrUser, updateCoatSize);

// @route   GET /api/coat-size/all
coatSizeRouter.get('/all', verifyToken,isAdminEmployeeOrUser, getAllCoatSize);

// @route   GET /api/coat-size/user?userId=userId
coatSizeRouter.get('/user', verifyToken,isAdminEmployeeOrUser, getAllUserCoatSize);

// @route   GET /api/coat-size/size?sizeId=sizeId
coatSizeRouter.get('/size', verifyToken,isAdminEmployeeOrUser, getSizeIdCoatSize);

// @route   DELETE /api/coat-size/delete
coatSizeRouter.delete('/delete/:id', verifyToken,isAdminEmployeeOrUser, deleteCoatSize);

export default coatSizeRouter;
