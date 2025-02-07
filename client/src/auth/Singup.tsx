import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
// type SignUpForm={
//     fullname:string,
//     email:string,
//     password:string,
//     contact:string
// }

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const [error, setError] = useState<Partial<SignupInputState>>({});
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    //formvalidation
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<SignupInputState>);
      return;
    }
    //after api call
    try {
      await signup(input);
      navigate("/verify-code");
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <form
        onSubmit={submitHandler}
        className="border-gray-200 md:border  w-full max-w-md rounded-lg md:p-8 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Copenhagen Eats</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Label>FullName </Label>
            <Input
              value={input.fullname}
              onChange={changeInputHandler}
              name="fullname"
              type="name"
              placeholder="Enter your firstname"
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-8 left-2 pointer-events-none text-gray-500" />
            {error && (
              <span className="text-sm text-red-700">{error?.fullname}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Label>Email</Label>
            <Input
              value={input.email}
              onChange={changeInputHandler}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-8 left-2 pointer-events-none text-gray-500" />
            {error && (
              <span className="text-sm text-red-700">{error?.email}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Label className="">Password</Label>
            <Input
              value={input.password}
              onChange={changeInputHandler}
              name="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-8 left-2 pointer-events-none text-gray-500" />
            {error && (
              <span className="text-sm text-red-700">{error?.password}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Label className="">Contact</Label>
            <Input
              value={input.contact}
              onChange={changeInputHandler}
              name="contact"
              type="Contact"
              placeholder="Enter your password"
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneOutgoing className="absolute inset-y-8 left-2 pointer-events-none text-gray-500" />
            {error && (
              <span className="text-sm text-red-700">{error?.contact}</span>
            )}
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button className=" w-full bg-orange-500 hover:bg-red-100 ">
              <Loader2 className="animate-spin" />
            </Button>
          ) : (
            <Button className=" w-full bg-orange-500 hover:bg-orange-400">
              SignUp
            </Button>
          )}
          <div className="mt-4"></div>
        </div>
        <Separator />
        <p>
          Already have an account?
          <Link to={"/login"} className="text-blue-500">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Signup;
