
import AddsModel from '../../models/Admin/adds.model.js';

// Create Add
export const createAdd = async (req, res) => {

  try {
    const data = req.body;
  
    const adds = await new AddsModel(data).save();
    res.status(201).json({ message: "Adds created successfully", adds });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Adds
export const  updateAdd= async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updateAdd = await AddsModel.findByIdAndUpdate(id, data, { new: true });
    if(!updateAdd)
        res.status(404).json({message : "There is no Adds in the database !"});
    const addsObj = updateAdd.toObject();
    res.status(200).json({ message: "Adds updated successfully", adds : addsObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Adds" });
  }
};

// Delete Adds
export const deleteAdd = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",id)
    const adds = await AddsModel.findByIdAndDelete(id);
    if (!adds) {
      return res.status(404).json({ message: "Adds not found" });
    }
    res.status(200).json({ message: "Adds deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error); // log actual error
    res.status(500).json({ message: "Failed to delete Adds", error: error.message });
  }
};

// Get All Adds
export const getAdd = async (req, res) => {
  try {
    const adds = await AddsModel.find().sort({ createdAt: -1 }).lean();
    res.json({ adds });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Adds" });
  }
};


