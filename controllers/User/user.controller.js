import bcrypt from 'bcryptjs';
import { getPaginationService } from '../../services/pagination.service.js';
import UserModel from '../../models/User/user.model.js';
import AuthUserModel from '../../models/commonModels/authUser.model.js';

// Create User
export const createUser = async (req, res) => {
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

    const user = await new UserModel(data).save();

    await new AuthUserModel({
      email : data.email,
      password: hashedPassword,
      refId : user._id,
      refModel : "User",
      role : "user"
    }).save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Users Status
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const {status} = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(id, {status}, { new: true });
    await AuthUserModel.updateOne({refId:id}, {$set : {status}}, { new: true });
    // Convert to object and remove password
    const userObj = updatedUser.toObject();
    res.status(200).json({ message: "User updated successfully", user: userObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Paginated Users
export const getPaginatedUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getPaginationService(
      page,
      limit,
      UserModel
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Users', error });
  }
};

// Get User By Id
export const getUserById = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await UserModel.findOne({_id:id}).sort({ createdAt: -1 });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch User" });
  }
};