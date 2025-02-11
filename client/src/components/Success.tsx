import { Link } from "react-router";
import pizza from "../assets/hero_pizza.png"
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";

const Success = () => {
  
  const {getOrderDetails,orders}=useOrderStore()
  const{clearCart}=useCartStore()

  useEffect(()=>{
    getOrderDetails()
    console.log(orders);
    clearCart()

  },[])
  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found
        </h1>
      </div>
    );
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300">Order Status: <span className="text-[#FF5A5A]">{"confirm".toUpperCase()}</span></h1>
        </div>
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Order Summary</h2>
            {orders?.map((order)=><div key={order._id} className="mb-4">
                <div  className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={order.cartItems[0].image} className="w-14 h-14 rounded-md object-cover"></img>
                        <h3 className="ml-3 text-gray-800 dark:text-gray-300 font-medium">{order.cartItems[0].name}</h3>
                    </div>
                    <div className="text-right">
                        <div className="text-gray-700 dark:text-gray-300 flex items-center">
                            <h2>{order.cartItems[0].price}Dkk</h2>
                            
                        </div>

                    </div>

                </div>
                <Separator className="my-4"/>

            </div>)}
            
        </div>
        <Link to={"/cart"}>
            <Button className="bg-orange-500 hover:bg-orange-500 w-full">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};
export default Success;
