"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
import { User2, Lock } from "lucide-react";
import { Button } from "./ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import axios from "axios";
import { useState, useTransition } from "react";

export const LoginForm = () => {
  // Setting the state
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("error");
    setSuccess("");

    startTransition(() => {
      axios.post("/api/login/", values).then((response: any) => {
        setError(response.data.error);
        setSuccess(response.data.success);
      });
      console.log();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 "
      >
        <div className="space-y-4 mx-3 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Email</FormLabel>
                <div className="relative my-3">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      className=" bg-slate-200 border border-gray-300 rounded-lg pl-8 focus:outline-none"
                      // disabled={isPending}
                      placeholder="Enter your email"
                      type="email"
                    />
                  </FormControl>
                  <User2
                    size={30}
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Password</FormLabel>
                <div className="relative my-3">
                  <FormControl>
                    <Input
                      {...field}
                      className=" bg-slate-200 border border-gray-300 rounded-lg pl-8 focus:outline-none"
                      disabled={isPending}
                      placeholder="Enter your password"
                      type="password"
                    />
                  </FormControl>
                  <Lock
                    size={30}
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full py-6 bg-[#01113B]"
          disabled={isPending}
        >
          <p className="text-xl"> Login</p>
        </Button>
      </form>
    </Form>
  );
};
