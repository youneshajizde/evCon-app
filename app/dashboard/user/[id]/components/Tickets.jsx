import supabase from "@/lib/supabaseClient";
import { useUser } from "@/lib/userContext";
import React, { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

function Tickets() {
  const { user } = useUser();
  const [userTickets, setUserTickets] = useState();
  const [userEvents, setUserEvents] = useState();
  const [loading, setLoading] = useState(true);

  console.log(user);
  const getTickets = async () => {
    try {
      const { data: ticketsData, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        console.log("error happened : ", error.message);
      } else {
        console.log("these are the events id", ticketsData);
        setUserTickets(ticketsData);

        const eventsId = ticketsData.map((ticket) => ticket?.event_id);
        getUserEvents(eventsId);
        console.log(eventsId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserEvents = async (eventsId) => {
    if (eventsId.length === 0) return;

    try {
      const { data: eventsData, error } = await supabase
        .from("events")
        .select("*")
        .in("id", eventsId);

      if (error) {
        console.log("error happened", error.message);
      } else {
        setUserEvents(eventsData);
        console.log(eventsData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (user?.id) {
      getTickets();
    }
  }, [user, userTickets]);

  const renderedTickets = userEvents?.map((event) => (
    <div className="ticket border-[3px] border-dashed rounded-xl w-full flex flex-col space-y-5 p-5">
      <h1>Event : {event?.title}</h1>
      <h1 className="flex items-center gap-1">
        Date :<span className="text-sm font-medium">{event?.date}</span>
      </h1>
      <h1 className="flex items-center gap-1">
        <span className="text-sm font-medium">{event?.address}</span>
      </h1>
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
      {renderedTickets}
    </section>
  );
}

export default Tickets;
