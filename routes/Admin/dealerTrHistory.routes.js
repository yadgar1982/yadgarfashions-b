import express from "express";
import { isAdminOrEmployee, isAdminOrEmployeeOrDealer, verifyToken } from "../../middlewares/auth.middleware.js";
import { 
    createDealerTrHostory,
    getDealerTrHostory
} from "../../controllers/Admin/dealerTrHistory.controller.js";

const dealerTrHistoryRouter = express.Router();

// @route   POST /api/dealer-tr-history/create
dealerTrHistoryRouter.post('/create', verifyToken, isAdminOrEmployee, createDealerTrHostory);

// @route   GET /api/dealer-tr-history/get/:dealerId
dealerTrHistoryRouter.get('/get/:dealerId', verifyToken, isAdminOrEmployeeOrDealer, getDealerTrHostory);

export default dealerTrHistoryRouter;
