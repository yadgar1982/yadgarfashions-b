import { 
  getPaginationByQueryService, 
  getSelectedFieldsByQuery,
  getPaginationProductWithRatings 
} from '../../services/pagination.service.js';
import ProductModel from '../../models/Admin/product.model.js';
import mongoose from 'mongoose';

// Create Product
export const createProduct = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing Product
    const existing = await ProductModel.findOne(
      { 
        productName:data.productName, 
        categoryId:data.categoryId, 
        brandId:data.brandId, 
      }
    );
    if (existing) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const product = await new ProductModel(data).save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedProduct)
        res.status(404).json({message : "There is no Product in database !"});
    const productObj = updatedProduct.toObject();
    res.status(200).json({ message: "Product updated successfully", product : productObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Product" });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Product", error });
  }
};

// Get Product By Id
export const getProductById = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await ProductModel.findOne({_id:id}).sort({ createdAt: -1 });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Products" });
  }
};

// Get Paginated Product
export const getPaginatedProductWithRating = async (req, res) => {
  try {
    let query = {};
    const {supplierId,categoryId,brandId} = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if(supplierId) query.supplierId = supplierId;
    if(categoryId) query.categoryId = categoryId;
    if(brandId) query.brandId = brandId;
    const result = await getPaginationProductWithRatings(
      query,
      page,
      limit,
      ProductModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Product', error });
  }
};

// Get Paginated Product
export const getPaginatedProduct = async (req, res) => {
  try {
    let query = {};
    const {supplierId,categoryId,brandId} = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if(supplierId) query.supplierId = supplierId;
    if(categoryId) query.categoryId = categoryId;
    if(brandId) query.brandId = brandId;
    const result = await getPaginationByQueryService(
      query,
      page,
      limit,
      ProductModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Product', error });
  }
};

// Get Product By categoryId
export const getProductByCategory = async (req, res) => {
  try {
    let query = {};
    const {categoryId} = req.params;
    let ObjectId = new mongoose.Types.ObjectId(categoryId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    if(categoryId) query.categoryId = ObjectId;
    const result = await getPaginationProductWithRatings(
      query,
      page,
      limit,
      ProductModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Product', error });
  }
};
// Get Product By brandId
export const getProductByBrand = async (req, res) => {
  try {
    let query = {};
    const {brandId} = req.params;
    let ObjectId = new mongoose.Types.ObjectId(brandId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if(brandId) query.brandId = ObjectId;
    const result = await getPaginationProductWithRatings(
      query,
      page,
      limit,
      ProductModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Product', error });
  }
};
// Get Product By supplierId

// export const getProductBySupplierId = async (req, res) => {
//   try {
//     let query = {};
//     const {supplierId} = req.params;
//     let ObjectId = new mongoose.Types.ObjectId(supplierId);
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     if(supplierId) query.supplierId = ObjectId;
//     const result = await getPaginationProductWithRatings(
//       query,
//       page,
//       limit,
//       ProductModel
//     );
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch Product', error });
//   }
// };



export const getProductBySupplierId = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const { ids } = req.query; // optional: comma-separated product IDs
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let query = {};

    if (supplierId) {
      const ObjectId = new mongoose.Types.ObjectId(supplierId);
      query.supplierId = ObjectId;
    }

    if (ids) {
      // If ids query parameter exists, override query to filter by product IDs
      const productIds = ids.split(',').map(id => new mongoose.Types.ObjectId(id));
      query._id = { $in: productIds };
    }

    const result = await getPaginationProductWithRatings(query, page, limit, ProductModel);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Product', error });
  }
};



// Get Selected Product Fields

export const getSelectedProductFields = async (req, res) => {
  try {
    const { fields, from, to } = req.query;
    const { productId } = req.params;
    
    const filter = {};
    if (productId) {
      filter._id = productId;
    }

    if (from && to) {
      filter.orderId = { $gte: from, $lte: to };
    }

    const products = await getSelectedFieldsByQuery(
      fields,
      filter,
      ProductModel
    );

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};