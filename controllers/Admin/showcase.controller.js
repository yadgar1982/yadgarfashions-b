import { getPaginationByQueryService, getPaginationService } from '../../services/pagination.service.js';
import ShowcaseModel from '../../models/Admin/showcase.model.js';

// Create Showcase
export const createShowcase = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing Showcase
    /* const existing = await ShowcaseModel.findOne({ categoryId:data.categoryId });
    if (existing) {
      return res.status(400).json({ message: "Showcase already exists" });
    } */
    const showcase = await new ShowcaseModel(data).save();
    res.status(201).json({ message: "Showcase created successfully", showcase });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Showcase
export const updateShowcase = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedShowcase = await ShowcaseModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedShowcase)
        res.status(404).json({message : "There is no Showcase in database !"});
    const showcaseObj = updatedShowcase.toObject();
    res.status(200).json({ message: "Showcase updated successfully", showcase : showcaseObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to Showcase Brand" });
  }
};

// Delete Showcase
export const deleteShowcase = async (req, res) => {
  try {
    const { id } = req.params;

    const showcase = await ShowcaseModel.findByIdAndDelete(id);
    if (!showcase) {
      return res.status(404).json({ message: "Showcase not found" });
    }
    res.status(200).json({ message: "Showcase deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Showcase", error });
  }
};

// Get All Showcase
export const getAllShowcase = async (req, res) => {
  try {
    const showcases = await ShowcaseModel.find({}).sort({ createdAt: -1 }).lean();
    res.json({ showcases });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Showcase" });
  }
};

// Get All Showcase
export const getAllShowcaseByCategoryId = async (req, res) => {
  try {
    const {categoryId} = req.params;
    const showcases = await ShowcaseModel.find({categoryId}).sort({ createdAt: -1 });
    res.json({ showcases });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Showcase" });
  }
};

// Get Paginated Showcase
export const getPaginatedShowcase = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const query = {categoryId};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationByQueryService(
      query,
      page,
      limit,
      ShowcaseModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Showcase', error });
  }
};
