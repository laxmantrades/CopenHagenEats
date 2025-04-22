export type CheckoutSessionRequest={
    cartItems:{
        menuId:string,
        name:string,
        image:string,
        price:string,
        quantity:string
    }[];
    userdeliveryAddress: string
     userdeliveryCity: string
    userdeliveryEmail: string
    userdeliveryName:string
    resturantId:string
}

export interface Orders extends CheckoutSessionRequest{
    id:string,
    status:string,
    totalAmount:number
}
export type OrderState={
    loading:boolean,
    orders:Orders[],
    createCheckoutSession:(checkoutSessionRequest:CheckoutSessionRequest)=>Promise<void>,
    getOrderDetails:()=>Promise<void>
}