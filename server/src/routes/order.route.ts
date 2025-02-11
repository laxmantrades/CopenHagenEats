import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated"
import { createCheckOutSession, getOrders, stripeWebhook } from "../controllers/order.controller"


const orderRoute=express.Router()

orderRoute.route("/").get(isAuthenticated,getOrders)
orderRoute.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckOutSession)
orderRoute.route("/webhook").post(express.raw({type:"application/json"}),stripeWebhook )
export default orderRoute