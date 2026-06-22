import express from "express";
import { 
    createManyOrders,
    createOrder, 
    getAllOrder, 
    getOrderByStatus, 
    getPaginatedOrders, 
    getUserOrder, 
    updateOrderStatus,
    updateOrder,
    getOrderStatusCounts,
    getOrderBySupplier
} from "../../controllers/User/order.controller.js";
import { isAdminEmployeeOrUser, verifyToken } from "../../middlewares/auth.middleware.js";

const orderRouter = express.Router();

// @route   POST /api/order/create
orderRouter.post('/create',verifyToken,isAdminEmployeeOrUser, createOrder);

// @route   POST /api/order/many
orderRouter.post('/many',verifyToken,isAdminEmployeeOrUser, createManyOrders);

// @route   PUT /api/order/update/:id
orderRouter.put('/update/:id',verifyToken,isAdminEmployeeOrUser, updateOrder);

// @route   PUT /api/order/status/:id
orderRouter.put('/status/:id',verifyToken,isAdminEmployeeOrUser, updateOrderStatus);

// @route   GET /api/order/all
orderRouter.get('/all',verifyToken,isAdminEmployeeOrUser, getAllOrder);

// @route   GET /api/order/status-counts
orderRouter.get("/status-counts", verifyToken,isAdminEmployeeOrUser, getOrderStatusCounts);

// @route   GET /api/order/user?userId=userId
orderRouter.get('/user',verifyToken,isAdminEmployeeOrUser, getUserOrder);

// @route   GET /api/order/user?userId=userId
orderRouter.get('/supplier',verifyToken,isAdminEmployeeOrUser, getOrderBySupplier);

// @route   GET /api/order/status?userId=userId Or status=delivered
orderRouter.get('/status', getOrderByStatus);

// @route   GET /api/order/pagination?page=1&limit=2&status=delivered
orderRouter.get('/pagination', getPaginatedOrders);

export default orderRouter;
