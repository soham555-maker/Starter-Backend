import cloudinary from "../utils/Cloudinary.js";

const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json({
            message: "Image uploaded successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export { uploadImage };