import { getPaginationService } from '../../services/pagination.service.js';
import DlvDurationModel from '../../models/Admin/dlvDuration.model.js';

// Create DlvDuration
export const createDlvDuration = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing DlvDuration
    const existing = await DlvDurationModel.findOne({ country:data.country });
    if (existing) {
      return res.status(400).json({ message: "DlvDuration already exists" });
    }
    const dlvDuration = await new DlvDurationModel(data).save();
    res.status(201).json({ message: "DlvDuration created successfully", dlvDuration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update DlvDuration
export const updateDlvDuration = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedDlvDuration = await DlvDurationModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedDlvDuration)
        res.status(404).json({message : "There is no DlvDuration in database !"});
    const dlvDurationObj = updatedDlvDuration.toObject();
    res.status(200).json({ message: "DlvDuration updated successfully", dlvDuration : dlvDurationObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update DlvDuration" });
  }
};

// Delete DlvDuration
export const deleteDlvDuration = async (req, res) => {
  try {
    const { id } = req.params;

    const dlvDuration = await DlvDurationModel.findByIdAndDelete(id);
    if (!dlvDuration) {
      return res.status(404).json({ message: "DlvDuration not found" });
    }
    res.status(200).json({ message: "DlvDuration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete DlvDuration", error });
  }
};

// Get All DlvDuration
export const getAllDlvDuration = async (req, res) => {
  try {
    const dlvDurations = await DlvDurationModel.find().sort({ createdAt: -1 }).lean();
    res.json({ dlvDurations });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch DlvDuration" });
  }
};

// Get All DlvDuration
export const getCountryDlvDuration = async (req, res) => {
  try {
    const {countryName} = req.params;
    const dlvDurations = await DlvDurationModel.findOne({country:countryName});
    res.json(dlvDurations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch DlvDuration" });
  }
};

// Get Paginated DlvDuration
export const getPaginatedDlvDuration = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationService(
      page,
      limit,
      DlvDurationModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch DlvDuration', error });
  }
};
