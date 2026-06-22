import bcrypt from 'bcryptjs';
import { getPaginationService, getSelectedFields } from '../../services/pagination.service.js';
import SupplierModel from '../../models/Admin/supplier.model.js';
import AuthUserModel from '../../models/commonModels/authUser.model.js';


// Create Supplier
export const createSupplier = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing email
    const existing = await AuthUserModel.findOne({ email:data.supplierEmail });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.supplierPassword?.toString(),salt);

    const supplier = await new SupplierModel(data).save();

    await new AuthUserModel({
      email : data.supplierEmail,
      password: hashedPassword,
      refId : supplier._id,
      refModel : "Supplier",
      role : "supplier"
    }).save();
    res.status(201).json({ message: "Supplier created successfully", supplier });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Supplier
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedSupplier = await SupplierModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedSupplier)
        res.status(404).json({message : "There is no Supplier in database !"});
    // Convert to object and remove password
    const supplierObj = updatedSupplier.toObject();
    res.status(200).json({ message: "Supplier updated successfully", supplier: supplierObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Supplier" });
  }
};

// Update Supplier Status
export const updateSupplierStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const {status} = req.body;

    const updatedSupplier = await SupplierModel.findByIdAndUpdate(id, {status}, { new: true });
    await AuthUserModel.updateOne({refId:id}, {$set : {status}}, { new: true });
    // Convert to object and remove password
    const supplierObj = updatedSupplier.toObject();
    res.status(200).json({ message: "Supplier updated successfully", supplier: supplierObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Supplier
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await SupplierModel.findByIdAndDelete(id);
    await AuthUserModel.deleteOne({ refId: id });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Supplier", error });
  }
};


// Get All Supplier
export const getAllSupplier = async (req, res) => {
  try {
    const suppliers = await SupplierModel.find().sort({ createdAt: -1 });
    res.json({ suppliers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Suppliers" });
  }
};


// Get Supplier By Id
export const getSupplierById = async (req, res) => {
  try {
    const {supplierId} = req.params;
    const supplier = await SupplierModel.findOne({_id:supplierId});
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Supplier" });
  }
};


// Get Paginated Supplier
export const getPaginatedSuppliers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationService(
      page,
      limit,
      SupplierModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Supplier', error });
  }
};

// Get Selected Supplier Fields
export const getSelectedSupplierFields = async (req, res) => {
  try {
    const { fields } = req.query;
    const suppliers = await getSelectedFields(fields,SupplierModel);
    res.status(200).json({suppliers});
  } catch (error) {
    console.error
    res.status(500).json({ message:  error.message});
  }
};
