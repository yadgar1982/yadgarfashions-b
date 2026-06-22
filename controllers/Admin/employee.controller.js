import bcrypt from 'bcryptjs';
import { getPaginationService, getSelectedFields } from '../../services/pagination.service.js';
import EmployeeModel from '../../models/Admin/employee.model.js';
import AuthUserModel from '../../models/commonModels/authUser.model.js';


// Create Employee
export const createEmployee = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing email
    const existing = await AuthUserModel.findOne({ email:data.employeeEmail });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.employeePassword?.toString(),salt);

    const employee = await new EmployeeModel(data).save();

    await new AuthUserModel({
      email : data.employeeEmail,
      password: hashedPassword,
      refId : employee._id,
      refModel : "Employee",
      role : "employee"
    }).save();
    res.status(201).json({ message: "employee created successfully", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedEmployee)
        res.status(404).json({message : "There is no Employee in database !"});
    // Convert to object and remove password
    const employeeObj = updatedEmployee.toObject();
    res.status(200).json({ message: "Employee updated successfully", employee: employeeObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Employee" });
  }
};

// Update Employee Status
export const updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const {status} = req.body;

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, {status}, { new: true });
    await AuthUserModel.updateOne({refId:id}, {$set : {status}}, { new: true });
    // Convert to object and remove password
    const employeeObj = updatedEmployee.toObject();
    res.status(200).json({ message: "Employee updated successfully", employee: employeeObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await EmployeeModel.findByIdAndDelete(id);
    await AuthUserModel.deleteOne({ refId: id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Employee", error });
  }
};


// Get All Employee
export const getAllEmployee = async (req, res) => {
  try {
    const employees = await EmployeeModel.find().sort({ createdAt: -1 });
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Employee" });
  }
};


// Get Employee By Id
export const getEmployeeById = async (req, res) => {
  try {
    const {employeeId} = req.params;
    const employee = await EmployeeModel.findOne({_id:employeeId});
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Employee" });
  }
};


// Get Paginated Employee
export const getPaginatedEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationService(
      page,
      limit,
      EmployeeModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Employee', error });
  }
};

