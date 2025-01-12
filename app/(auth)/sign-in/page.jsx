"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import picture from "@/public/assets/45.jpg";
import { topCountries } from "@/lib/constants";
import { motion } from "framer-motion";
import Link from "next/link";
import SignInForm from "@/components/forms/SignInForm";
import supabase from "@/lib/supabaseClient";
import jwtImg from "@/public/assets/jwtimg.png";
import supabaseImg from "@/public/assets/supabaseimg.png";
import logo from "@/public/assets/logooo.png";

function Page() {
 

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
          <SignInForm className="mt-6" />

          <p className="text-sm mt-3 text-center self-start">
            Dont you have an account?
            <Link href={"/sign-up"}>
              <button className="text-blue-800 font-medium ml-2">
                Sign up
              </button>
            </Link>
          </p>
        </div>
      </div>

      <div className="picture-section hidden md:flex w-[50%] relative items-center justify-center">
        <Image
          src={picture}
          sizes="100vw"
          className="object-cover absolute"
          fill
        />

        <div className="relative w-[70%] h-[80%] hidden lg:flex">
          <motion.div
            className="absolute top-7 z-30 left-10 bg-white/20 backdrop-blur-sm p-6 rounded-xl shadow-xl max-w-xs text-white"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 0.8,
            }}
          >
            <h2 className="text-lg font-medium mb-2">Auth established using</h2>
            <p className="text-sm">
              Supabase and also JWT tokens to enhance scalability and
              performanceS
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
            className="hidden lg:block absolute w-[400px] h-[100px] top-40 left-28  p-8 rounded-xl shadow-xl max-w-xs text-black"
          >
            <Image
              src={jwtImg}
              sizes="100vw"
              className="object-cover absolute rounded-xl"
              fill
            />
          </motion.div>

          <motion.div
            className="hidden lg:block absolute w-[400px] h-[100px] top-64 left-10  p-8 rounded-xl shadow-xl max-w-xs text-black "
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 0.8,
            }}
          >
            <Image
              src={supabaseImg}
              sizes="100vw"
              className="object-cover absolute rounded-xl"
              fill
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Page;
