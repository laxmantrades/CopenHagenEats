export type CheckoutSessionRequest={
    cartItem:{
        menuId:string,
        name:string,
        image:string,
        price:string,
        quantity:string
    }[];
    deliveryDetails:{
        name:string,
        email:string,
        contact:string,
        address:string,
        city:string,
        country:string,

    },
    resturantId:string
}

export interface Orders extends CheckoutSessionRequest{
    _id:string,
    status:string,
    totalAmount:number
}
export type OrderState={
    loading:boolean,
    orders:Orders[],
    createCheckoutSession:()=>Promise<void>,
    getOrderDetails:()=>Promise<void>
}