import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const [searchtext, setSearchText] = useState<string>("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center mt-10">
      <div>
        <h1 className="font-extrabold">Order Food anytime</h1>
        <h1 className="font-extrabold">&anywherer</h1>
        <p className="mt-2">
          Hey! Our Delicios food is waiting for you, we are always near to you!
        </p>
        <div className="relative mt-4 flex space-x-2">
          <Input
            value={searchtext}
            onChange={onChangeHandler}
            placeholder="Search "
            className=" pl-10 shadow-xl"
          />
          <Search className="absolute inset-1 text-gray-500" />
       
            <Button
              onClick={() => {
               
                if (searchtext.length !== 0) {
                  navigate(`/search/${searchtext}`);
                  return
                }
               toast.error("Please provide search text");
              }}
            >
              Search
            </Button>
        
        </div>
        <div>
          <img
            className="object-contain w-full max-h-[500px] "
            src={"https://res.cloudinary.com/dqrza04p1/image/upload/v1745345665/hero_pizza_2_ymbptp.png"}
          ></img>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
