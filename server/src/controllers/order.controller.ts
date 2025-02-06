import { RequestHandler } from "express";
import { Resturant } from "../models/resturant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckOutSessionRequest = {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  resturantId: string;
};
type MenuItems = {
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.id })
      .populate("user")
      .populate("resturant");
    if (!orders) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};
export const createCheckOutSession: RequestHandler = async (req, res, next) => {
  try {
    const checkoutsessionRequest: CheckOutSessionRequest = req.body;
    const resturant = await Resturant.findById(
      checkoutsessionRequest.resturantId
    ).populate("menu");
    if (!resturant) {
      res.status(404).json({
        success: false,
        message: "Resturant Not Found",
      });
      return;
    }
    const order: any = new Order({
      resturant: resturant._id,
      user: req.id,
      deliveryDetails: checkoutsessionRequest.deliveryDetails,
      cartItems: checkoutsessionRequest.cartItems,
      status: "pending",
    });

    //line items
    const menuItems = resturant.menu;
    const lineItems = createLineItems(checkoutsessionRequest, menuItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"],
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
        images: JSON.stringify(menuItems.map((item: any) => item.image)),
      },
    });
    if (!session.url) {
      res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
      return;
    }
    await order.save();
    res.status(200).json({
      session,
    });
  } catch (error) {
    next(error);
  }
};
export const createLineItems = (
  checkoutsessionRequest: CheckOutSessionRequest,
  menuItems: any
) => {
  const lineItems = checkoutsessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item: any) => item._id.toString() === cartItem.menuId
    );
    if (!menuItem) throw new Error("Menu Item id not found");
    return {
      price_data: {
        currency: "dkk",
        product_data: {
          name: menuItem.name,
          images: [menuItem.image],
        },
        unit_amount: menuItem.price * 100,
      },
      quantity: cartItem.quantity,
    };
  });
  return lineItems;
};
