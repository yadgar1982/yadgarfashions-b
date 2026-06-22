import bcrypt from 'bcryptjs';
import BrandingModel from '../../models/Admin/branding.model.js';
import AuthUserModel from '../../models/commonModels/authUser.model.js';

// Create Branding
export const createBranding = async (req, res) => {
  try {
    const data = req.body;
    // Check for existing email
    const existing = await AuthUserModel.findOne({ email:data.email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password?.toString(),salt);
    const branding = await new BrandingModel(data).save();

    await new AuthUserModel({
      email : data.email,
      password: hashedPassword,
      refId : branding._id,
      refModel : 'Branding',
      role : "admin"
    }).save();

    res.status(201).json({ message: "Branding created successfully", branding });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Branding
export const updateBranding = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updatedBranding = await BrandingModel.findByIdAndUpdate(id, data, { new: true });
    if(!updatedBranding)
        res.status(404).json({message : "There is no Branding in database !"});
    // Convert to object and remove password
    const brandingObj = updatedBranding.toObject();
    res.status(200).json({ message: "Branding updated successfully", branding: brandingObj });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Branding" });
  }
};

// Get Branding
export const getBranding = async (req, res) => {
  try {
    const brandings = await BrandingModel.findOne().lean();
    res.json(brandings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch brandings" });
  }
};

