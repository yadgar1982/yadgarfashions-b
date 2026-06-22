import express from "express";
import { 
    createRating, 
    getAllRatings,
    getRatingsByProductId
} from "../../controllers/User/rating.controller.js";
import { isAdminEmployeeOrUser, verifyToken } from "../../middlewares/auth.middleware.js";
const ratingRouter = express.Router();

// @route   POST /api/rating/create
ratingRouter.post('/create',verifyToken,isAdminEmployeeOrUser, createRating);

// @route   GET /api/rating/all
ratingRouter.get('/all',verifyToken,isAdminEmployeeOrUser, getAllRatings);

// @route   GET /api/rating//product/:productId
ratingRouter.get('/product/:productId',verifyToken,isAdminEmployeeOrUser, getRatingsByProductId);

// @route   PUT /api/rating/update
//ratingRouter.put('/update/:id', updateCoatSize);

// @route   DELETE /api/rating/delete
//ratingRouter.delete('/delete/:id', deleteCoatSize);

export default ratingRouter;
