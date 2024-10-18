"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react"; // For referencing the section
import aboutImg from "@/public/assets/aboutImg.jpg";
import exImg from "@/public/assets/experience.jpg";

function About() {
  // Define animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.13 }, // Increase the delay as needed
    },
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section className="flex flex-col gap-12 mt-5 relative">
      <motion.div>
        <h1
          className="text-2xl font-normal "
          initial={"hidden"}
          animate={"visible"}
          variants={fadeIn}
        >
          Bridging the Gap <br />
          Between Creators and Fans
        </h1>
      </motion.div>
      <div className="pop-box">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-thin">
            Offering Unique and Wonderful
            <br />
            Experience
          </h1>
          <ArrowUpRight className="border-2 rounded-full w-9 h-9 p-2 hover:bg-black hover:text-white cursor-pointer transition-all" />
        </div>
        <div className="flex justify-between items-end">
          <p className="text-end">New Experience</p>
          <Image
            src={exImg}
            objectFit="cover"
            className="w-[30%] rounded-2xl"
          />
        </div>
      </div>

      <div className="img-itself">
        <Image
          src={aboutImg}
          sizes="100vw"
          fill
          className="absolute inset-0 object-cover rounded-2xl"
          alt="About Image"
        />
        <div ref={sectionRef} className="img-content">
          {/* Apply motion.div with fadeIn effect triggered by scroll */}
          <motion.div
            className="max-w-[100%] lg:max-w-[30%]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"} // Animate based on scroll
            variants={fadeIn}
          >
            <Button className="bg-white text-black font-thin mb-3 rounded-full hover:bg-black hover:text-white">
              Why choose us
            </Button>
            <h1 className="text-lg font-medium">
              Exclusive access to Creators
            </h1>
            <p className="text-sm font-thin text-white">
              We partner with a big number of creators from different platforms
              such as YouTube, LinkedIn, and more, so you will find your
              favorite creators here.
            </p>
          </motion.div>

          <motion.div
            className="max-w-[30%] hidden md:max-w-[50%] lg:max-w-[30%] lg:block"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"} // Animate based on scroll
            variants={fadeIn}
          >
            <Button className="bg-white text-black font-thin mb-3 rounded-full hover:bg-black hover:text-white">
              Why to participate
            </Button>
            <h1 className="text-lg font-medium">
              Exclusive access to Creators
            </h1>
            <p className="text-sm font-thin text-white">
              We partner with a big number of creators from different platforms
              such as YouTube, LinkedIn, and more, so you will find your
              favorite creators here.
            </p>
          </motion.div>

          <motion.div
            className="max-w-[30%] hidden md:max-w-[50%] lg:max-w-[30%] md:block"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"} // Animate based on scroll
            variants={fadeIn}
          >
            <Button className="bg-white text-black font-thin mb-3 rounded-full hover:bg-black hover:text-white">
              LinkedIn post
            </Button>
            <h1 className="text-lg font-medium">
              Exclusive access to Creators
            </h1>
            <p className="text-sm font-thin text-white">
              We partner with a big number of creators from different platforms
              such as YouTube, LinkedIn, and more, so you will find your
              favorite creators here.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
