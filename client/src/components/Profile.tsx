import { Avatar, AvatarFallback, } from "@radix-ui/react-avatar";
import { Loader2, LocateIcon, Mail, MapPin, MapPinnedIcon, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
type ProfileDataState = {
  fullname: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
};

const Profile = () => {
  const imagreRef = useRef<HTMLInputElement | null>(null);

  const{user,updateProfile,loading}=useUserStore()
  const[isLoading,setIsLoading]=useState<boolean>(loading)
 
  const [profilestate, setProfileData] = useState<ProfileDataState>({
    fullname:user?.fullname|| "",
    email: user?.email||"",
    contact: "",
    address:user?.address|| "",
    city: user?.city||"",
    country:user?.country|| "",
    profilePicture: user?.profilePicture||"",
  });
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader=new FileReader()
      reader.onloadend=()=>{
        const result=reader.result as string
      
        setProfileData((prev)=>({
            ...prev,profilePicture:result
        }))
      }
      reader.readAsDataURL(file);
    }
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profilestate, [name]: value });
  };

  const updateProfileHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      
      setIsLoading(true)
      await updateProfile(profilestate)
      setIsLoading(false)
  
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
   

    
  };
  return (
    <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5 ">
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <img
              className="rounded-full object-cover object-top w-20 h-20  md:h-28 md:w-28 "
              src={profilestate.profilePicture||"https://staticg.sportskeeda.com/editor/2024/05/d973a-17150616187538-1920.jpg"}
            />
            <AvatarFallback></AvatarFallback>
            <input
              ref={imagreRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imagreRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>
         
        </div>
        <Input
            value={profilestate.fullname}
            onChange={onChangeHandler}
            type="text"
            name="fullname"
            className="font-bold md:text-4xl px-2 md:py-7  outline-double border-none  max-w-1xl w-96 "
          />
      </div>
      <div className=" md:flex justify-center md:space-x-4">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 my-2 md:my-0">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              disabled
              name="email"
              value={"laxmangiri@gmail.com"}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 my-2 md:my-0">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
            onChange={onChangeHandler}
              placeholder="Update your address"
              name="address"
              value={profilestate.address}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 my-2 md:my-0">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              value={profilestate.city}
              onChange={onChangeHandler}
              name="city"
              
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 my-2 md:my-0">
          <MapPinnedIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              
              name="country"
              value={profilestate.country}
              onChange={onChangeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        
      </div>
      <div className="text-center mt-5">
            {!isLoading?<Button className="text-xl bg-orange-500 hover:orange-500">Update </Button>:<Button> <Loader2 className="animate-spin "/></Button>}
        </div>
    </form>
  );
};
export default Profile;
