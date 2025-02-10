import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useOrderStore=create()(persist((set)=>({
    

}),{
    name:"order-name",
    storage:createJSONStorage(()=>localStorage)

}))