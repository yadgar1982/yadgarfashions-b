import { getPaginationService,getSelectedFields,getSelectedFieldsByQuery } from '../../services/pagination.service.js';
import TaxModel from '../../models/Admin/tax.model.js';

// Create tax
export const createTax = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing tax
    const existing = await TaxModel.findOne({ taxName:data.taxName });
    if (existing) {
      return res.status(400).json({ message: "Tax already exists" });
    }
    const tax = await new TaxModel(data).save();
    res.status(201).json({ message: "Tax added successfully", tax });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update tax
export const updateTax = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedTax = await TaxModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedTax)
        res.status(404).json({message : "There is no Tax in database !"});
    const taxObj = updatedTax.toObject();
    res.status(200).json({ message: "Tax updated successfully", tax : taxObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Tax" });
  }
};

// Delete tax
export const deleteTax = async (req, res) => {
  try {
    const { id } = req.params;

    const tax = await TaxModel.findByIdAndDelete(id);
    if (!tax) {
      return res.status(404).json({ message: "Tax not found" });
    }
    res.status(200).json({ message: "Tax deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Tax", error });
  }
};

// Get All Tax
export const getAllTax = async (req, res) => {
  try {
    const taxes = await TaxModel.find().sort({ createdAt: -1 });
    res.json({ taxes });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Taxes" });
  }
};

// Get Paginated Tax
export const getPaginatedTax = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationService(
      page,
      limit,
      TaxModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Tax', error });
  }
};

// // Get Selected tax Fields
export const getSelectedTaxFields = async (req, res) => {
  try {
    const { fields } = req.query;
    const taxes = await getSelectedFields(fields,TaxModel);
    res.status(200).json({taxes});
  } catch (error) {
    console.error
    res.status(500).json({ message:  error.message});
  }
};
