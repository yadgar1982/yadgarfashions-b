import CoatSizeModel from "../../models/User/coatSize.model.js";

// Create CoatSize
export const createCoatSize = async (req, res) => {
  try {
    const data = req.body;
    const coatSize = await new CoatSizeModel(data).save();
    res.status(201).json({ message: "CoatSize created successfully", coatSize });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update CoatSize
export const updateCoatSize = async (req, res) => {
    try {
        const { id } = req.params;
        const data = { ...req.body };
        const updatedCoatSize = await CoatSizeModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedCoatSize)
            res.status(404).json({ message: "There is no CoatSize in database !" });
        const coatSizeObj = updatedCoatSize.toObject();
        res.status(200).json({ message: "CoatSize updated successfully", coatSize: coatSizeObj });
    } catch (error) {
        res.status(500).json({ message: "Failed to update CoatSize" });
    }
};

// Delete CoatSize
export const deleteCoatSize = async (req, res) => {
    try {
        const { id } = req.params;

        const coatSize = await CoatSizeModel.findByIdAndDelete(id);
        if (!coatSize) {
            return res.status(404).json({ message: "CoatSize not found" });
        }
        res.status(200).json({ message: "CoatSize deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete CoatSize", error });
    }
};

// Get All CoatSize
export const getAllCoatSize = async (req, res) => {
    try {
        const coatSizes = await CoatSizeModel.find().sort({ createdAt: -1 });
        res.status(200).json({ coatSizes });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch CoatSize" });
    }
};

// Get All User Related CoatSize
export const getAllUserCoatSize = async (req, res) => {
    try {
        const {userId} = req.query;
        const coatSizes = await CoatSizeModel.find({userId}).sort({ createdAt: -1 });
        res.status(200).json({ coatSizes });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch CoatSize" });
    }
};

// Get Size Id Related CoatSize
export const getSizeIdCoatSize = async (req, res) => {
    try {
        const {sizeId} = req.query;
        const size = await CoatSizeModel.findOne({_id:sizeId});
        if (!size)
            res.status(404).json({ message: "There is no CoatSize in database !" });
        res.status(200).json(size);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch CoatSize" });
    }
};