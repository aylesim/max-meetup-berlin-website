"use client";

import { MeetupWithSlug } from "@/interfaces/meeting";

export default function DetailsTemplate({ data }: { data: MeetupWithSlug }) {
  return (
    <div className="w-full h-full relative bg-white text-black">
      <div className="w-full h-full p-8 flex flex-col">
        {/* Title */}
        <div className="border-4 border-black p-6 mb-6 transform -rotate-1 bg-white">
          <h1 className="text-4xl font-bold uppercase tracking-tight leading-none">
            {data.title}
          </h1>
        </div>

        {/* Details Content */}
        <div className="flex-1 overflow-hidden">
          {/* What to Expect Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold uppercase font-mono mb-2 transform -rotate-1">
              What to Expect
            </h2>
            <div
              className="border-l-4 border-black pl-4 font-mono text-sm"
              style={{
                maxHeight: "250px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 11,
                WebkitBoxOrient: "vertical",
              }}
            >
              {data.what_to_expect}
            </div>
          </div>

          {/* Speaker List */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold uppercase font-mono mb-2 transform rotate-1">
              Featured Speakers
            </h2>
            <div className="border-l-4 border-black pl-4 font-mono text-sm">
              <ul className="list-disc list-inside">
                {[
                  "Speaker_0",
                  "Speaker_1",
                  "Speaker_2",
                  "Speaker_3",
                  "Speaker_4",
                  "Speaker_5",
                  "Speaker_6",
                ].map((key, index) => {
                  const speaker = data[key as keyof MeetupWithSlug];
                  if (
                    !speaker ||
                    !speaker[`name_${index}` as keyof typeof speaker]
                  )
                    return null;

                  return (
                    <li key={index} className="mb-1">
                      {speaker[`name_${index}` as keyof typeof speaker]}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Event Time and Location */}
        <div className="mt-auto border-t-4 border-black pt-4">
          <h2 className="text-2xl font-bold uppercase font-mono mb-2">
            When & Where
          </h2>
          <div className="font-mono text-base">{data.when_where}</div>
        </div>
      </div>
    </div>
  );
}
