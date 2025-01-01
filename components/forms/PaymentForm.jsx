"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomField from "../CustomField";
import { paymentSchema } from "@/lib/validations";
import { useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@/lib/userContext";
import SuccessPay from "@/app/event/[id]/payment/component/SuccessPay";

function PaymentForm({ price, eventId }) {
  const { user } = useUser();
  const [open, setOpen] = useState();
  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: "Jonas", // Default name
      lastname: "Miscavige", // Default last name
      cardNumber: "4367642187528634", // Default card number
      expiration: "09/12", // Default expiration
      cvv: "123", // Default CVV
      postalCode: "5325", // Default postal code
      email: "Jonas@gmail.com", // Default email
    },
  });

  const postTicket = async (ticketData) => {
    try {
      const { data, error } = await supabase
        .from("tickets")
        .insert([ticketData])
        .select(); // This will return the inserted data

      if (error) {
        console.error("Error inserting ticket: ", error);
      } else {
        console.log("Ticket successfully saved: ", data);
      }
    } catch (error) {
      console.error("Error inserting ticket: ", error);
    }
  };
  const onSubmit = async (data) => {
    console.log(data);

    const ticketData = {
      event_id: eventId,
      user_id: user.id,
      seat_number: Math.floor(Math.random() * 1000).toString(),
    };

    await postTicket(ticketData);

    setOpen(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-7">
        <div className=" grid grid-cols-2 gap-4">
          <CustomField
            fieldType={"input"}
            label={"Name"}
            name={"name"}
            placeHolder={"Jonas"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />
          <CustomField
            fieldType={"input"}
            label={"Last name"}
            name={"lastname"}
            placeHolder={"miscavige"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />
        </div>

        <div className=" grid grid-cols-2 gap-4">
          <CustomField
            fieldType={"input"}
            label={"Card Number"}
            name={"cardNumber"}
            placeHolder={"4367 6421 8752 8634"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />

          <div className="flex items-center gap-4">
            <CustomField
              fieldType={"input"}
              label={"Expiration"}
              name={"expiration"}
              placeHolder={"MM/AA"}
              control={form.control} // Pass the control from parent form
              className="w-full"
            />
            <CustomField
              fieldType={"input"}
              label={"CVV"}
              name={"cvv"}
              placeHolder={"•••"}
              control={form.control} // Pass the control from parent form
              className="w-full"
            />
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-4">
          <CustomField
            fieldType={"input"}
            label={"Postal code"}
            name={"postalCode"}
            placeHolder={"5325"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />
          <CustomField
            fieldType={"input"}
            label={"Email"}
            name={"email"}
            placeHolder={"Jonas@gmail.com"}
            control={form.control} // Pass the control from parent form
            className="w-full"
          />
        </div>
        <Button
          className="bg-blue-600 text-white w-full rounded-xl !mt-7 hover:bg-blue-700"
          type="submit"
        >
          pay {price}.00
        </Button>
      </form>
      <SuccessPay open={open} setOpen={setOpen} />
    </Form>
  );
}

export default PaymentForm;
