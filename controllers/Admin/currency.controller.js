import { getPaginationService } from '../../services/pagination.service.js';
import CurrencyModel from '../../models/Admin/currency.model.js';

// Create Currency
export const createCurrency = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing Currency
    const existing = await CurrencyModel.findOne({ currency:data.currency });
    if (existing) {
      return res.status(400).json({ message: "Currency already exists" });
    }
    const currency = await new CurrencyModel(data).save();
    res.status(201).json({ message: "Currency created successfully", currency });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Currency
export const updateCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedCurrency = await CurrencyModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedCurrency)
        res.status(404).json({message : "There is no Currency in database !"});
    const currencyObj = updatedCurrency.toObject();
    res.status(200).json({ message: "Currency updated successfully", currency : currencyObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Currency" });
  }
};

// Delete Currency
export const deleteCurrency = async (req, res) => {
  try {
    const { id } = req.params;

    const currency = await CurrencyModel.findByIdAndDelete(id);
    if (!currency) {
      return res.status(404).json({ message: "Currency not found" });
    }
    res.status(200).json({ message: "Currency deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Currency", error });
  }
};

// Get All Currency
export const getAllCurrency = async (req, res) => {
  try {
    const currencies = await CurrencyModel.find().sort({ createdAt: -1 }).lean();
    res.json( currencies );
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Currency" });
  }
};

// Get Paginated Currency
export const getPaginatedCurrency = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationService(
      page,
      limit,
      CurrencyModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Currency', error });
  }
};
