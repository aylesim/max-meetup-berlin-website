"use client";

import { motion } from "framer-motion";
import { MeetupWithSlug } from "@/interfaces/meeting";

export default function PosterTemplate({ data }: { data: MeetupWithSlug }) {
  return (
    <div className="w-full h-full relative bg-white text-black">
      {/* Content Container */}
      <div className="relative z-10 w-full h-full p-8 flex flex-col">
        {/* Title Block */}
        <div className="border-4 border-black p-6 mb-6 transform -rotate-3 bg-white">
          <h1 className="text-6xl font-bold mb-3 uppercase tracking-tighter leading-none">
            {data.title}
          </h1>
          <div className="text-xl font-mono transform rotate-1 text-black">
            {data.subtitle}
          </div>
        </div>

        {/* Time and Location */}
        <div className="transform rotate-2 bg-white/90 mb-4">
          <h2 className="text-2xl transform -rotate-2 font-bold mb-2 uppercase tracking-tight text-black/90">
            MAX BERLIN MEETUP
          </h2>
          <div className="font-mono text-lg transform rotate-1 text-right whitespace-pre-wrap leading-tight">
            {data.when_where?.split("\n").slice(0, 2).join("\n")}
          </div>
        </div>

        {/* Footer with Hashtag and Links */}
        <div className="mt-auto pt-4 flex justify-end items-end">
          <div className="flex gap-4 items-center transform -rotate-3">
            <div className="text-5xl font-bold font-mono">#</div>
            <div className="text-3xl font-bold uppercase tracking-tighter">
              MaxBerlin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
