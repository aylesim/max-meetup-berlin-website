"use client";

import { MeetupWithSlug, SpeakerIndex } from "@/interfaces/meeting";

export default function DetailsTemplate({ data }: { data: MeetupWithSlug }) {
  // Get all available speakers
  const availableSpeakers = Array.from({ length: 7 }, (_, i) => {
    const idx = i as SpeakerIndex;
    const speaker = data[`Speaker_${idx}` as keyof MeetupWithSlug];
    if (!speaker || !speaker[`name_${idx}` as keyof typeof speaker])
      return null;
    return { speaker, index: idx };
  }).filter(Boolean);

  return (
    <div className="w-full h-full relative bg-white text-black">
      <div className="w-full h-full p-5 flex flex-col">
        {/* Title Section */}
        <div className="border-4 border-black p-4 mb-4 transform -rotate-1 bg-white">
          <h1 className="text-4xl font-bold uppercase tracking-tight leading-none">
            {data.title}
          </h1>
          {data.subtitle && (
            <div className="text-base font-mono transform rotate-0 text-black mt-1">
              {data.subtitle}
            </div>
          )}
        </div>

        {/* Speakers Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold uppercase font-mono mb-2 transform -rotate-1 bg-black text-white inline-block px-3 py-1">
            Speakers
          </h2>
          <div className="flex flex-wrap gap-2 leading-4">
            {availableSpeakers.map((item) => {
              if (!item) return null;
              const { speaker, index } = item;
              const name = speaker[
                `name_${index}` as keyof typeof speaker
              ] as string;

              return (
                <div
                  key={index}
                  className="bg-black text-white px-3 py-2 transform hover:rotate-1 transition-transform"
                >
                  <span className="font-bold">{name}</span>
                  {typeof speaker === "object" && speaker.activityTitle && (
                    <span className="text-xs font-mono text-gray-300 ml-2">
                      {speaker.activityTitle}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* What to Expect Section - More Space */}
        <div className="flex-1">
          <h2 className="text-xl font-bold uppercase font-mono mb-2 transform rotate-1 border-b-2 border-black pb-1">
            What to Expect
          </h2>
          <div
            className="font-mono text-xs overflow-auto"
            style={{ maxHeight: "260px" }}
          >
            {data.what_to_expect}
          </div>
        </div>

        {/* MAX BERLIN Network Branding */}
        <div className="mt-auto flex justify-end">
          <div className="text-sm tracking-widest text-gray-700 uppercase font-bold">
            MAX BERLIN NETWORK
          </div>
        </div>
      </div>
    </div>
  );
}
