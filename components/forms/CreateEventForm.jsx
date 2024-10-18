import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomField from "../CustomField";
import { createEventSchema } from "@/lib/validations";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@/lib/userContext";

function CreateEventForm({ setOpen }) {
  const { user } = useUser();
  
  const form = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      address: "",
      date: "",
      price: "",
      variant: "",
      description: "",
    },
  });

  const postEvent = async (eventInfo) => {
    try {
      const { data, error } = await supabase
        .from("events")
        .insert([eventInfo])
        .select();

      if (error) {
        console.log("Error inserting ticket: ", error);
      } else {
        console.log("data has been posted", data);
        setOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const onSubmit = (data) => {
    console.log("data raw", data);
    const dataWithId = {
      ...data,
      scheduler_id: user?.id,
      scheduler_email: user?.email,
    };
    postEvent(dataWithId);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-7">
        <div className=" grid grid-cols-2 gap-4">
          <CustomField
            fieldType={"input"}
            label={"Title"}
            name={"title"}
            placeHolder={"Tech con"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />
          <CustomField
            fieldType={"input"}
            label={"Address"}
            name={"address"}
            placeHolder={"Texas - austin"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />
        </div>

        <div className=" grid grid-cols-2 gap-4">
          <CustomField
            fieldType="datepicker" // Use DatePicker here
            label="Date"
            name="date"
            placeHolder="Select a date"
            control={form.control}
          />

          <div className="flex items-center gap-4">
            <CustomField
              fieldType={"input"}
              label={"Price"}
              name={"price"}
              placeHolder={"100($)"}
              control={form.control} // Pass the control from parent form
              className="w-full"
            />
            <CustomField
              fieldType={"input"}
              label={"Variant"}
              name={"variant"}
              placeHolder={"technology"}
              control={form.control} // Pass the control from parent form
              className="w-full"
            />
          </div>
        </div>
        <div className=" grid grid-cols-1 gap-4">
          <CustomField
            fieldType={"textarea"}
            label={"Description"}
            name={"description"}
            placeHolder={"technology"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />
        </div>

        <div className="flex gap-3 !mt-5">
          <Button
            className="bg-blue-600 text-white w-full rounded-xl  hover:bg-blue-700"
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateEventForm;
