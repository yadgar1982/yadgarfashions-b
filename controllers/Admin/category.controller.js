import { getPaginationService,getSelectedFields,getSelectedFieldsByQuery } from '../../services/pagination.service.js';
import CategoryModel from '../../models/Admin/category.model.js';

// Create Category
export const createCategory = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing category
    const existing = await CategoryModel.findOne({ categoryName:data.categoryName });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = await new CategoryModel(data).save();
    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedCategory)
        res.status(404).json({message : "There is no Category in database !"});
    const categoryObj = updatedCategory.toObject();
    res.status(200).json({ message: "Category updated successfully", category : categoryObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Category" });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Category", error });
  }
};

// Get All Category
export const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ createdAt: -1 }).lean();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Category" });
  }
};

// Get Paginated Category
export const getPaginatedCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationService(
      page,
      limit,
      CategoryModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Category', error });
  }
};

// Get Selected Category Fields
export const getSelectedCategoryFields = async (req, res) => {
  try {
    const { fields } = req.query;
    const categories = await getSelectedFields(fields,CategoryModel);
    res.status(200).json({categories});
  } catch (error) {
    res.status(500).json({ message:  error.message});
  }
};
