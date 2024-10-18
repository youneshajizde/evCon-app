"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import imgPlaceholder from "@/public/assets/imgPlaceholder.png";
import { Plus } from "lucide-react";
import CreateEvent from "./CreateEvent";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@/lib/userContext";
import { FallingLines } from "react-loader-spinner";

function MyEvents() {
  const [open, setOpen] = useState(false);
  const [myCreatedEvents, setMyCreatedEvents] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const getCreatedEvents = async () => {
    try {
      const { data: createdEvents, error } = await supabase
        .from("events")
        .select("*")
        .eq("scheduler_id", user?.id);

      if (error) {
        console.log("error happened", error.message);
      } else {
        console.log("this is the events created by you :", createdEvents);
        setMyCreatedEvents(createdEvents);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCreatedEvents();
  }, [myCreatedEvents]);

  const renderedCreatedEvents = myCreatedEvents?.map((event) => (
    <div className="ticket border-[3px] rounded-xl w-full flex flex-col relative">
      <div className="relative h-[50%]">
        <Image
          src={event?.image_url === null ? imgPlaceholder : event?.image_url}
          width={0}
          height={0}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <span
          className={`absolute top-2 right-2  text-white text-xs font-medium px-3 py-1 rounded-full ${
            event?.state === "pending" ? "bg-blue-500" : "bg-green-500"
          }`}
        >
          {event?.state}
        </span>
      </div>
      <div className="p-4 text-sm flex flex-col space-y-3">
        <h1 className="flex items-center gap-1 text-sm">
          Event :<span className="font-medium">{event?.title}</span>
        </h1>
        <h1 className="flex items-center gap-1 text-sm">
          Location :<span className="font-medium">{event?.address}</span>
        </h1>
        <h1 className="flex items-center gap-1">
          Date :<span className="font-medium">{event?.date}</span>
        </h1>
      </div>
    </div>
  ));

  if (loading)
    return (
      <FallingLines
        color="#f44336"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    );
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {renderedCreatedEvents}
      <div
        onClick={() => setOpen(true)}
        className="border-[3px] border-dashed rounded-xl flex items-center justify-center cursor-pointer"
      >
        <Plus size={70} className="text-gray-400" />
      </div>

      {/* CreateEvent Dialog is moved outside of the clickable div */}
      <CreateEvent open={open} setOpen={setOpen} />
    </section>
  );
}

export default MyEvents;
