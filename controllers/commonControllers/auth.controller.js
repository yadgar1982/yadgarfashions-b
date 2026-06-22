import { verifyTokenService,loginService } from "../../services/auth.service.js";
import AuthUserModel from "../../models/commonModels/authUser.model.js";
import bcrypt from "bcryptjs";
import { loginLimiter } from "../../middlewares/auth.middleware.js";

// login 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginService({ email, password });
    loginLimiter.resetKey(req.ip);
    res.status(200).json({ token, user });
  } catch (err) {
    loginLimiter(req,res,()=>{
      res.status(401).json({ 
        message: err.message || "Login failed" 
      });
    });
  }
};

// get auth user
export const getAuth = async (req, res) => {
  try {
    const { email } = req.params;
   
   const data=  await AuthUserModel.findOne({email}); 
     res.status(200).json({data});
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: err.message || "Login failed" });
  }
};

// verify token
export const verifyTokenController = async (req, res) => {
  try {
    const {token} = req.body;

    if (!token) return res.status(401).json({ message: "Token is required" });

    const decoded = verifyTokenService(token);
    res.status(200).json({ valid: true, user: decoded });

  } catch (error) {
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
};

// update password
export const updatePasswrod= async (req,res)=>{
  
  try{
    const {email} = req.params;
    const {password}=req.body;
    if(!email)
      return res.status(404).json({
    message:"email not found"})
     // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password?.toString(),salt);
    await AuthUserModel.updateOne({email},{$set:{password:hashedPassword}})
    res.status(200).json({
      message:"passowrd updated",
      isUpdated:true
    })

  }catch(err){

res.status(424).json({
      message:"Unable to Update Password",
      isUpdated:false
    })

  }

}
