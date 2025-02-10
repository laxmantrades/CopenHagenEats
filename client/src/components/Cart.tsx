import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CheckOutConfirmPage from "./CheckOutConfirmPage";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { clearCart, cart, decrementQuantiy, increamentQuantity,removeFromTheCart } =
    useCartStore();
  let totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  },0);

  return (
    <div className="flex flex-col  max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button
          onClick={() => clearCart()}
          className="bg-orange-400"
          variant={"link"}
        >
          Clear All
        </Button>
      </div>

      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="">Item</TableHead>

            <TableHead className="">Title</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="">Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((cart) => (
            <TableRow>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src={cart.image} alt="" />
                  <AvatarFallback className="">CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{cart.name}</TableCell>
              <TableCell>{cart.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementQuantiy(cart._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-gray-200"
                  >
                    <Minus className="" />
                  </Button>
                  <Button
                    size={"icon"}
                    disabled
                    variant={"outline"}
                    className="font-bold border-none"
                  >
                    {cart.quantity}
                  </Button>
                  <Button
                    onClick={() => increamentQuantity(cart._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-blue-500"
                  >
                    <Plus className="" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{cart.price * cart.quantity}</TableCell>
              <TableCell className="text-right">
                <Button onClick={()=>removeFromTheCart(cart._id)} size={"sm"} className="bg-red-600 hover:bg-red-500 ">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange-500 hover:bg-orange-400 mt-5"
        >
          Proceed to Checkout
        </Button>
      </div>
      <CheckOutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};
export default Cart;
