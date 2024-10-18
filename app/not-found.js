"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Custom404() {
  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Image src={"/assets/404.gif"} width={400} height={400} />
      <Link className="mt-6 text-blue-500 underline" href="/">
        Go back home
      </Link>
    </motion.div>
  );
}
