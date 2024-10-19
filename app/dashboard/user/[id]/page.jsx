"use client";

import { useUser } from "@/lib/userContext";
import {
  CalendarCog,
  GraduationCap,
  House,
  LogOut,
  Mail,
  MessageCircleWarning,
  Slack,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toyAvatar from "@/public/assets/toyAvatar.jpg";
import Link from "next/link";
import withAuth from "@/lib/withAuth";
import Tickets from "./components/Tickets";
import MyEvents from "./components/MyEvents";

function DashboardPage() {
  const { logOutUser, user } = useUser();
  const [activeTab, setActiveTab] = useState("tickets");

  let renderedTab = "";

  switch (activeTab) {
    case "tickets":
      renderedTab = <Tickets />;
      break;
    case "myEvents":
      renderedTab = <MyEvents />;
      break;
    default:
      break;
  }

  console.log(user?.user_metadata?.email);
  const nameTrimmer = (email) => {
    const name = email?.split("@")[0];
    const finalTrim = name?.substring(0, 5);
    return finalTrim;
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <aside className="fixed top-0 left-0 w-[15%] sm:w-[10%] md:w-[7%] lg:w-[15%] h-full border-r-[1px] flex flex-col">
        <div className="p-4">
          <h1 className="text-xl font-medium flex items-center gap-1">
            <span className="hidden lg:inline">User Panel</span>
          </h1>
          <h1 className="mt-5 text-sm lg:text-base flex items-center gap-3">
            <Image
              src={toyAvatar}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <h1 className=" hidden lg:flex">
              {nameTrimmer(user?.user_metadata?.email)}
            </h1>
          </h1>
        </div>
        <nav className="flex-1">
          <ul>
            <li
              className={`p-4 cursor-pointer flex items-center gap-1 font-medium ${
                activeTab !== "tickets" ? "text-gray-500" : null
              }`}
              onClick={() => setActiveTab("tickets")}
            >
              <Tag className="w-5" />
              <span className="hidden lg:inline md:text-sm lg:text-sm">
                My Tickets
              </span>
            </li>
            <li
              className={`p-4 cursor-pointer flex items-center gap-1 font-medium ${
                activeTab !== "myEvents" ? "text-gray-500" : null
              }`}
              onClick={() => setActiveTab("myEvents")}
            >
              <GraduationCap className="w-5" />
              <span className="hidden lg:inline md:text-sm lg:text-sm">
                My Events
              </span>
            </li>

            <li className="p-4 cursor-pointer flex items-center gap-1 font-medium text-gray-500">
              <Mail className="w-5" />
              <span className="hidden lg:inline md:text-sm lg:text-sm ">
                Reports
              </span>
            </li>
          </ul>
        </nav>
        <div className="p-4 flex flex-col space-y-3">
          <Link href={"/"} className="aside-btn">
            <House />
            <span className="hidden lg:inline">Home</span>
          </Link>
          <button onClick={logOutUser} className="aside-btn">
            <LogOut />
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 ml-[15%] sm:ml-[10%] md:ml-[7%] lg:ml-[15%] min-w-0 h-full overflow-y-auto">
        {renderedTab}
      </main>
    </div>
  );
}

export default DashboardPage;
