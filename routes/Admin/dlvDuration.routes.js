import express from "express";
const dlvDurationRouter = express.Router();
import { 
    createDlvDuration, 
    deleteDlvDuration, 
    getAllDlvDuration, 
    getPaginatedDlvDuration, 
    updateDlvDuration,
    getCountryDlvDuration 
} from "../../controllers/Admin/dlvDuration.controller.js";
import { isAdmin, verifyToken } from "../../middlewares/auth.middleware.js";

// @route   POST /api/dlv-duration/create
dlvDurationRouter.post('/create', verifyToken, isAdmin, createDlvDuration);

// @route   PUT /api/dlv-duration/update
dlvDurationRouter.put('/update/:id', verifyToken, isAdmin, updateDlvDuration);

// @route   GET /api/dlv-duration/all
dlvDurationRouter.get('/all', getAllDlvDuration);

// @route   GET /api/dlv-duration/country/:countryName
dlvDurationRouter.get('/country/:countryName', getCountryDlvDuration);

// @route   GET /api/dlv-duration/all
dlvDurationRouter.get('/pagination', getPaginatedDlvDuration);

// @route   DELETE /api/dlv-duration/delete
dlvDurationRouter.delete('/delete/:id', verifyToken, isAdmin, deleteDlvDuration);

export default dlvDurationRouter;
