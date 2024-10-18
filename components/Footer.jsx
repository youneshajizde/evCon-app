"use client";

import React, { useRef } from "react";
import footer from "@/public/assets/footer.jpg";
import Image from "next/image";
import { Dribbble, Instagram, Linkedin, Youtube } from "lucide-react";
import FooterLinks from "./FooterLinks";
import { company, tutorial, community, legal } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import NewsLetterForm from "./forms/NewsLetterForm";

function Footer() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.18 },
    },
  };
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true });

  return (
    <footer className="relative w-full mt-10">
      <Image
        src={footer}
        sizes="100vw"
        fill
        objectFit="cover"
        alt="Footer Image"
        className="absolute inset-0 brightness-50"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent"></div>

      <div className="relative w-[90%] mx-auto p-6 z-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <NewsLetterForm />

          <div className="flex flex-col space-y-3 text-white z-30 items-center lg:items-start">
            <h1 className="text-xl font-thin">Follow us</h1>
            <p className="text-sm font-thin text-center lg:text-left">
              You can check our latest news by following our accounts on
              different platforms
            </p>

            <ul className="flex items-center gap-5 mt-4 justify-center">
              <Instagram className="social-media" />
              <Linkedin className="social-media" />
              <Youtube className="social-media" />
              <Dribbble className="social-media" />
            </ul>
          </div>
        </div>

        <motion.div
          ref={sectionRef}
          className="footer-links grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 text-white z-30 text-center lg:text-left"
          variants={fadeIn}
          initial={"hidden"}
          animate={isInView ? "visible" : "hidden"}
        >
          <FooterLinks title={"Company"} links={company} />

          <FooterLinks title={"Tutorial"} links={tutorial} />

          <FooterLinks title={"Community"} links={community} />

          <FooterLinks title={"Legal"} links={legal} />
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
