import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  resturnatFormSchema,
  ResturnatFormSchema,
} from "@/schema/ResturnaSchema";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Resturant = () => {
  const [error, setError] = useState<Partial<ResturnatFormSchema>>({});
  const [input, setInput] = useState<ResturnatFormSchema>({
    resturantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const changeventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type==="number"?Number(value):value });
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = resturnatFormSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setError(fieldError as Partial<ResturnatFormSchema>);
    }
    //add resturant api implementratui
    console.log(input);
  };
  const loading = false;
  const resturnatExist = true;
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Resturant</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              <div>
                <Label>Resturant Name</Label>
                <Input
                  value={input.resturantName}
                  onChange={changeventHandler}
                  type="text"
                  name="resturantName"
                  placeholder="Enter your resturant name"
                />
                {error && (
                  <span className="text-xs text-red-600 font-medium">
                    {error.resturantName}
                  </span>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={input.city}
                  onChange={changeventHandler}
                  type="text"
                  name="city"
                  placeholder="Enter your city name"
                />
                {error && (
                  <span className="text-xs text-red-600 font-medium">
                    {error.city}
                  </span>
                )}
              </div>

              <div>
                <Label>Country</Label>
                <Input
                  value={input.country}
                  onChange={changeventHandler}
                  type="text"
                  name="country"
                  placeholder="Enter your country name"
                />
                {error && (
                  <span className="text-xs text-red-600 font-medium">
                    {error.country}
                  </span>
                )}
              </div>
              <div>
                <Label>Estimated Delivery Time</Label>
                <Input
                  value={input.deliveryTime}
                  onChange={changeventHandler}
                  type="number"
                  name="deliveryTime"
                  placeholder="Enter your estimated delivery time"
                />
                {error && (
                  <span className="text-xs text-red-600 font-medium">
                    {error.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  value={input.cuisines}
                  onChange={changeventHandler}
                  type="text"
                  name="cuisines"
                  placeholder="Enter your cuisines"
                />
                {error && (
                  <span className="text-xs text-red-600 font-medium">
                    {error.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Image</Label>
                <Input
                  onChange={(e) =>
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    })
                  }
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  placeholder="Upload Resturant Banner"
                />
                {error && (
                  <span className="text-xs text-red-600 font-medium">
                    {error?.imageFile?.name||"Image file is required"}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              {loading ? (
                <Button disabled className="bg-orange-500 mt-2">
                  <Loader2 className="animate-spin" />
                </Button>
              ) : (
                <Button className="bg-orange-500 mt-2">
                  {resturnatExist ? "Update Resturnat" : "Add Your Resturant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Resturant;
