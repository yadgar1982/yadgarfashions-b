import { getPaginationByQueryService, getSelectedFieldsByQuery } from '../../services/pagination.service.js';
import BrandModel from '../../models/Admin/brand.model.js';

// Create Brand
export const createBrand = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing Brand
    const existing = await BrandModel.findOne({ brandName:data.brandName,categoryId:data.categoryId });
    if (existing) {
      return res.status(400).json({ message: "Brand already exists" });
    }
    const brand = await new BrandModel(data).save();
    res.status(201).json({ message: "Brand created successfully", brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Brand
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedBrand = await BrandModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedBrand)
        res.status(404).json({message : "There is no Brand in database !"});
    const brandObj = updatedBrand.toObject();
    res.status(200).json({ message: "Brand updated successfully", brand : brandObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Brand" });
  }
};

// Delete Brand
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await BrandModel.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Brand", error });
  }
};

// Get All Brand
export const getAllBrand = async (req, res) => {
  try {
    const brands = await BrandModel.find().sort({ createdAt: -1 }).lean();
    res.json({ brands });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Brand" });
  }
};


// Get Paginated Brands
export const getPaginatedBrands = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const query = {categoryId};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationByQueryService(
      query,
      page,
      limit,
      BrandModel
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch classes', error });
  }
}

// Get Selected Brands Fields
export const getSelectedBrandsFields = async (req, res) => {
  try {
    const { fields } = req.query;
    const {categoryId} = req.params;
    const brands = await getSelectedFieldsByQuery(
      fields,
      {categoryId},
      BrandModel
    );
    res.status(200).json({brands});
  } catch (error) {
    console.error
    res.status(500).json({ message:  error.message});
  }
};