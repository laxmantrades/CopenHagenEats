import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated"
import upload from "../middlewares/multer"
import { addMenu, editMenu } from "../controllers/menu.controller"

const menuRouter=express.Router()

menuRouter.route("/").post(isAuthenticated,upload.single("image"),addMenu)
menuRouter.route("/:id").put(isAuthenticated,upload.single("image"),editMenu)

export default menuRouter