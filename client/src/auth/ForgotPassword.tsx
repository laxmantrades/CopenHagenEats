import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const { loading,forgotPassword } = useUserStore();


  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword(email)
    
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <form
        onSubmit={submitHandler}
        className="border p-4 w-full max-w-md rounded-lg md:p-8"
      >
        <h1 className="text-center text-3xl font-bold ">Forgot Password</h1>
        <h1 className="text-center text-base my-4">
          Enter your email address to reset your password
        </h1>
        <div className="relative ">
          <Input
            value={email}
            onChange={onInputChange}
            type="email"
            className="pl-10 focus-visible:ring-1"
            placeholder="Enter your email "
          ></Input>
          <Mail className="absolute inset-2 text-gray-500 pointer-events-none"></Mail>
        </div>
        {loading ? (
          <Button className="w-full bg-orange-500 hover:bg-orange-300 my-5 h-10">
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button className="w-full bg-orange-500 hover:bg-orange-300 my-5 h-10">
            Send Reset Link
          </Button>
        )}

        <div className="text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
