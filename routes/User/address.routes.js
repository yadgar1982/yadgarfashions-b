import express from "express";
import { 
    createAddress, 
    deleteAddress, 
    getAllAddress, 
    getAllUserAddress, 
    updateAddress
} from "../../controllers/User/address.controller.js";
import { isUser, verifyToken } from "../../middlewares/auth.middleware.js";
const addressRouter = express.Router();


// @route   POST /api/address/create
addressRouter.post('/create', verifyToken,isUser, createAddress);

// @route   PUT /api/address/update
addressRouter.put('/update/:id', verifyToken,isUser, updateAddress);

// @route   GET /api/address/all
addressRouter.get('/all', getAllAddress);

// @route   GET /api/address/user?userId=userId
addressRouter.get('/user', verifyToken,isUser, getAllUserAddress);

// @route   DELETE /api/address/delete
addressRouter.delete('/delete/:id', verifyToken,isUser, deleteAddress);

export default addressRouter;
