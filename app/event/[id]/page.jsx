"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import EventImg from "./components/EventImg";
import EventDetail from "./components/EventDetail";
import supabase from "@/lib/supabaseClient";
import { ColorRing } from "react-loader-spinner";
function page({ params }) {
  const { id } = params;
  const [event, setEvent] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const getEvent = async (id) => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error.message);
        setError("failed to fetch the event!");
      } else {
        setEvent(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getEvent(id);
    }
  }, [id]);

  const emailTrimmer = (str) => {
    return str.split("@")[0];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="w-[90%] mx-auto  flex flex-col ">
      <Navbar />

      <div className="flex flex-col lg:flex-row justify-between mt-9 gap-7 h-auto pt-16">
        <EventImg img={event.image_url} address={event.address} />

        <EventDetail
          title={event.title}
          desc={event.description}
          scheduler={event.scheduler_id}
          price={event.price}
          variant={event.variant}
          schedulerEmail={emailTrimmer(event.scheduler_email)}
          id={id}
        />
      </div>

      <div className="w-full mt-10">
        <h1 className="text-2xl font-semibold border-b-[1px] border-gray-300 flex items-center gap-2">
          Comments
          <span className="bg-red-600 text-white text-xs font-medium rounded-full p-1">
            24
          </span>
        </h1>
        <section className="events"></section>
      </div>
    </section>
  );
}

export default page;
