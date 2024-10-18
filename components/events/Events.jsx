"use client";

import React, { useEffect, useState } from "react";
import Event from "./Event";
import supabase from "@/lib/supabaseClient";
import { ColorRing } from "react-loader-spinner";
import Link from "next/link";
import Pagination from "./Paginations";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages
  const eventsPerPage = 6; // Define the number of events per page

  const getEvents = async (page = 1) => {
    try {
      setLoading(true);
      const from = (page - 1) * eventsPerPage;
      const to = from + eventsPerPage - 1;

      const { data, error, count } = await supabase
        .from("events")
        .select("*", { count: "exact" }) // To get total count of events
        .eq("state", "approved")
        .range(from, to);

      if (error) {
        setError(error.message);
        console.log("Error fetching events: ", error.message);
      } else {
        setEvents(data);
        setTotalPages(Math.ceil(count / eventsPerPage)); // Calculate total pages
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents(currentPage); // Fetch events when page loads or current page changes
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Set the new page
    }
  };

  const renderedEvents = events.map((event, index) => (
    <Link href={`/event/${event.id}`} key={index}>
      <Event
        title={event.title}
        address={event.address}
        img={event.image_url}
        date={event.date}
      />
    </Link>
  ));

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  if (error) {
    return <p>Failed to fetch the events</p>;
  }

  return (
    <section>
      <h1 className="text-2xl font-normal">Upcoming Events</h1>
      <section className="events">{renderedEvents}</section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default Events;
