"use client";

import { useUser } from "@/lib/userContext";
import Link from "next/link";

function EventDetail({ title, desc, id, price, variant, schedulerEmail }) {
  const { user } = useUser();

  return (
    <div className="w-full lg:w-[35%] bg-slate-100 rounded-xl payment sticky overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 h-auto lg:h-[500px]">
      <div className="w-full h-full rounded-xl py-3 px-6 flex flex-col space-y-7">
        <h1 className="text-3xl md:text-4xl font-medium">{title}</h1>

        <span className="flex items-center gap-5">
          <label
            htmlFor="state"
            className="py-1 px-4 bg-white text-green-600 text-sm rounded-full font-bold"
          >
            {price}.0$
          </label>
          <label
            htmlFor="variety"
            className="py-1 px-4 bg-gray-200 font-medium text-gray-400 rounded-full text-sm"
          >
            {variant}
          </label>
          <label
            htmlFor="scheduler"
            className="flex items-center gap-1 text-sm"
          >
            by
            <span className="text-blue-600 rounded-full font-medium text-xs">
              {schedulerEmail}
            </span>
          </label>
        </span>

        {!user ? (
          <button
            className="text-center bg-gray-400 rounded-xl py-1 w-28 text-white"
            disabled={true}
          >
            Get Ticket
          </button>
        ) : (
          <Link
            href={`/event/${id}/payment`}
            className="bg-blue-600 hover:bg-blue-800 py-1 text-white w-28 text-center rounded-xl cursor-pointer"
          >
            Get Ticket
          </Link>
        )}

        <span className="mt-8 flex flex-col space-y-5 overflow-y-auto no-scrollbar">
          <h1 className="text-xl font-medium">Description:</h1>
          <p className="description text-sm text-gray-500 leading-[2rem]">
            {desc}
          </p>
        </span>
      </div>
    </div>
  );
}

export default EventDetail;
