"use client";

import { MeetupWithSlug, SpeakerIndex } from "@/interfaces/meeting";
import Image from "next/image";
import { useState } from "react";

export default function SpeakerTemplate({ data }: { data: MeetupWithSlug }) {
  // Default to first speaker (index 0)
  const [selectedSpeakerIndex] = useState<SpeakerIndex>(0);

  // Helper function to extract speaker property
  const getSpeakerProperty = <K extends string>(
    speakerKey: string,
    baseKey: K,
    index: number
  ) => {
    const speaker = data[speakerKey as keyof typeof data];
    if (!speaker) return undefined;

    const key = `${baseKey}_${index}` as keyof typeof speaker;
    return speaker[key];
  };

  // Find the first speaker with a name
  const speakerKey = `Speaker_${selectedSpeakerIndex}` as const;
  const nameKey = `name_${selectedSpeakerIndex}` as const;
  const pictureKey = `picture_${selectedSpeakerIndex}` as const;
  const bioKey = `bio_${selectedSpeakerIndex}` as const;

  const speaker = data[speakerKey];
  if (!speaker || !speaker[nameKey]) {
    return <div className="p-4">No speaker information available</div>;
  }

  return (
    <div className="w-full h-full relative bg-white text-black overflow-hidden">
      <div className="relative z-10 w-full h-full p-8 flex flex-col">
        {/* Name */}
        <h2 className="text-5xl font-bold mb-6 transform -rotate-2">
          {speaker[nameKey]}
        </h2>

        {/* Speaker Info Container */}
        <div className="flex flex-col flex-grow">
          {/* Header Row with Image and Basic Info */}
          <div className="flex gap-6 mb-6">
            {/* Image Column */}
            {speaker[pictureKey] && (
              <div className="w-1/2 transform rotate-1 border-2 border-black">
                <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src={speaker[pictureKey] || ""}
                    alt={speaker[nameKey] || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Basic Info Column */}
            <div className="w-1/2 flex flex-col">
              {speaker.activityTitle && (
                <h1 className="text-3xl font-bold mb-4 font-mono transform -rotate-2">
                  {speaker.activityTitle}
                </h1>
              )}

              {speaker.shortdescription && (
                <p className="text-xl font-mono mb-6 border-l-4 border-black pl-4">
                  {speaker.shortdescription}
                </p>
              )}
            </div>
          </div>

          {/* Bio Section */}
          <div
            className="font-mono text-sm whitespace-pre-wrap leading-relaxed mb-auto overflow-hidden"
            style={{ maxHeight: "150px" }}
          >
            {speaker[bioKey]}
          </div>

          {/* Event Info */}
          <div className="mt-4 border-t-2 border-black pt-4">
            <h3 className="text-xl font-bold uppercase transform rotate-1">
              {data.title}
            </h3>
            <p className="font-mono text-sm">
              {data.when_where?.split("\n")[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
