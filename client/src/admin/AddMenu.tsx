import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormType, menuSchema } from "@/schema/menuSchema";

import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import EditMenu from "./EditMenu";
import { useMenuStore } from "@/store/useMenuStore";
import { useResturantStore } from "@/store/useResturantStore";

const AddMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [input, setInput] = useState<MenuFormType>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
const{loading,createMenu}=useMenuStore()
const {resturant}=useResturantStore()








  const [error, setError] = useState<Partial<MenuFormType>>({});
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };
  const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormType>);
      return;
    }
    try {
      const formData=new FormData()
      formData.append("name",input.name)
      formData.append("description",input.description)
      formData.append("price",input.price.toString())
      if(input.image){
        formData.append("image",input.image)
      }
      await createMenu(formData)
     
    } catch (error) {
      console.log(error);
      
    }
  };


  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menu
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-500">
              <Plus className="mr-2" /> Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <Dialog>Add a new menu</Dialog>
              <DialogDescription>
                Create a menu that will make your resturant stand out
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="my-5">
              <div>
                <Label>Name</Label>
                <Input
                  value={input.name}
                  onChange={onChangeHandler}
                  className=""
                  type="text"
                  name="name"
                  placeholder="Enter a menu"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.name}
                  </span>
                )}
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={input.description}
                  onChange={onChangeHandler}
                  className=""
                  type="text"
                  name="description"
                  placeholder="Enter add menu description"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.description}
                  </span>
                )}
              </div>
              <div>
                <Label>Price in DKK</Label>
                <Input
                  value={input.price}
                  onChange={onChangeHandler}
                  className=""
                  type="number"
                  name="price"
                  placeholder="Enter menu price!"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.price}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Menu Image</Label>
                <Input
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                  className=""
                  type="file"
                  name="image"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error?.image?.name}
                  </span>
                )}
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button

                    disabled
                    className="bg-orange-500 hover:bg-orange-500"
                  >
                    <Loader2 className="animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button className="bg-orange-500 hover:bg-orange-500">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {resturant.menu.map((menu:any, id:number) => (
        <div key={id} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={menu?.image}
              alt=""
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm tex-gray-600 mt-1">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">{menu?.price}</span>
              </h2>
            </div>
            <Button
              size={"sm"}
              className="bg-orange-500 hover:bg-orange-500 mt-2"
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true)}}
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
      <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen}/>
    </div>
  );
};
export default AddMenu;
