import {z} from "zod"

export const userSignupSchema=z.object({
    fullname:z.string().min(1,"Fullname is required!").max(50,"Please enter a name less then 50"),
    email:z.string().email("Invalid Email Address!").max(40,"Please enter a valid email!"),
    password:z.string().min(6,"Password Must be 6 characters!"),
    contact:z.string().min(8,"Contact number must be atleast 8 digit!").max(18,"Invalid Phone Number!")
})

export type SignupInputState=z.infer<typeof userSignupSchema>

export const userSignInSchema=z.object({
    email:z.string().email("Invalid Email Address!"),
    password:z.string().min(6,"Password must be 6 characters!").max(30,"Password must be less then 30 characters")
    //  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  //.regex(/[a-z]/, "Password must contain at least one lowercase letter")
  //.regex(/[0-9]/, "Password must contain at least one number")
  //.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");
})
export type SignInInputState=z.infer<typeof userSignInSchema>