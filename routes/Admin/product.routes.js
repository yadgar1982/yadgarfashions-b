import express from "express";
import { 
    createProduct, 
    deleteProduct, 
    getPaginatedProduct, 
    getProductByCategory, 
    getProductById, 
    getSelectedProductFields, 
    updateProduct,
    getPaginatedProductWithRating,
    getProductByBrand,
    getProductBySupplierId
} from "../../controllers/Admin/product.controller.js";
import { isAdminOrEmployee, verifyToken } from "../../middlewares/auth.middleware.js";
const productRouter = express.Router();

// @route   POST /api/product/create
productRouter.post('/create', verifyToken, isAdminOrEmployee, createProduct);

// @route   PUT /api/product/update
productRouter.put('/update/:id', verifyToken, isAdminOrEmployee, updateProduct);

// @route   GET /api/product/all
productRouter.get('/id/:id', getProductById);

// @route   GET /api/product/pagination?page=1&limit=10
productRouter.get('/pagination/rating', getPaginatedProductWithRating);

// @route   GET /api/product/pagination?page=1&limit=10
productRouter.get('/pagination', getPaginatedProduct);

// @route   GET /api/product/query/productId?fields=fields
productRouter.get('/query/:productId', getSelectedProductFields);

// @route   GET /api/product/query/categoryId?page=1&limit=10
productRouter.get('/category/:categoryId', getProductByCategory);

// @route   GET /api/product/query/brandId?page=1&limit=10
productRouter.get('/brand/:brandId', getProductByBrand);

// @route   GET /api/product/query/supplier?supplier=supplierId
productRouter.get('/:supplierId', getProductBySupplierId);

// @route   DELETE /api/product/delete
productRouter.delete('/delete/:id', verifyToken, isAdminOrEmployee, deleteProduct);

export default productRouter;
