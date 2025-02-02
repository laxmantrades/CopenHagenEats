import mongoose, { Document }  from "mongoose";
export interface IResturant{
    user:mongoose.Schema.Types.ObjectId
    resturantName:string,
    city:string,
    country:string,
    deliveryTime:number,
    cuisine:string[],
    imageUrl:string,
    menu:mongoose.Schema.Types.ObjectId[]

}
export interface IUserDocument extends IResturant,Document{
    createdAt:Date,
    updatedAt:Date
}

const resturantSchema=new mongoose.Schema<IUserDocument>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    resturantName:{
        type:String,
        required:true

    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    deliveryTime:{
        type:Number,
        required:true
    },
    cuisine:[{
        type:String,
        required:true

    }],
    imageUrl:{
        type:String,

    },
    menu:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Menu"
    }]
},{
    timestamps:true
})

export const Resturant=mongoose.model("Resturant",resturantSchema)