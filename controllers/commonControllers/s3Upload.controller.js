import { uploadToS3 } from "../../services/s3Upload.service.js";

export const uploadFile = async (req,res) =>{
    try{
        const {path} = req.body;
        const url = await uploadToS3(req.file,path);
        res.status(200).json({success:true,url});
    }catch(err){
        console.log(err);
        res.status(500).json({message : err.message,success:false});
    }
}