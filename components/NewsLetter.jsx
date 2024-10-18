"use client";

import React, { useRef } from "react";
import { Button } from "./ui/button";
import p1 from "@/public/assets/p1.jpg";
import p2 from "@/public/assets/p2.jpg";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

function Contributaion() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 1 },
    },
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      className="w-full h-[500px] md:h-[600px] bg-gray-100 rounded-3xl flex flex-col md:flex-row items-center justify-center relative overflow-hidden p-4"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="hidden lg:block absolute top-10 left-10 md:top-24 md:left-16"
      >
        <Image
          src={p1}
          width={200}
          height={200}
          className="rounded-2xl rotate-12"
          alt="Image 1"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="hidden lg:block absolute bottom-10 right-10 md:bottom-20 md:right-16"
      >
        <Image
          src={p2}
          width={200}
          height={200}
          className="rounded-2xl -rotate-12 "
          alt="Image 2"
        />
      </motion.div>

      {/* Content */}
      <div className="text-center w-full md:w-[40%] space-y-2 md:space-y-5 z-10">
        <label className="text-xs p-2 bg-white text-slate-800 rounded-full inline-block mx-auto">
          Become a fan
        </label>

        <h1 className="text-xl md:text-3xl lg:text-5xl font-light mt-4">
          Connect with your creator like never before with EvCon
        </h1>

        <p className="text-xs md:text-sme lg:text-sm text-gray-400 font-light mt-4">
          Our platform offers a new opportunity for subscribers to choose and
          vote for their favorite creators via newsletter.
        </p>

        <Button className="bg-blue-700 text-white rounded-[0.60rem] text-xs hover:bg-blue-900">
          Join as contributor
        </Button>
      </div>
    </section>
  );
}

export default Contributaion;
