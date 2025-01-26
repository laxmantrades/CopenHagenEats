
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

const Cart = () => {
    const [open,setOpen]=useState<boolean>(false)

  return (
    <div className="flex flex-col  max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button className="bg-orange-400" variant={"link"}>
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
            <TableRow>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src="" alt=""/>
                  <AvatarFallback className="">CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>Briyani</TableCell>
              <TableCell>80</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border-gray-100 dark:border-gray-800 shadow-md">
                    <Button size={"icon"} variant={"outline"} className="rounded-full bg-gray-200"><Minus  className=""/></Button>
                    <Button size={"icon"} disabled variant={"outline"} className="font-bold border-none">1</Button>
                    <Button size={"icon"} variant={"outline"} className="rounded-full bg-blue-500"><Plus  className=""/></Button>
                </div>
              </TableCell>
              <TableCell>80</TableCell>
              <TableCell className="text-right">
                <Button size={"sm"} className="bg-red-600 hover:bg-red-500 ">Remove</Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow className="text-2xl font-bold">
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="text-right">80 DK</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="flex justify-end">
            <Button onClick={()=>setOpen(true)} className="bg-orange-500 hover:bg-orange-400 mt-5">Proceed to Checkout</Button>

        </div>
        <CheckOutConfirmPage open={open} setOpen={setOpen}/>
     
    </div>
  );
};
export default Cart;
