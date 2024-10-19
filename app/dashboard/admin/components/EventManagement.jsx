import MyTable from "@/components/eventTable/MyTable";
import supabase from "@/lib/supabaseClient";
import { AudioLines, TicketX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

function EventManagement() {
  const [approvedEventCount, setApprovedEventCount] = useState();
  const [cancelledEventCount, setCancelledEventCount] = useState();
  const [allEvents, setAllEvents] = useState();
  const [loading, setLoading] = useState(true);

  const getEvents = async () => {
    try {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.log("error happened", approvedError.message);
      } else {
        console.log(data);
        setApprovedEventCount(
          data.filter((event) => event.state === "approved").length
        );
        setCancelledEventCount(
          data?.filter((e) => e?.state === "cancelled").length
        );
        setAllEvents(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateEventState = (id, newState) => {
    setAllEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, state: newState } : event
      )
    );
  };
  const updateStateInSupabase = async (id, newState) => {
    try {
      const { error } = await supabase
        .from("events")
        .update({ state: newState })
        .eq("id", id);

      if (error) {
        console.error("Error updating state:", error.message);
      } else {
        updateEventState(id, newState);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

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
    <main className="flex-1 p-6 ">
      <h2 className="text-3xl font-semibold">Manage the events</h2>

      <div className="flex flex-col  md:flex-row  gap-9  mt-5">
        <div className="relative w-full md:w-[280px] min-h-[140px] bg-white rounded-xl border-[1px] flex items-center justify-center gap-5">
          <AudioLines size={50} />
          <span className="text-5xl font-semibold">{approvedEventCount}</span>
          <span className="absolute top-3 left-3 text-sm font-medium">
            Events
          </span>
        </div>
        <div className="relative w-full md:w-[280px] min-h-[140px] bg-white rounded-xl border-[1px] flex items-center justify-center gap-5">
          <TicketX size={50} />
          <span className="text-5xl font-semibold">{cancelledEventCount}</span>
          <span className="absolute top-3 left-3 text-sm font-medium">
            Deleted
          </span>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-lg font-medium">Events state</h1>
        <MyTable
          data={allEvents}
          updateStateInSupabase={updateStateInSupabase}
        />
      </div>
    </main>
  );
}

export default EventManagement;
