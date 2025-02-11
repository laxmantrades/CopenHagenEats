import Resturant from "@/admin/Resturant";
import { Orders } from "./orderType";

export type MenuItem={
    _id:string,
    name:string,
    description:string,
    price:number,
    image:string
}
export type Resturant={
    _id: string;
    user: string;
    resturantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisine: string[];
    menu: MenuItem[];
    imageUrl: string;




}
export type searchedResturant={
    data:Resturant[]
}


export type ResturantState = {
    loading: boolean;
    resturant:Resturant| null;
    searchedResturant: searchedResturant|null;
    appliedFilter: [];
    signleResturant: Resturant|null;
    resturantOrder: Orders[];
    
    createResturant:(formData:FormData)=>Promise<void>;
    getResturant:()=>Promise<void>;
    updateResturant:(formData:FormData)=>Promise<void>;
    searchResturant:(searchText:string,searchQuery:string,selectedCuisines:any)=>Promise<void>;
    addMenuToResturant:(menu:MenuItem)=>void;
    updatedMenuResturant:(updatedMenu:MenuItem)=>void;
    setAppliedFilter:(value:string)=>void;
    resetAppliedFilter:()=>void
    getSingleResturant:(resturantId:string)=>void
    getresturantOrder:()=>Promise<void>;
    updateResturantOrder:(orderId:string)=>Promise<void>
  
  };
  