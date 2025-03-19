"use client";

import { MeetupWithSlug, SpeakerIndex } from "@/interfaces/meeting";
import Image from "next/image";

// Helper type for dynamic Speaker keys
type SpeakerKey = `Speaker_${SpeakerIndex}`;
type NameKey = `name_${SpeakerIndex}`;
type PictureKey = `picture_${SpeakerIndex}`;
type BioKey = `bio_${SpeakerIndex}`;

export default function SpeakerTemplate({
  data,
  speakerIndex = 0,
}: {
  data: MeetupWithSlug;
  speakerIndex?: number;
}) {
  // Ensure speakerIndex is a valid SpeakerIndex
  const idx = speakerIndex as SpeakerIndex;

  // Get current speaker data
  const speakerKey = `Speaker_${idx}` as SpeakerKey;
  const nameKey = `name_${idx}` as NameKey;
  const pictureKey = `picture_${idx}` as PictureKey;
  const bioKey = `bio_${idx}` as BioKey;

  const speaker = data[speakerKey];
  if (!speaker || !speaker[nameKey]) {
    return <div className="p-4">No speaker information available</div>;
  }

  return (
    <div className="w-full h-full relative bg-white text-black overflow-hidden">
      <div className="relative z-10 w-full h-full p-4 flex flex-col">
        {/* Name */}
        <h2 className="text-4xl font-bold mb-2 transform -rotate-2">
          {speaker[nameKey]}
        </h2>

        {/* Speaker Info Container */}
        <div className="flex flex-col flex-1">
          {/* Header Row with Image and Basic Info */}
          <div className="flex gap-3 mb-2">
            {/* Image Column */}
            {speaker[pictureKey] && (
              <div className="w-1/2 transform rotate-1">
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "1/1" }}
                >
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
              {typeof speaker === "object" && speaker.activityTitle && (
                <h1 className="text-lg font-bold mb-2 font-mono transform -rotate-2 break-words">
                  {speaker.activityTitle}
                </h1>
              )}

              {typeof speaker === "object" && speaker.shortdescription && (
                <p className="text-xs font-mono mb-2 border-l-4 border-black pl-2 break-words">
                  {speaker.shortdescription}
                </p>
              )}
            </div>
          </div>

          {/* Bio Section with maximized height */}
          <div
            className="font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-y-auto flex-grow"
            style={{ maxHeight: "240px" }}
          >
            {speaker[bioKey]}
          </div>

          {/* Minimized title reference */}
          <div className="mt-1 text-right">
            <small className="text-xs italic opacity-75">{data.title}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
