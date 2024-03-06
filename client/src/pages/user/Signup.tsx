/* eslint-disable @typescript-eslint/no-explicit-any */
import { formSchema } from "@/Schema/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

import { userData } from "@/types/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/redux/actions/User/authAction";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
export const Signup = () => {
  const {toast}=useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: any) => state.user);
  function onSubmit(values: z.infer<typeof formSchema>) {
    const userCredentials: userData = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    dispatch(signupUser({...userCredentials,role:"User"}))
      .then((res: any) => {
        console.log("🚀 ~ .then ~ res:", res.payload)
        if (res?.payload?.status) {
          toast({description:"Registration Succesfull"})
          navigate("/");
        }
      })
      .catch((err: any) => {
        toast({
          variant: "destructive",
          title: "Oops!",
          description: err.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      });
  }
  return (
    <div className="darkBg w-full h-screen flex items-center justify-center">
      <div className="form w-[95%] border p-5 rounded-md sm:w-[60%] lg:w-[28%] mx-auto">
        <h1 className="text-center text-3xl mb-5 font-semibold">
          Create An Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className=" flex flex-col  items-start">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username here.."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage className="text-white font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" flex flex-col  items-start">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email here.." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display email.
                  </FormDescription>
                  <FormMessage className="text-foreground font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className=" flex flex-col  items-start">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter you password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between w-full">
                    <span>This is your Securable password</span>
                    <Link
                      to={"/login"}
                      className="text-blue-400 hover:text-blue-600 cursor-pointer"
                    >
                      Login
                    </Link>
                  </FormDescription>
                  <FormMessage className="text-foreground font-bold"/>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-full font-semibold flex items-center justify-center ${
                loading ? "cursor-not-allowed bg-slate-400 pointer-events-none" : "cursor-pointer"
              }`}
              // disabled={loading ? true : false}
            >
              {loading ? (
                <span className="flex items-center">
                  Processing
                  <span className="animate-pulse font-semibold text-2xl">
                    ...
                  </span>
                </span>
              ) : (
                "Create An Account"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
