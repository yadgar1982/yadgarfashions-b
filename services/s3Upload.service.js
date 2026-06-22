import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/aws.config.js";

export const uploadToS3 = async (file,path) => {
    const filename = `${path}/${file.originalname}`;
    console.log(filename);
    const command = new PutObjectCommand({
        Bucket : process.env.AWS_BUCKET_NAME,
        Key : filename,
        Body : file.buffer,
        ContentType : file.mimetype,
        ACL : 'public-read'
    });
    await s3.send(command);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
}