import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [otp, setOTP] = useState<string[]>(["", "", "", "", "", ""]);

  const inputref = useRef<any>([]);
  const {verifyEmail,loading}=useUserStore()
 
  

  const navigate=useNavigate()
  
  

  const handlechange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOTP(newOtp);
    }
    //move to next input field if a digit is entered
    if (value !== "" && index < 5) {
      inputref.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputref.current[index - 1].focus();
    }
  };

  const handleVerify=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const verificationCode=otp.join("")
    try {
      await verifyEmail(verificationCode)
      navigate("/")
    } catch (error) {
      toast.error("Error in verifying email!")
      
    }
   

  }
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code sent to your email address
          </p>
        </div>
        <form onSubmit={handleVerify}>
          <div className="flex justify-between">
            {otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element) => (inputref.current[idx] = element)}
                type="text"
                maxLength={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlechange(idx, e.target.value)
                }
                value={letter}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          {loading ? (
            <Button
              disabled
              className="bg-orange-500 hover:bg-hoverOrange mt-6 w-full"
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="bg-orange-500 hover:bg-orange-300 mt-6 w-full" >
              Verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};
export default VerifyEmail;
