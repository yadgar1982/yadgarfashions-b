import express from "express";
const userRouter = express.Router();

import { 
    createUser,
    getPaginatedUsers,
    getUserById,
    updateUserStatus, 
} from "../../controllers/User/user.controller.js";
import { isAdminEmployeeOrUser, verifyToken } from "../../middlewares/auth.middleware.js";

// @route   POST /api/user/create
userRouter.post('/create', createUser);

// @route   POST /api/user/id/:id
userRouter.get('/id/:id',verifyToken,isAdminEmployeeOrUser, getUserById);

// @route   PUT /api/user/status
userRouter.put('/status/:id',verifyToken,isAdminEmployeeOrUser, updateUserStatus);

// @route   GET /api/user/all
userRouter.get('/pagination',verifyToken,isAdminEmployeeOrUser, getPaginatedUsers);

export default userRouter;
