import { useCartStore } from "@/store/useCartStore";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { MenuItem } from "@/types/resturantTypes";
import { toast } from "sonner";

const MenuBar = ({menus}:{menus:MenuItem[]}) => {
 
  const {addToCart}=useCartStore()
  
  return (
    <div className="md:p-4 ">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        {menus?.map((menu:MenuItem)=><Card key={menu._id} className="md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img
            src={menu.image}
            alt=""
            className=""
          />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {menu.name}
            </h2>
            <p className="text-sm text-gray-600">
            {menu.description}
            </p>
            <h3 className="font-semibold mt-4">
                Price: <span className="text-orange-300">{menu.price}Dk</span>
            </h3>
          </CardContent>
          <CardFooter className="p-4 ">
            <Button onClick={()=>{
              addToCart(menu)
              toast.success(`${menu.name} added to cart`)
            }
              
            } className="bg-orange-500 hover:bg-prange-500 w-full">Add to cart</Button>
          </CardFooter>
        </Card>)}
      </div>
    </div>
  );
};
export default MenuBar;
