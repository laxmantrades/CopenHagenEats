import { RequestHandler } from "express";
import { Resturant } from "../models/resturant.model";
import multer from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";

export const createResturant: RequestHandler = async (req, res, next) => {
  try {
    const { resturantName, country, city, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const resturant = await Resturant.findOne({ user: req.id });
    if (resturant) {
      res.status(400).json({
        success: false,
        message: "Resturant already exists for this user",
      });
      return;
    }
    if (!file) {
      res.status(400).json({
        success: false,
        message: "Image is required",
      });
      return;
    }

    //upload cloudinary
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    await Resturant.create({
      user: req.id,
      resturantName,
      city,
      country,
      deliveryTime,
      cuisine: JSON.parse(cuisines),
      imageUrl,
    });
    res.status(400).json({
      success: true,
      message: "Resturant Added",
    });
  } catch (error) {
    next(error);
  }
};
