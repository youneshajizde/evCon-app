import React from "react";
import CountUp, { useCountUp } from "react-countup";

function Stat({ count, desc }) {
  useCountUp({
    ref: "counter",
    end: count,
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
    triggerOnce: true, // Only triggers once
  });

  return (
    <div className="flex flex-col xl:flex-row items-center gap-3 text-center xl:text-left">
      {/* Apply a fixed width and monospace font */}
      <span className="font-mono w-[7ch] inline-block text-6xl">
        <CountUp end={count} enableScrollSpy scrollSpyOnce={true} />
      </span>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

export default Stat;
