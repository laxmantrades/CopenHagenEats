import { RequestHandler } from "express";
import {  Resturant } from "../models/resturant.model";

import Stripe from "stripe";
import { prisma } from "../db/connectDb";

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
    const orders = await prisma.order.findMany({
      where: {
        userId: req?.id,
      },
    });
   

    console.log(orders);
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

    //finding restaurant and populating menus
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

    //Database Call
    //this will create order
    const newOrder = await prisma.order.create({
      data: {
        userId: req.id,
        restaurantId: resturant._id as string, //converting to string

        userdeliveryEmail: checkoutsessionRequest?.deliveryDetails?.email,
        userdeliveryName: checkoutsessionRequest?.deliveryDetails?.name,
        userdeliveryAddress: checkoutsessionRequest?.deliveryDetails?.address,
        userdeliveryCity: checkoutsessionRequest?.deliveryDetails?.city,
        cartItems: checkoutsessionRequest?.cartItems,
        totalAmount: 0,
        status: "pending",
      },
    });

    //line items
    const menuItems = resturant.menu;
    const lineItems = createLineItems(checkoutsessionRequest, menuItems);
    //stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA", "DK"],
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        neworderId: newOrder.id,
        images: JSON.stringify(menuItems.map((item: any) => item.image)),
      },
    });
    if (!session.url) {
      res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
      return;
    }

    res.status(200).json({
      session,
    });
  } catch (error) {
    next(error);
  }
};

export const stripeWebhook: RequestHandler = async (req, res, next) => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];

    // Construct the payload string for verification
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

    // Generate test header string for event construction
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    // Construct the event using the payload string and header
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    res.status(400).send(`Webhook error: ${error.message}`);
    return;
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;

      //postgresq update the order with the status and totalAmount
      const neworder = await prisma.order.update({
        where: {
          id: Number(session?.metadata?.neworderId),
        },
        data: {
          status: "confirmed",
          totalAmount: Number(session?.amount_total),
        },
      });

      if (!neworder) {
        res.status(404).json({ message: "Order not found" });
        return;
      }
    } catch (error) {
      next(error);
    }
  }
  // Send a 200 response to acknowledge receipt of the event
  res.status(200).send();
};

export const createLineItems = (
  checkoutsessionRequest: CheckOutSessionRequest,
  menuItems: any
) => {
  const lineItems = checkoutsessionRequest.cartItems.map((cartItem) => {
    //finding if cartitems have correct menutItems
    const menuItem = menuItems.find(
      (item: any) => item._id.toString() === cartItem.menuId
    );
    //if itemid doesn't match to cartitem id then throw error
    if (!menuItem) throw new Error("Menu Item id not found");
    //if found then return these
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
