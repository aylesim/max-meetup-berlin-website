"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MeetingData, Speaker, SpeakerIndex } from "@/interfaces/meeting";

export default function SpeakerInfo({ data }: { data: MeetingData }) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerIndex>(0);

  const speakers = [data.Speaker_0, data.Speaker_1, data.Speaker_2].filter(
    Boolean
  ) as Speaker[];

  const currentSpeaker = speakers[selectedSpeaker];

  const getSpeakerProperty = <K extends string>(
    speaker: Speaker,
    baseKey: K,
    index: number
  ) => {
    const key = `${baseKey}_${index}` as keyof Speaker;
    return speaker[key];
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-black px-4 pt-16 pb-16">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />

      {/* Speaker Selection - Moved outside the square */}
      <motion.div
        className="absolute top-8 flex gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {speakers.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedSpeaker(index as SpeakerIndex)}
            className={`px-6 py-3 font-mono text-xl transform hover:-rotate-1 transition-transform ${
              selectedSpeaker === index
                ? "bg-black text-white"
                : "border-2 border-black"
            }`}
          >
            Speaker {index + 1}
          </button>
        ))}
      </motion.div>

      <div className="w-[1080px] h-[1080px] relative bg-white text-black overflow-hidden">
        <div className="relative z-10 w-full h-full p-12 flex flex-col">
          {currentSpeaker && (
            <motion.div
              key={selectedSpeaker}
              className="flex flex-col h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Name */}
              {getSpeakerProperty(currentSpeaker, "name", selectedSpeaker) && (
                <motion.h2
                  className="text-6xl font-bold mb-6 transform -rotate-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {getSpeakerProperty(currentSpeaker, "name", selectedSpeaker)!}
                </motion.h2>
              )}

              {/* Speaker Info Container */}
              <div className="flex flex-col flex-grow">
                {/* Header Row with Image and Basic Info */}
                <div className="flex gap-8 mb-8">
                  {/* Image Column */}
                  <motion.div
                    className="w-1/2 transform rotate-1"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Image
                      src={
                        getSpeakerProperty(
                          currentSpeaker,
                          "picture",
                          selectedSpeaker
                        )!
                      }
                      alt={
                        getSpeakerProperty(
                          currentSpeaker,
                          "name",
                          selectedSpeaker
                        )!
                      }
                      width={500}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>

                  {/* Basic Info Column */}
                  <motion.div
                    className="w-1/2 flex flex-col"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h1 className="text-4xl font-bold mb-6 font-mono transform -rotate-2">
                      {currentSpeaker.activityTitle || ""}
                    </h1>

                    {currentSpeaker.shortdescription && (
                      <p className="text-2xl font-mono mb-6 border-l-4 border-black pl-4">
                        {currentSpeaker.shortdescription}
                      </p>
                    )}

                    {/* Links */}
                    <div className="mt-auto flex gap-4">
                      {getSpeakerProperty(
                        currentSpeaker,
                        "link2",
                        selectedSpeaker
                      ) && (
                        <Link
                          href={
                            getSpeakerProperty(
                              currentSpeaker,
                              "link2",
                              selectedSpeaker
                            )!
                          }
                          target="_blank"
                          className="border-2 border-black px-6 py-3 font-mono text-xl hover:bg-black hover:text-white transition-colors transform hover:-rotate-1"
                        >
                          Link 2
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Bio Section */}
                <motion.div
                  className="font-mono text-xl whitespace-pre-wrap leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getSpeakerProperty(currentSpeaker, "bio", selectedSpeaker)!}
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
