"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomField from "../CustomField";
import Link from "next/link";
import { signUpSchema } from "@/lib/validations";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const { email, password } = values;

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        console.log("supabase has faced an issue", error);
      } else {
        alert(
          "authentication was successfull! now you will be navigated to the sign in page"
        );
        router.push("/sign-in");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      console.log("finished submitting...");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-7">
        <CustomField
          fieldType={"input"}
          label={"Username"}
          name={"username"}
          placeHolder={"your username"}
          control={form.control}
        />
        <CustomField
          fieldType={"input"}
          label={"Email"}
          name={"email"}
          placeHolder={"your email"}
          control={form.control}
        />
        <CustomField
          fieldType={"input"}
          label={"Password"}
          name={"password"}
          placeHolder={"your password"}
          control={form.control}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          className="bg-blue-600 text-white w-full rounded-xl !mt-7 hover:bg-blue-700"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
