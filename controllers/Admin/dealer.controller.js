import bcrypt from 'bcryptjs';
import { getPaginationService,getSelectedFields } from '../../services/pagination.service.js';
import DealerModel from '../../models/Admin/dealer.model.js';
import AuthUserModel from '../../models/commonModels/authUser.model.js';

// Create Dealer
export const createDealer = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing email
    const existing = await AuthUserModel.findOne({ email:data.dealerEmail });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data?.dealerPassword?.toString(),salt);

    const dealer = await new DealerModel(data).save();

    await new AuthUserModel({
      email : data.dealerEmail,
      password: hashedPassword,
      refId : dealer._id,
      refModel : "Dealer",
      role : "dealer"
    }).save();
    res.status(201).json({ message: "Dealer created successfully", dealer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Dealer
export const updateDealer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedDealer = await DealerModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedDealer)
        res.status(404).json({message : "There is no Dealer in database !"});
    // Convert to object and remove password
    const dealerObj = updatedDealer.toObject();
    res.status(200).json({ message: "Dealer updated successfully", dealer: dealerObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Dealer" });
  }
};

// Update Dealer Status
export const updateDealerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const {status} = req.body;

    const updatedDealer = await DealerModel.findByIdAndUpdate(id, {status}, { new: true });
    await AuthUserModel.updateOne({refId:id}, {$set : {status}}, { new: true });
    // Convert to object and remove password
    const dealerObj = updatedDealer.toObject();
    res.status(200).json({ message: "Dealer updated successfully", dealer: dealerObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Dealer
export const deleteDealer = async (req, res) => {
  try {
    const { id } = req.params;

    const dealer = await DealerModel.findByIdAndDelete(id);
    await AuthUserModel.deleteOne({ refId: id });

    if (!dealer) {
      return res.status(404).json({ message: "Dealer not found" });
    }
    res.status(200).json({ message: "Dealer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Dealer", error });
  }
};


// Get All Dealer
export const getAllDealer = async (req, res) => {
  try {
    const dealers = await DealerModel.find().sort({ createdAt: -1 }).lean();
    res.json({ dealers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Dealer" });
  }
};


// Get Dealer By Id
export const getDealerById = async (req, res) => {
  try {
    const {id} = req.params;
    const dealer = await DealerModel.findOne({_id:id}).sort({ createdAt: -1 });
    res.json(dealer);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dealer" });
  }
};

// Get Paginated Dealer
export const getPaginatedDealer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationService(
      page,
      limit,
      DealerModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Dealer', error });
  }
};


// Get Selected Supplier Fields
export const getSelectedDealerFields = async (req, res) => {
  try {
    const { fields } = req.query;
    const dealers = await getSelectedFields(fields,DealerModel);
    res.status(200).json({dealers});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message:  error.message});
  }
};
