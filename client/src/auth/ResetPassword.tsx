import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/store/useUserStore"
import { Loader2, LockKeyholeIcon } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useParams } from "react-router"

const ResetPassword=()=>{
    const [newpassword,setnewpassword]=useState<string>("")
    const {token}=useParams()
    const {loading,resetPassword}=useUserStore()
    const submitHandler=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
          await resetPassword(newpassword,token)
        } catch (error) {
          console.log(error);
          
        }
    }
   
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen  ">
      <form onSubmit={submitHandler} className="border p-4 w-full max-w-md rounded-lg md:p-8">
        <h1 className="text-center text-3xl font-bold ">Forgot Password</h1>
        <h1 className="text-center text-base my-4">
          Enter your  your new password
        </h1>
        <div className="relative ">
          <Input
          value={newpassword}
            onChange={(e:ChangeEvent<HTMLInputElement>)=>setnewpassword(e.target.value)}
            type="newpassword"
            className="pl-10 focus-visible:ring-1"
            placeholder="Enter your new password "
          ></Input>
          <LockKeyholeIcon className="absolute inset-2 text-gray-500 pointer-events-none"/>
        </div>
        {loading?<Button className="w-full bg-orange-500 hover:bg-orange-300 my-5 h-10">
          <Loader2 className="animate-spin"/>
        </Button>:<Button className="w-full bg-orange-500 hover:bg-orange-300 my-5 h-10">
          Reset Password
        </Button>}
        
        <div className="text-center">
            Back to{" "}
            <Link to="/login" className="text-blue-500">Login</Link>
        </div>
      </form>
    </div>

        </div>
    )
}
export default ResetPassword