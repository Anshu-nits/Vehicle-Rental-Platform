import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    try {
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      console.log("Upload successful");
      fs.unlinkSync(localFilePath);
      return response;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error.message);
    }
  } catch (error) {
    fs.unlinkSync(localFilePath); 
    return null;
  }
};

export { uploadOnCloudinary };
