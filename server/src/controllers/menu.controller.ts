import { RequestHandler } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { Resturant } from "../models/resturant.model";
import mongoose from "mongoose";

export const addMenu: RequestHandler = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    if (!file) {
      res.status(404).json({
        success: false,
        message: "Image is required",
      });
      return;
    }
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu :any= await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });
    const resturant=await Resturant.findOne({user:req.id})
    if(!resturant){
        res.status(404).json({
            success:false,
            message:"Resturant not Found"
        })
        return
    }
    (resturant.menu as mongoose.Schema.Types.ObjectId[]).push(menu._id)
    await resturant.save()
    res.status(200).json({
        success:true,
        message:"Menu added successfully",
        menu
    })


  } catch (error) {
    next(error);
  }
};

export const editMenu:RequestHandler=async(req,res,next)=>{
    try {
        const{id}=req.params
        const{name,description,price}=req.body
        const file=req.file
        // if(name.length===0||description===0||price.length===0){
        //     res.status(400).json({
        //         success:false,
        //         message:"Input cannot be empty"
        //     })
        //     return
        // }
        const menu=await Menu.findById(id)
       if(!menu){
            res.status(404).json({
                success:false,
                message:"Menu not Found!"
            })
            return
       }
       if(name) menu.name=name
       if(description)menu.description=description
       if(price)menu.price=price
       if(file){
        const imageUrl=await uploadImageOnCloudinary(file as Express.Multer.File)
        menu.image=imageUrl
       }
       await menu.save()

       res.status(200).json({
        success:true,
        message:"Menu Updated Successfully!",
        menu
       })
       


    } catch (error) {
        next(error)
    }
}
