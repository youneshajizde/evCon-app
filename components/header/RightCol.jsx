import Image from "next/image";
import React from "react";
import headerImg from "@/public/assets/header-img.png";
import img1 from "@/public/assets/oskara.jpg";

function RightCol() {
  return (
    <div className="second-div flex-1 justify-center hidden sm:block relative">
      <Image src={headerImg} alt="headerImg" objectFit="cover" />
      <div className="rounded-xl bg-gray-200 h-[70px] absolute bottom-9 flex items-center gap-3 p-3 ">
        <div className=" rounded-xl w-[4rem] h-12 relative">
          <Image
            src={img1}
            objectFit="cover"
            sizes="100vw"
            className="absolute rounded-xl"
          />
        </div>
        <h1 className="text-xl font-medium">
          70.0<span className="text-red-600 font-medium">K</span>
        </h1>
        <span className="text-xs text-gray-500 text-center">
          Beloved <br />
          fans
        </span>
      </div>
    </div>
  );
}

export default RightCol;
