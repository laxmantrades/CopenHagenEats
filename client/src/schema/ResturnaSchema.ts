import {z} from "zod"
export const resturnatFormSchema=z.object({
    resturantName:z.string().nonempty({message:"Resturant name is required"}),
    city:z.string().nonempty({message:"City is required"}),
    country:z.string().nonempty({message:"Country is required"}),
    deliveryTime:z.number().min(0,{message:"Delivery time can not be negetive"}),
    cuisines:z.array(z.string()),
    imageFile:z.instanceof(File).optional().refine((file)=>file?.size!==0,{message:"File is required"})
})

export type ResturnatFormSchema=z.infer<typeof resturnatFormSchema>