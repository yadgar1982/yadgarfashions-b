import AuthUserModel from "../models/commonModels/authUser.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { model } from "mongoose";

export const loginService = async ({ email, password }) => {
  const authUser = await AuthUserModel.findOne({ email });

  if (!authUser) throw new Error("Invalid email or password");
  if (!authUser.status) throw new Error("You are not active member");
  const isMatch = await bcrypt.compare(password, authUser.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const user = await model(`${authUser.refModel}`).findOne({_id:authUser.refId});
  const userObj = user.toObject();
  const currency = await model(`Currency`).findOne({countryName:user.country});
  if(!user)
    throw new Error("User not found");

  let currencyObj = {};
  if(authUser.role !== "admin")
  {
    currencyObj = currency?.toObject();
  }
  // delete _id from user
  delete user._id;
  
  userObj.userId = authUser.refId;

  const payload = {
    ...userObj,
    role : authUser.role,
    authId : authUser._id
  }

  const token = jwt.sign(
    payload,
    process.env.JWTSECRET,
    { expiresIn: "1d" }
  );

  const { password: _, ...userData } = authUser.toObject();
  let props = {
    ...userObj,
    ...currencyObj,
    role: authUser.role
  }
  return { token, user:props };
};

export const verifyTokenService = (token) => {
  const decoded = jwt.verify(token, process.env.JWTSECRET);
  return decoded;
};
