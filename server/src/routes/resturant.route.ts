import  express  from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createResturant, getResturant, getResturantOrder, getSingleRestaurant, searchResturant, updateOrderStatus, updateResturant } from "../controllers/resturant.controller";
import upload from "../middlewares/multer"
const resturantRouter=express.Router()

resturantRouter.route("/").post(isAuthenticated,upload.single("imageFile"),createResturant)
resturantRouter.route("/").get(isAuthenticated,getResturant)
resturantRouter.route("/").put(isAuthenticated,upload.single("imageFile"),updateResturant)
resturantRouter.route("/order").get(isAuthenticated,getResturantOrder)
resturantRouter.route("/order/:orderId/status").put(isAuthenticated,upload.single("imageFile"),updateOrderStatus)
resturantRouter.route("/search/:searchText").get(isAuthenticated,searchResturant)
resturantRouter.route("/:id").get(isAuthenticated,getSingleRestaurant)
export default resturantRouter