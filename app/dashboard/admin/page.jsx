"use client";

import {
  CalendarCog,
  House,
  LogOut,
  Mail,
  MessageCircleWarning,
  Slack,
} from "lucide-react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import adminAuth from "@/lib/withAuthAdmin";

const EventManagement = dynamic(() => import("./components/EventManagement"), {
  ssr: false,
});

const NewsLetterManagement = dynamic(
  () => import("./components/NewsLetterManagement"),
  {
    ssr: false,
  }
);

function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("event");

  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminPasskey");
      router.push("/sign-up");
    }
  };

  let renderedTab = "";
  switch (activeTab) {
    case "event":
      renderedTab = <EventManagement />;
      break;
    case "newsletter":
      renderedTab = <NewsLetterManagement />;
      break;
    default:
      break;
  }

  return (
    <div className="flex w-full h-screen overflow-hidden main-container">
      {/* Set the aside to fixed */}
      <aside className="fixed top-0 left-0 w-[15%] sm:w-[10%] md:w-[7%] lg:w-[15%] h-full border-r-[1px] flex flex-col">
        <div className="p-4">
          <h1 className="text-xl font-medium flex items-center gap-1">
            <Slack className="text-red-600" />
            <span className="hidden lg:inline">EvCon</span>
          </h1>
        </div>
        <nav className="flex-1">
          <ul>
            <li
              className={`p-4 cursor-pointer flex items-center gap-1 font-medium ${
                activeTab !== "event" && "text-gray-500"
              }`}
              onClick={() => setActiveTab("event")}
            >
              <CalendarCog className="w-5" />
              <span className="hidden lg:inline md:text-sm lg:text-sm">
                Event management
              </span>
            </li>

            <li
              className={`p-4 cursor-pointer flex items-center gap-1 font-medium ${
                activeTab !== "newsletter" && "text-gray-500"
              }`}
              onClick={() => setActiveTab("newsletter")}
            >
              <Mail className="w-5" />
              <span className="hidden lg:inline md:text-sm lg:text-sm">
                Newsletter Users
              </span>
            </li>
            <li className="p-4 cursor-pointer flex items-center gap-1 font-medium text-gray-500">
              <MessageCircleWarning className="w-5" />
              <span className="hidden lg:inline md:text-sm lg:text-sm ">
                Reports
              </span>
            </li>
          </ul>
        </nav>
        <div className="p-4 flex flex-col space-y-3">
          <Link href={"/sign-up"} className="aside-btn">
            <House />
            <span className="hidden lg:flex">Home</span>
          </Link>
          <button onClick={logOut} className="aside-btn">
            <LogOut />
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Add margin to the main content to avoid overlap with the fixed aside */}
      <main className="flex-1 p-6 ml-[15%] sm:ml-[10%] md:ml-[7%] lg:ml-[15%] min-w-0 h-full overflow-y-auto">
        {renderedTab}
      </main>
    </div>
  );
}

export default adminAuth(DashboardPage);
