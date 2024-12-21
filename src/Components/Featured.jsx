import React from "react";
import Card1 from "./Card1";

function Featured({ title, containerClass }) {
  return (
    <div
      className={`mt-[10vh] mb-[5vh] relative md:mt-[12vh] w-full min-h-[89vh] md:min-h-[65vh] md:px-4 px-2 ${containerClass}`}
    >
      <div className="absolute h-full w-full rounded-2xl md:px-4 px-2 top-0 left-0">
        <div className="w-full h-full rounded-2xl bg-custom-gradient opacity-35">
          <div className="bg-black/30 rounded-2xl w-full h-full"></div>
        </div>
      </div>
      <div className="w-full h-full top-0 left-0 absolute z-10 font-tanker p-4 rounded-xl">
        <h1 className="text-black flex items-center justify-between md:px-4 text-4xl underline text-center md:text-left md:text-5xl">
          {title}{" "}
          <span>
            <button className="text-lg md:text-xl text-white bg-black px-4 py-1 rounded-lg transition-all ease-in-out duration-300 hover:text-black hover:bg-white">
              View All
            </button>
          </span>
        </h1>
        <div className="mt-4 w-full md:px-4 grid gap-4 grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1">
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
        </div>
      </div>
    </div>
  );
}

export default Featured;
