import Image from "next/image";
import React from "react";
import { participatedUsers } from "@/lib/constants";
import imgPlaceholder from "@/public/assets/imgplaceholder.png";

function EventImg({ img, address }) {
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
    <div className="w-full lg:w-[65%] h-[300px] lg:h-[500px]">
      <div className="relative bg-slate-600 w-full h-full rounded-xl overflow-hidden">
        <span className="bg-white absolute top-4 left-6 z-30 rounded-xl py-3 px-3">
          <p className="text-sm text-gray-500 font-medium">
            Date: Friday,
            <span className="font-semibold text-red-600">Sep 27</span>, 2024,
            7:00 PM
          </p>
        </span>
        {/* Image with Gradient Shadow */}
        <Image
          alt="event-Img"
          src={img === null ? imgPlaceholder : img}
          sizes="100vw"
          className="object-cover absolute inset-0 w-full h-full rounded-xl"
          fill
        />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-xl">
          <div className="absolute bottom-5 left-5 w-[90%] flex flex-col md:flex-row justify-between items-start md:items-center text-white px-4">
            <div className="flex flex-col">
              <div className="w-full flex flex-col space-y-7 mt-4">
                <span className="signed-users flex items-center gap-6">
                  <div className="flex -space-x-2"> {signedUser}</div>
                </span>
              </div>
            </div>
            <div className="flex flex-col mt-4 md:mt-0">
              <h3 className="text-md font-medium">The Scheduler</h3>
              <p className="text-xs">Scheduled by Edmund</p>
            </div>
            <div className="flex flex-col mt-4 md:mt-0">
              <h4 className="text-sm font-medium">Location Address</h4>
              <p className="text-xs">{address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventImg;
