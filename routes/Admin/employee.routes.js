import express from "express";
const employeeRouter = express.Router();

import { isAdmin, verifyToken } from "../../middlewares/auth.middleware.js";
import { 
    createEmployee, 
    deleteEmployee, 
    getAllEmployee, 
    getEmployeeById, 
    getPaginatedEmployees, 
    updateEmployee,
    updateEmployeeStatus
} from "../../controllers/Admin/employee.controller.js";

// @route   POST /api/employee/create
employeeRouter.post('/create', verifyToken, isAdmin, createEmployee);

// @route   PUT /api/employee/update
employeeRouter.put('/update/:id', verifyToken, isAdmin, updateEmployee);

// @route   PUT /api/employee/status
employeeRouter.put('/status/:id', verifyToken, isAdmin, updateEmployeeStatus);

// @route   GET /api/employee/all
employeeRouter.get('/all', getAllEmployee);

// @route   GET /api/employee/id/:employeeId
employeeRouter.get('/id/:employeeId',verifyToken, isAdmin, getEmployeeById);

// @route   GET /api/employee/all
employeeRouter.get('/pagination', getPaginatedEmployees);

// @route   DELETE /api/employee/delete
employeeRouter.delete('/delete/:id', verifyToken, isAdmin, deleteEmployee);

export default employeeRouter;
