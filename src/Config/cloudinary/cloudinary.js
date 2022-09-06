const cloudinary = require("cloudinary").v2;
const uploadImage = async (imagePath, folder) => {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: folder === "library" ? "properties" : "images",
    };
    try {
      const result = await cloudinary.uploader.upload(imagePath, options);
      //console.log(result)
      return result.secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  module.exports = uploadImage;