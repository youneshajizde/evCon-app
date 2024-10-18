import { MapPin } from "lucide-react";
import React from "react";
import { participatedUsers } from "@/lib/constants";
import Image from "next/image";
import imgPlaceholder from "@/public/assets/imgplaceholder.png";

function Event({ title, address, img, date }) {
  const signedUser = participatedUsers.map((user, index) => (
    <Image
      key={index}
      src={user}
      width={40}
      height={40}
      style={{
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        objectFit: "cover",
      }}
      className="border-2 border-white"
    />
  ));
  return (
    <div className="event-card">
      <div className="relative">
        <Image
          src={img === null ? imgPlaceholder : img}
          width={800}
          height={600}
          className="rounded-xl w-full h-[200px] object-cover"
        />
        <span className="bg-white absolute top-3 right-3 font-medium text-red-600 text-center rounded-xl py-2 px-3">
          <span className="text-xs text-black">{date}</span> <br />
        </span>
      </div>

      <div className="space-y-3 mt-3">
        <h1 className="text-base font-medium">{title}</h1>
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-gray-400" />
          <p className="text-xs text-gray-400">{address}</p>
        </span>

        <span className="signed-users flex items-center justify-between mt-3">
          <div className="flex -space-x-2">{signedUser}</div>
          <label htmlFor="" className="font-medium text-sm">
            10 subs
          </label>
        </span>
      </div>
    </div>
  );
}

export default Event;
