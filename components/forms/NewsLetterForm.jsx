"use client";

import React from "react";
import { Button } from "../ui/button";
import CustomField from "../CustomField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsLetterSchema } from "@/lib/validations";
import { Form } from "@/components/ui/form";
import { useUser } from "@/lib/userContext";
import supabase from "@/lib/supabaseClient";

function NewsLetterForm() {
  const { user } = useUser();
  const form = useForm({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      user_id: user?.id,
    },
  });

  const postNewsLetter = async (newsletterData) => {
    try {
      const { data: newsLetterInfo, error } = await supabase
        .from("newsletter")
        .insert([newsletterData]);

      if (error) {
        console.log("problem happened : ", error.message);
      } else {
        console.log("successfully executed : ", newsLetterInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    if (user?.id) {
      const fullInformation = { ...data, user_id: user.id };
      console.log(fullInformation);

      postNewsLetter(fullInformation);
    } else {
      alert("you are not signed in");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white w-[350px] rounded-3xl px-4 py-6 z-30"
      >
        <div className="text-center flex flex-col space-y-4">
          <div>
            <h1 className="font-medium text-lg">Ready to Join?</h1>
            <p className="text-xs text-gray-400">
              By joining our newsletter, you will get daily notifications of our
              future events, their details, and locations.
            </p>
          </div>

          <CustomField
            fieldType={"input"}
            name={"name"}
            placeHolder={"Jonas"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />
          <CustomField
            fieldType={"input"}
            name={"lastname"}
            placeHolder={"miscavige"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />
          <CustomField
            fieldType={"input"}
            name={"email"}
            placeHolder={"email@gmail.com"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />
          <Button className="bg-blue-700 text-white rounded-[0.60rem] text-xs hover:bg-blue-900">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewsLetterForm;
