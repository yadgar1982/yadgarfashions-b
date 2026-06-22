import AddressModel from "../../models/User/address.model.js";

// Create Address
export const createAddress = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing Brand
    const existing = await AddressModel.findOne({ streetAddress:data.streetAddress, userId:data.userId });
    if (existing) {
      return res.status(400).json({ message: "Address already exists" });
    }
    const address = await new AddressModel(data).save();
    res.status(201).json({ message: "Address created successfully", address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Address
export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const data = { ...req.body };
        const updatedAddress = await AddressModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedAddress)
            res.status(404).json({ message: "There is no Address in database !" });
        const addressObj = updatedAddress.toObject();
        res.status(200).json({ message: "Address updated successfully", address: addressObj });
    } catch (error) {
        res.status(500).json({ message: "Failed to update Address" });
    }
};

// Delete Address
export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await AddressModel.findByIdAndDelete(id);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Address", error });
    }
};

// Get All Address
export const getAllAddress = async (req, res) => {
    try {
        const addresses = await AddressModel.find().sort({ createdAt: -1 });
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch Address" });
    }
};

// Get All User Related Address
export const getAllUserAddress = async (req, res) => {
    try {
        const {userId} = req.query;
        const addresses = await AddressModel.find({userId}).sort({ createdAt: -1 });
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch Address" });
    }
};

