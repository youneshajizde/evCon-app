"use client";

import { ShieldCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import bgc from "@/public/assets/bg-c.jpg";
import Image from "next/image";
import cardLogos from "@/public/assets/visamaster.png";
import PaymentForm from "@/components/forms/PaymentForm";
import supabase from "@/lib/supabaseClient";
import logo from "@/public/assets/logooo.png";
import { useRouter } from "next/navigation";
function Page({ params }) {
  const { id } = params;
  const [event, setEvent] = useState();
  const router = useRouter();
  const getEvent = async (id) => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error.message);
      } else {
        console.log(data);
        setEvent(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvent(id);
  }, []);

  return (
    <section className="bg-gray-100 w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full lg:w-[70%] h-full lg:h-[80%] bg-white rounded-xl flex flex-col lg:flex-row items-center lg:items-start">
        <div className="w-full lg:w-[40%] h-full border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-gray-200 p-4">
          <h1 className="font-semibold flex items-center gap-1">
            <Image src={logo} width={40} height={40} />
            EvCon
          </h1>
          <p className="text-sm font-medium flex items-center gap-1 mt-4 text-gray-500">
            <ShieldCheck />
            Secure Server - secured by EvCon Itself
          </p>

          <div className="card w-full h-[200px] mt-7 rounded-xl relative shadow-lg">
            <Image
              src={bgc}
              sizes="100vw"
              className="object-cover absolute rounded-xl"
              fill
              alt="Card Background"
            />

            <div className="absolute flex items-center justify-center text-4xl inset-0 z-30 text-white">
              **** **** **** ****
            </div>
          </div>

          <div className="text-md mt-3 font-medium py-1 px-3">
            <div className="border-b-[1px] border-gray-300 pt-2 pb-3">
              <p>Transaction Date : 25/8/31</p>
              <p>Hour : 09:34</p>
            </div>

            <div className="border-gray-300 pt-3 flex flex-col space-y-3">
              <p className="flex items-center gap-1">
                Discount : 0.00
                <span className="bg-stone-800 text-white p-1 rounded-[0.40rem] text-xs">
                  USD
                </span>
              </p>
              <p className="font-medium text-lg flex items-center gap-1">
                Total :
                <span className="text-green-600 font-bold text-lg">
                  {event?.price}.00
                </span>
                <span className="bg-stone-800 text-white p-1 rounded-[0.40rem] text-xs">
                  USD
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[60%] h-full p-4">
          <div className="flex items-center justify-between font-semibold text-lg">
            <h1>Payment Options</h1>
            <h1
              onClick={() => router.back()}
              className="text-base text-gray-500 cursor-pointer"
            >
              Cancel
            </h1>
          </div>

          <div className="border-[1px] mt-3 border-gray-200 rounded-xl w-full py-4 px-3 bg-slate-100 flex items-center justify-between">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-1">
                <input type="radio" checked disabled />
                <label className="text-sm text-blue-600 font-medium">
                  Credit / debit card
                </label>
              </div>
              <p className="text-gray-400 text-xs">
                Secure transfer using your bank account
              </p>
            </div>

            <Image src={cardLogos} width={80} height={80} alt="Card Logos" />
          </div>

          <PaymentForm eventId={id} price={event?.price} />
        </div>
      </div>
    </section>
  );
}

export default Page;
