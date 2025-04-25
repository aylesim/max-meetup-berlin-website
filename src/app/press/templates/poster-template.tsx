"use client";

import { motion } from "framer-motion";
import { MeetupWithSlug } from "@/interfaces/meeting";

export default function PosterTemplate({ data }: { data: MeetupWithSlug }) {
  return (
    <div className="w-full h-full relative bg-white text-black">
      {/* Content Container */}
      <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
        {/* Title Block - Made larger */}
        <div className="border-4 border-black p-5 transform -rotate-2 bg-white w-11/12 mx-auto mt-8">
          <h1 className="text-7xl font-bold mb-3 uppercase tracking-tighter leading-none">
            {data.title}
          </h1>
          <div className="text-2xl font-mono transform rotate-1 text-black">
            {data.subtitle}
          </div>
        </div>

        {/* Middle area - Time and Location */}
        <div className="transform rotate-1 w-11/12 mx-auto">
          <h2 className="text-4xl font-bold mb-3 uppercase tracking-tight text-black">
            MAX BERLIN NETWORK
          </h2>
          <div className="font-mono text-lg transform rotate-0 whitespace-pre-wrap leading-tight">
            {data.when_where}
          </div>
        </div>

        {/* Footer with Hashtag and Links */}
        <div className="mb-8 pb-4 flex justify-end items-end pr-6">
          <div className="flex gap-2 items-center transform -rotate-2">
            <div className="text-7xl font-bold font-mono">#</div>
            <div className="text-5xl font-bold uppercase tracking-tighter">
              MaxBerlin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
