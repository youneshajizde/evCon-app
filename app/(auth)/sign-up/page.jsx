"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import picture from "@/public/assets/45.jpg";
import { topCountries } from "@/lib/constants";
import { motion } from "framer-motion";
import SignUpForm from "@/components/forms/SignUpForm";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import EntryAdmin from "@/components/EntryAdmin";
import logo from "@/public/assets/logooo.png";

function Page() {
  const [fetchError, setFetchError] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select();

      if (error) {
        setFetchError("you have been faced with an error");
        setEvents([]);
      }
      if (data) {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  const countries = topCountries.map((country, index) => (
    <li className="flex items-center gap-2" key={index}>
      <div className="relative rounded-full w-8 h-8">
        <Image
          sizes="100vw"
          fill
          src={country.image}
          className="absolute object-cover rounded-full"
          quality={100}
        />
      </div>

      <span className="flex flex-col">
        <h2 className="font-medium text-sm">{country.name}</h2>
        <p className="text-xs text-gray-500">{country.conNum} events</p>
      </span>
    </li>
  ));

  return (
    <section className="flex h-screen main-container">
      <div className="sign-up-section w-full md:w-[50%] flex justify-center items-center">
        <div className="w-[70%] max-w-md py-10 flex flex-col">
          <Link
            href={"/"}
            className="flex items-center gap-2 text-2xl font-bold self-start"
          >
        <Image src={logo} width={50} height={50} />
        EvCon
          </Link>
          <SignUpForm className="mt-6" />
          <div className="flex items-center justify-between mt-5">
            <p className="text-sm  text-center self-start">
              Do you have an account?
              <Link href={"/sign-in"}>
                <button className="text-blue-800 font-medium ml-2">
                  Sign in
                </button>
              </Link>
            </p>

            <button className="font-medium">
              <EntryAdmin />
            </button>
          </div>
        </div>
      </div>

      <div className="picture-section hidden md:flex w-[50%] relative items-center justify-center">
        <Image
          src={picture}
          sizes="100vw"
          className="object-cover absolute"
          fill
        />

        {/* Card with glass effect */}
        <div className="relative w-[70%] h-[80%] hidden lg:flex">
          <motion.div
            className="absolute top-5 z-30 left-10 bg-white/20 backdrop-blur-sm p-6 rounded-xl shadow-xl max-w-xs text-white"
            initial={{ x: "-100%", opacity: 0 }} // Starts off-screen to the left and fully transparent
            animate={{ x: 0, opacity: 1 }} // Animates to its original position with full opacity
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 0.8,
            }} // Controls the animation's behavior
          >
            <h2 className="text-lg font-medium mb-2">Welcome to EvCon</h2>
            <p className="text-sm">
              Join the biggest event of the year. Stay updated, network, and
              explore.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: "30%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 0.3,
            }}
            className="hidden lg:block absolute w-[400px] h-[300px] bottom-20 left-28 bg-white p-8 rounded-xl shadow-xl max-w-xs text-black"
          >
            <h2 className="text-lg font-medium mb-2">
              Countries With The Most EvCon Events
            </h2>
            <p className="text-xs text-gray-500">Your country might be next!</p>

            <ul className="flex flex-col space-y-4 mt-5">{countries}</ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Page;
