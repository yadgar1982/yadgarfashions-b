import CartModel from '../../models/User/cart.model.js';

// Create Cart
export const createCart = async (req, res) => {
    try {
        const data = req.body;
        const query = {
            productId: data?.productId,
            userId: data?.userId,
            productSize: data?.productSize,
            productColor: data?.productColor,
            deliveryType: data?.deliveryType,
        }
        const existingProduct = await CartModel.findOne(query);
        if(!existingProduct){
            const cart = await new CartModel(data).save();
            return res.status(201).json({ message: "Cart created successfully", cart });
        }
        let cartId = existingProduct._id;
        let qty = Number(existingProduct.productQty)+Number(data.productQty);
        let latestInfo = {
            productQty:qty,
            deliveryCost : Number(existingProduct.deliveryCostUnit)*qty
        }
        await CartModel.findByIdAndUpdate(cartId,latestInfo, { new: true });
        return res.status(200).json({ message: "Cart updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update Cart
export const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const data = { ...req.body };
        const updatedCart = await CartModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedCart)
            res.status(404).json({ message: "There is no Cart in database !" });
        const cartObj = updatedCart.toObject();
        res.status(200).json({ message: "Cart updated successfully", cart: cartObj });
    } catch (error) {
        res.status(500).json({ message: "Failed to update Cart" });
    }
};

// Delete Cart
export const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await CartModel.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Cart", error });
    }
};

// Delete Many Cart
export const deleteManyCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedCart = await CartModel.deleteMany({userId});
        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Cart", error });
    }
};

// Get All Cart
export const getAllCart = async (req, res) => {
    try {
        const carts = await CartModel.find().sort({ createdAt: -1 });
        res.status(200).json({ carts });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch carts" });
    }
};

// Get All User Related Cart
export const getAllUserCart = async (req, res) => {
    try {
        const {userId} = req.query;
        const carts = await CartModel.find({userId}).sort({ createdAt: -1 });
        res.status(200).json({ carts });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch carts" });
    }
};

// Count Cart
export const countUserCart = async (req, res) => {
    try {
        const {userId} = req.query;
        const carts = await CartModel.countDocuments({userId});
        res.status(200).json({ carts });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch carts" });
    }
};

