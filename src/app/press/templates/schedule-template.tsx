"use client";

import { MeetupWithSlug } from "@/interfaces/meeting";

export default function ScheduleTemplate({ data }: { data: MeetupWithSlug }) {
  return (
    <div className="w-full h-full relative bg-white text-black">
      <div className="w-full h-full p-8 flex flex-col">
        {/* Title */}
        <div className="border-4 border-black p-4 mb-4 transform -rotate-1 bg-white">
          <h1 className="text-3xl font-bold uppercase tracking-tight leading-none">
            Event Schedule
          </h1>
          <h2 className="text-xl mt-1 font-mono">{data.title}</h2>
        </div>

        {/* Schedule Content */}
        <div className="flex-1 overflow-hidden">
          <div className="font-mono text-sm whitespace-pre-wrap border-l-4 border-black pl-4 py-2">
            {data.schedule}
          </div>
        </div>

        {/* Event Info */}
        <div className="mt-auto pt-4 border-t-4 border-black">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-mono text-sm whitespace-pre-wrap">
                {data.when_where}
              </div>
            </div>

            <div className="flex gap-2 items-center transform -rotate-3">
              <div className="text-3xl font-bold font-mono">#</div>
              <div className="text-xl font-bold uppercase tracking-tighter">
                MaxBerlin
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
