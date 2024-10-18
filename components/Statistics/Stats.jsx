"use client";
import React, { useState } from "react";
import Stat from "./Stat";

function Stats() {
  return (
    <section className="mt-20 flex flex-col gap-8 md:flex-row md:items-center md:justify-between text-7xl w-full">
      <Stat
        count={75}
        desc={` More than 70 people have participated in our shows in
        Melbourne`}
      />

      <Stat
        count={62}
        desc=" 62 fans have tried our YouTube subscription since May 2025 and our
        Twitter"
      />

      <Stat
        count={20}
        desc=" 20 events have been executed all around the world with more events"
      />
    </section>
  );
}

export default Stats;
