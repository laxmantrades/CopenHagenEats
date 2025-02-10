
import { Timer } from "lucide-react"

import { Badge } from "./ui/badge"
import MenuBar from "./MenuBar"
import { useParams } from "react-router"
import { useResturantStore } from "@/store/useResturantStore"
import { useEffect } from "react"


const ResturantDetail=()=>{
    const {resturantId}=useParams()
    const {getSingleResturant,signleResturant}=useResturantStore()

    useEffect(()=>{
        getSingleResturant(resturantId!)
        
        
    },[])
   
    
    return(
        <div className="max-w-7xl mx-auto my-10">
            <div className="w-ful">
                <div className="relative w-full h-32 md:h64 lg:h-72">
                    <img src={signleResturant?.imageUrl || "loading"} className="object-cover w-full h-full rounded-lg shadow-lg"/>

                </div>

            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="my-5">
                    <h1 className="text-xl font-medium">{"Copenhagen Eats"}</h1>
                    <div className="flex gap-2 my-2">
                          { signleResturant?.cuisine?.map((name:any)=>(
                            <Badge key={name._id}>{name}</Badge>
                          )) }
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 my-5">
                        <div className="flex items-center gap-2 font-medium">
                            <Timer className="w-5 h-5"/>
                            <h2>Delivery Time :
                                <span>{signleResturant?.deliveryTime}mins</span>
                            </h2>

                        </div>

                    </div>


                </div>

            </div>
           {signleResturant?.menu&&<MenuBar menus={signleResturant?.menu!} />} 


        </div>
    )
}
export default ResturantDetail