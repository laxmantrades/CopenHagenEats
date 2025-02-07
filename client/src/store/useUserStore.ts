import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios"
import { SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";



const API_END_POINT="http://localhost:3000/api/v1/user"
axios.defaults.withCredentials=true
export const useUserStore = create<any>()(
  persist((set) => ({
    user:null,
    isAuthenticated:false,
    isCheckingAuth:true,
    loading:false,
    signup:async(input:SignupInputState)=>{
        try {
            set({loading:true})
            const response=await axios.post(`${API_END_POINT}/signup`,input,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.data.success){
                console.log(response.data);
                toast.success("User signup successfully")
                set({loading:false,user:response.data.user,isAuthenticated:true})
            }

        } catch (error:any) {
            set({loading:false})
            toast.error(error.response.data.message)
        }
    }






  }), {
    name: "user-name",
    storage: createJSONStorage(() => localStorage),
  })
);
