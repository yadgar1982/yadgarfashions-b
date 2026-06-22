import WomenSizeModel from "../../models/User/womenSize.model.js";

// Create WomenSize
export const createWomenSize = async (req, res) => {
  try {
    const data = req.body;
    const womenSize = await new WomenSizeModel(data).save();
    res.status(201).json({ message: "WomenSize created successfully", womenSize });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update WomenSize
export const updateWomenSize = async (req, res) => {
    try {
        const { id } = req.params;
        const data = { ...req.body };
        const updatedWomenSize = await WomenSizeModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedWomenSize)
            res.status(404).json({ message: "There is no WomenSize in database !" });
        const womenSizeObj = updatedWomenSize.toObject();
        res.status(200).json({ message: "WomenSize updated successfully", womenSize: womenSizeObj });
    } catch (error) {
        res.status(500).json({ message: "Failed to update WomenSize" });
    }
};

// Delete WomenSize
export const deleteWomenSize = async (req, res) => {
    try {
        const { id } = req.params;

        const womenSize = await WomenSizeModel.findByIdAndDelete(id);
        if (!womenSize) {
            return res.status(404).json({ message: "WomenSize not found" });
        }
        res.status(200).json({ message: "WomenSize deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete WomenSize", error });
    }
};

// Get All WomenSize
export const getAllWomenSize = async (req, res) => {
    try {
        const womenSizes = await WomenSizeModel.find().sort({ createdAt: -1 });
        res.status(200).json({ womenSizes });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch WomenSize" });
    }
};

// Get All User Related WomenSize
export const getAllUserWomenSize = async (req, res) => {
    try {
        const {userId} = req.query;
        const womenSizes = await WomenSizeModel.find({userId}).sort({ createdAt: -1 });
        res.status(200).json({ womenSizes });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch WomenSize" });
    }
};

// Get Size Id Related WomenSize
export const getSizeIdWomenSize = async (req, res) => {
    try {
        const {sizeId} = req.query;
        const size = await WomenSizeModel.findOne({_id:sizeId});
        if (!size)
            res.status(404).json({ message: "There is no WomenSize in database !" });
        res.status(200).json(size);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch WomenSize" });
    }
};
