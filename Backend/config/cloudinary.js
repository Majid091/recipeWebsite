const cloudinary = require('cloudinary');
const fs = require('fs');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath)=>{
    try
    {
        //check if the file is uploaded or not 
        if(!localFilePath)
            {
                console.error("No file path provided for Cloudinary upload.");
                return null
            } 

        //console.log("Uploading file to Cloudinary:", localFilePath);

        //upload that file on cloudinary if the file is recieved successfully...
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "newApp",
        })

        //console.log("Upload successful. Cloudinary URL:", response.secure_url);
        //remove the temporary file from the server if it is already uploaded on cloudinary
        fs.unlinkSync(localFilePath)
        return response

    }
    catch(error)
    {
        fs.unlinkSync(localFilePath);
        console.log("error uploading file on cloudinary", error)
        return null
    }
}


module.exports = uploadOnCloudinary;