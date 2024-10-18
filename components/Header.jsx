"use client";

import React from "react"; // Ensure you are importing useContext from React
import LeftCol from "./header/LeftCol";
import RightCol from "./header/RightCol";
import { useUser } from "@/lib/userContext";

function Header() {
  const { user } = useUser(); // Access user directly from context
  const myObj = localStorage.getItem("userInformation");
  console.log("my fucking object", myObj);
  return (
    <section className="flex flex-col lg:flex-row items-center w-full mt-8 pt-16">
      <LeftCol />
      <RightCol />
    </section>
  );
}

export default Header;
