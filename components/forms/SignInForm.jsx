"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomField from "../CustomField";
import { signInSchema } from "@/lib/validations"; // Import your validation schema
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/userContext";

function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { loginUser } = useUser();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const { email, password } = values;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Supabase response data:", data);
      if (error) {
        console.error("Supabase sign-in error:", error);
        setError(error.message || "Failed to sign in.");
      } else {
        loginUser(data.user);
        router.push("/");
      }
    } catch (e) {
      console.error("Unexpected error during sign-in:", e);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-7">
        <CustomField
          fieldType={"input"}
          label={"Username or Email"} // Adjust the label
          name={"email"} // Use "username" or "email" depending on your schema
          placeHolder={"Your username or email"}
          control={form.control}
        />
        <CustomField
          fieldType={"input"}
          label={"Password"}
          name={"password"}
          placeHolder={"Your password"}
          control={form.control}
        />
        {error && <p className="text-red-500">{error}</p>}{" "}
        <Button
          className="bg-blue-600 text-white w-full rounded-xl !mt-7 hover:bg-blue-700"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
