import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInInputState, userSignInSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
// type Login={
//     email:string,
//     password:string
// }

const Login = () => {
  const [input, setInput] = useState<SignInInputState>({
    email: "laxmancheckemail@gmail.com",
    password: "laxman",
  });
  const { login, loading } = useUserStore();
  const [error, setError] = useState<Partial<SignInInputState>>({});
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    //form validation

    const result = userSignInSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<SignInInputState>);
      return;
    }
    try {
      await login(input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
            <Label>Email</Label>
            <Input
              value={input.email}
              onChange={changeEventHandler}
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
              onChange={changeEventHandler}
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
        <div className="mb-10">
          {loading ? (
            <Button className=" w-full bg-orange-500 hover:bg-red-100 ">
              <Loader2 className="animate-spin" />
            </Button>
          ) : (
            <Button className=" w-full bg-orange-500 hover:bg-orange-400">
              Login
            </Button>
          )}
          <div className="mt-4">
            <Link
              to="/forgot-password"
              className="hover:text-blue-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>
        <Separator />
        <p>
          Don't have an account?
          <Link to={"/signup"} className="text-blue-500">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
