import express from "express";
const cartRouter = express.Router();
import { 
    countUserCart,
    createCart, 
    deleteCart, 
    deleteManyCart, 
    getAllCart, 
    getAllUserCart, 
    updateCart
} from "../../controllers/User/cart.controller.js";
import { isUser, verifyToken } from "../../middlewares/auth.middleware.js";

// @route   POST /api/cart/create
cartRouter.post('/create', verifyToken,isUser, createCart);

// @route   PUT /api/cart/update
cartRouter.put('/update/:id', verifyToken,isUser, updateCart);

// @route   GET /api/cart/all
cartRouter.get('/all', verifyToken,isUser, getAllCart);

// @route   GET /api/cart/user?userId=userId
cartRouter.get('/user', verifyToken,isUser, getAllUserCart);

// @route   GET /api/cart/user?userId=userId
cartRouter.get('/count', verifyToken,isUser, countUserCart);

// @route   DELETE /api/cart/delete
cartRouter.delete('/delete/:id', deleteCart);

// @route   DELETE /api/cart/delete/many
cartRouter.delete('/delete/many/:userId', deleteManyCart);

export default cartRouter;
