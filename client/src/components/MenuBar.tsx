import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const MenuBar = () => {
  return (
    <div className="md:p-4 ">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        <Card className="md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://img.freepik.com/free-photo/top-view-pizza-mix-ham-cheese-pizza-calzone-pizza-with-arugula-french-fries-pizza-with-grilled-chicken-breast-bacon-pizza-with-deep-fried-chicken-tenders-french-frie_141793-4104.jpg?semt=ais_hybrid"
            alt=""
            className=" object-cover"
          />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Pizza
            </h2>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              provident dolor explicabo id ratione consequuntur enim neque
              necessitatibus amet! 
            </p>
            <h3 className="font-semibold mt-4">
                Price: <span className="text-orange-300">80Dk</span>
            </h3>
          </CardContent>
          <CardFooter className="p-4">
            <Button className="bg-orange-500 hover:bg-prange-500 w-full">Add to cart</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default MenuBar;
