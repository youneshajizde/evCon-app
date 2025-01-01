"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import EventImg from "./components/EventImg";
import EventDetail from "./components/EventDetail";
import supabase from "@/lib/supabaseClient";
import { ColorRing } from "react-loader-spinner";
import Event from "@/components/events/Event";
import Link from "next/link";
import Footer from "@/components/Footer";
function Page({ params }) {
  const { id } = params;
  const [event, setEvent] = useState();
  const [events, setEvents] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const emailTrimmer = (str) => {
    return str.split("@")[0];
  };
  const getEvent = async (id) => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      const { data: allEvents, error: difError } = await supabase
        .from("events")
        .select("*")
        .eq("variant", data?.variant);

      if (error) {
        console.log(error.message);
        setError("failed to fetch the event!");
      } else {
        setEvent(data);
        setEvents(allEvents);
        console.log(data);
        console.log(allEvents);
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

  const randomlyRendered = (arr) => {
    return arr
      ?.sort(() => Math.random() - 0.5) // Shuffle the array
      .slice(0, 3);
  };

  let randomized = randomlyRendered(events);

  const items = randomized?.map((event, index) => (
    <Link href={`/event/${event.id}`} key={index}>
      <Event
        title={event?.title}
        address={event?.address}
        img={event?.image_url}
        date={event?.date}
      />
    </Link>
  ));

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
    <div className="main-container">
      {" "}
      <section className="w-[90%] mx-auto  flex flex-col">
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
          <h1 className="text-2xl font-semibold  flex items-center gap-2">
            Similar Events
          </h1>
          <section className="events">{items}</section>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Page;
