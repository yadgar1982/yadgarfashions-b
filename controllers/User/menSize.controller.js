import MenSizeModel from "../../models/User/menSize.model.js";

// Create MenSize
export const createMenSize = async (req, res) => {
  try {
    const data = req.body;
    const menSize = await new MenSizeModel(data).save();
    res.status(201).json({ message: "MenSize created successfully", menSize });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update MenSize
export const updateMenSize = async (req, res) => {
    try {
        const { id } = req.params;
        const data = { ...req.body };
        const updatedMenSize = await MenSizeModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedMenSize)
            res.status(404).json({ message: "There is no MenSize in database !" });
        const menSizeObj = updatedMenSize.toObject();
        res.status(200).json({ message: "MenSize updated successfully", menSize: menSizeObj });
    } catch (error) {
        res.status(500).json({ message: "Failed to update MenSize" });
    }
};

// Delete MenSize
export const deleteMenSize = async (req, res) => {
    try {
        const { id } = req.params;

        const menSize = await MenSizeModel.findByIdAndDelete(id);
        if (!menSize) {
            return res.status(404).json({ message: "MenSize not found" });
        }
        res.status(200).json({ message: "MenSize deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete MenSize", error });
    }
};

// Get All MenSize
export const getAllMenSize = async (req, res) => {
    try {
        const menSizes = await MenSizeModel.find().sort({ createdAt: -1 });
        res.status(200).json({ menSizes });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch MenSize" });
    }
};

// Get All User Related MenSize
export const getAllUserMenSize = async (req, res) => {
    try {
        const {userId} = req.query;
        const menSizes = await MenSizeModel.find({userId}).sort({ createdAt: -1 });
        res.status(200).json({ menSizes });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch MenSize" });
    }
};

// Get Size Id Related MenSize
export const getSizeIdMenSize = async (req, res) => {
    try {
        const {sizeId} = req.query;
        const size = await MenSizeModel.findOne({_id:sizeId});
        if (!size)
            res.status(404).json({ message: "There is no MenSize in database !" });
        res.status(200).json(size);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch MenSize" });
    }
};

