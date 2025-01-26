import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CheckOutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: "",
  });
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const checkOutHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mt-10">
              {" "}
              Double-check your delivery details and ensure everything is in
              order. When you are ready, hit confirm button to finalize your
              order
            </DialogTitle>
            <DialogDescription>Double Check</DialogDescription>
            <form
              onClick={checkOutHandler}
              className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
            >
              <div>
                <Label>Fullname</Label>
                <Input
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={"laxman@gmail.com"} name="email" disabled />
              </div>
              <div>
                <Label>Contact</Label>
                <Input
                  value={input.contact}
                  name="contact"
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={input.address}
                  name="address"
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={input.city}
                  name="city"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="">
                <Label>Country</Label>
                <Input
                  value={input.country}
                  name="country"
                  onChange={changeEventHandler}
                />
              </div>
              <DialogFooter className="col-span-2 pt-5">
                {" "}
                <Button className="bg-blue-400 hover:bg-blue-400 w-full">
                  Continue to Payment
                </Button>
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CheckOutConfirmPage;
