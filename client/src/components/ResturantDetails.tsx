
import { Timer } from "lucide-react"

import { Badge } from "./ui/badge"
import MenuBar from "./MenuBar"

const ResturantDetail=()=>{
    
    return(
        <div className="max-w-7xl mx-auto my-10">
            <div className="w-ful">
                <div className="relative w-full h-32 md:h64 lg:h-72">
                    <img src="https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98=" className="object-cover w-full h-full rounded-lg shadow-lg"/>

                </div>

            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="my-5">
                    <h1 className="text-xl font-medium">{"Copenhagen Eats"}</h1>
                    <div className="flex gap-2 my-2">
                          { ["Biryani","Pizza"].map((name:string,idx:number)=>(
                            <Badge key={idx}>{name}</Badge>
                          )) }
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 my-5">
                        <div className="flex items-center gap-2 font-medium">
                            <Timer className="w-5 h-5"/>
                            <h2>Delivery Time :
                                <span>35mins</span>
                            </h2>

                        </div>

                    </div>


                </div>

            </div>
            <MenuBar/>


        </div>
    )
}
export default ResturantDetail