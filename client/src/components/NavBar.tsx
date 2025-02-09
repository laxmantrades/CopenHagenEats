import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  User,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,

  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


import { Separator } from "./ui/separator";
import {  useUserStore } from "@/store/useUserStore";
import { useState } from "react";

const NavBar = () => {
 
  const {logout,loading,user}=useUserStore()
  const[isLoading,setIsLoading]=useState<boolean>(loading)

  const logoutHandler=async()=>{
    await logout()
  }
  return (
    <div className="max-w-7xl mx-auto">
      <div className="h-14 flex  items-center justify-between ">
        <h1 className="text-2xl md:font-extrabold ">CopenHagen Eats</h1>
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex space-x-5">
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/order"}>Order</Link>
            
          </div>
          {user?.admin && (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Dashboard</MenubarTrigger>
                <MenubarContent>
                  <Link to="/admin/resturant">
                    <MenubarItem>Restaurant</MenubarItem>
                  </Link>
                  <Link to="/admin/menu">
                    <MenubarItem>Menu</MenubarItem>
                  </Link>
                  <Link to="/admin/orders">
                    <MenubarItem>Orders</MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
          <div>
            <div className="flex items-center gap-4">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Light</DropdownMenuItem>
                    <DropdownMenuItem>Dark</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link to="/cart" className="relative cursor-pointer">
                <ShoppingCart />

                <Button
                  size={"icon"}
                  className="absolute -inset-y-3  left-2 text-xs rounded-full   h-2 w-2 p-2 bg-red-500 hover:bg-red-500"
                >
                  1
                </Button>
              </Link>
              <div>
                <Avatar>
                  <AvatarImage
                    className="h-10 w-10 rounded-full"
                    src="https://github.com/shadcn.png"
                    alt="profilephoto"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                {isLoading? (
                  <Button className="bg-orange-500 hover:bg-orange-500">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button onClick={logoutHandler} className="bg-orange-500  hover:bg-orange-500">
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* Mobile responsive <MobileNavbar /> */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};
export default NavBar;



 
const MobileNavbar = () => {
  const{logout,user}=useUserStore()
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"icon"}
            variant="outline"
            className="rounded-full bg-gray-200 text-black hover:gray-200"
          >
            <Menu></Menu>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-8">
            <SheetTitle>Copenhagen</SheetTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SheetHeader>
          <Separator className="my-2" />
          <SheetDescription className="flex-1">
            <Link
              to={"/profile"}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
            >
              <User />
              <span>Profile</span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
            >
              <HandPlatter />
              <span>Order</span>
            </Link>
            <Link
              to={"/cart"}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
            >
              <ShoppingCart />
              <span> Cart(0)</span>
            </Link>
            {user?.admin&&<Link
              to={"/admin/menu"}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
            >
              <SquareMenu />
              <span>Menu</span>
            </Link>}
           { user?.admin&&<Link
              to={"/admin/resturant"}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
            >
              <UtensilsCrossed />
              <span>Resturant</span>
            </Link>}
           { user?.admin&&<Link
              to={"/admin/orders"}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
            >
              <PackageCheck />
              <span>Resturant Orders</span>
            </Link>}
          </SheetDescription>
          <SheetFooter className="flex flex-col gap-5">
            <div>
              <Avatar className="flex gap-5">
                <AvatarImage></AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
                <h1 className="font-bold text-2xl">Laxman Giri</h1>
              </Avatar>
            </div>
            <SheetClose asChild>
              <Button
              onClick={logout}
                className="bg-orange-500 hover:bg-orange-500"
                type="submit"
              >
                Logout
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
