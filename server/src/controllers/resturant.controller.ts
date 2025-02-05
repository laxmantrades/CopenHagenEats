import { RequestHandler } from "express";
import { Resturant } from "../models/resturant.model";
import multer from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.model";

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

export const getResturant: RequestHandler = async (req, res, next) => {
  try {
    const resturant = await Resturant.findOne({ user: req.id });
    if (!resturant) {
      res.status(404).json({
        success: false,
        message: "Resturant not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      resturant,
    });
  } catch (error) {
    next(error);
  }
};

export const updateResturant: RequestHandler = async (req, res, next) => {
  try {
    const { resturantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const resturant = await Resturant.findOne({ user: req.id });
    if (!resturant) {
      res.status(404).json({
        success: false,
        message: "Resturant not found",
      });
      return;
    }
    (resturant.resturantName = resturantName),
      (resturant.city = city),
      (resturant.country = country);
    resturant.deliveryTime = deliveryTime;
    resturant.cuisine = JSON.parse(cuisines);
    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      resturant.imageUrl = imageUrl;
    }
    await resturant.save();
    res.status(200).json({
      success: true,
      message: "Resturant Updated",
      resturant,
    });
  } catch (error) {
    next(error);
  }
};
export const getResturantOrder: RequestHandler = async (req, res, next) => {
  try {
    const resturant = await Resturant.findOne({ user: req.id });
    if (!resturant) {
      res.status(404).json({
        success: false,
        message: "Resturant Not found",
      });
      return;
    }
    const order = await Order.find({ resturant: resturant._id })
      .populate("resturant")
      .populate("user");
    res.status(200).json({
      success: true,
      message: "Succefully got users orders",
      order,
    });
  } catch (error) {
    next(error);
  }
};
export const updateOrderStatus: RequestHandler = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Resturant Not Found!",
      });
      return;
    }
    order.status = status;
    await order.save();
    res.status(200).json({
      success: true,
      message: "Succefully updated Status",
      order,
    });
  } catch (error) {
    next(error);
  }
};
export const searchResturant:RequestHandler=async(req,res,next)=>{
  try {
    const searchText=req.params.searchText||""
    const searchQuery=req.query.searchQuery as string||""
    const selectedCuisines=(req.query.selectedCuisines as string ||"").split(",").filter((cuisine)=>cuisine)
    let query:any={}
    //basic search based on searchText,name,city,country
    if(searchText){
      query.$or=[
        {resturantName:{$regex:searchText,$options:"i"}},
        {city:{$regex:searchText,$options:"i"}},
        {country:{$regex:searchText,$option:"i"}}
      ]
    }
    if(searchQuery){
      query.$or=[
        {resturantName:{$regex:searchQuery,$options:"i"}},
        {cuisines:{$regex:searchQuery,$options:"i"}}
      ]
    }
    //console.log(query);
    if(selectedCuisines.length>0){
      query.cuisines={$in:selectedCuisines}
    }
    const resturant=await Resturant.find(query)
     res.status(200).json({
      success:true,
      data:resturant
    })
    


  } catch (error) {
    next(error)
  }
}
export const getSingleRestaurant:RequestHandler = async (req, res,next) => {
  try {
      const restaurantId = req.params.id;
      const restaurant = await Resturant.findById(restaurantId).populate({
          path:'menus',
          options:{createdAt:-1}
      });
      if(!restaurant){
          res.status(404).json({
              success:false,
              message:"Restaurant not found"
          })
          return
      };
      res.status(200).json({success:true, restaurant});
  } catch (error) {
      next(error)
  }
}