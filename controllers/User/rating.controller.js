import RatingModel from "../../models/User/rating.model.js";

// Create Rating
export const createRating = async (req, res) => {
  try {
    const data = req.body;
    const rating = await new RatingModel(data).save();
    res.status(201).json({ message: "Rating created successfully", rating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Rating
export const updateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const data = { ...req.body };
        const rating = await RatingModel.findByIdAndUpdate(id, data, { new: true });
        if (!rating)
            res.status(404).json({ message: "There is no Rating in database !" });
        const ratingObj = rating.toObject();
        res.status(200).json({ message: "Rating updated successfully", rating : ratingObj});
    } catch (error) {
        res.status(500).json({ message: "Failed to update Rating" });
    }
};

// Delete Rating
export const deleteRating = async (req, res) => {
    try {
        const { id } = req.params;

        const rating = await RatingModel.findByIdAndDelete(id);
        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }
        res.status(200).json({ message: "Rating deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Rating", error });
    }
};

// Get All Ratings
export const getAllRatings = async (req, res) => {
    try {
        const ratings = await RatingModel.find().sort({ createdAt: -1 });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch Rating" });
    }
};

// Get Ratings By Product Id
export const getRatingsByProductId = async (req, res) => {
    try {
        const {productId} = req.params;
        const ratings = await RatingModel.find({productId}).sort({ createdAt: -1 });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch Ratings" });
    }
};
