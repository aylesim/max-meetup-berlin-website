"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MeetingData, Speaker, SpeakerIndex } from "@/interfaces/meeting";
import { useSearchParams } from "next/navigation";

// Client component for the back button
function BackButton() {
  const searchParams = useSearchParams();
  const fromArchive = searchParams.get("from") === "archive";

  return (
    <div className="absolute top-4 left-4 z-20">
      <Link href={fromArchive ? "/archive" : "/"}>
        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-mono text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors transform hover:-rotate-1">
          ← Back to {fromArchive ? "Archive" : "Home"}
        </button>
      </Link>
    </div>
  );
}

export default function MeetingInfo({ data }: { data: MeetingData }) {
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);
  const speakerRefs = React.useRef<{ [key: number]: HTMLDivElement | null }>(
    {}
  );

  const scrollToSpeaker = (index: number) => {
    if (speakerRefs.current[index]) {
      speakerRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black text-black dark:text-white px-4 pt-16 pb-16">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />

      {/* Back Button with Suspense */}
      <Suspense
        fallback={
          <div className="absolute top-4 left-4 z-20">
            <Link href="/">
              <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-mono text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors transform hover:-rotate-1">
                ← Back to Home
              </button>
            </Link>
          </div>
        }
      >
        <BackButton />
      </Suspense>

      <motion.div
        className="z-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title Section */}
        <div className="border-4 border-black dark:border-white p-6 md:p-8 lg:p-10 mb-8 transform -rotate-1">
          <h1 className="text-[min(7.5vw,5rem)] md:text-[min(8vw,6.5rem)] font-bold mb-6 md:mb-8 uppercase tracking-[-0.06em] w-full whitespace-normal leading-[1.3] flex-shrink-0">
            {data.title}
          </h1>
          <div className="text-3xl md:text-[1.5rem] font-mono transform rotate-1">
            {data.subtitle}
          </div>
        </div>

        {/* Featured Speakers List */}
        <motion.div
          className="mb-8 border-r-4 border-black dark:border-white pr-3 transform -rotate-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">
            Featuring
          </h2>
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((index) => {
              const speakerIndex = index as SpeakerIndex;
              const speakerKey = `Speaker_${speakerIndex}` as const;
              const speakerNameKey = `name_${speakerIndex}` as const;
              const activityTitleKey = "activityTitle" as const;
              const speaker = data[speakerKey];
              if (!speaker || !speaker[speakerNameKey]) return null;

              return (
                <span
                  key={index}
                  className="inline-block bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-sm font-mono transform hover:rotate-1 transition-transform cursor-pointer"
                  onClick={() => scrollToSpeaker(index)}
                >
                  {speaker[speakerNameKey]}
                  {speaker[activityTitleKey] && (
                    <span className="ml-1 text-gray-300 dark:text-gray-500">
                      — {speaker[activityTitleKey]}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Time and Location + Schedule Section */}
        <div className="flex flex-col gap-4">
          {/* Time and Location Section */}
          <motion.div
            className="border-l-4 border-black dark:border-white pl-3 transform rotate-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">
              When & Where
            </h2>
            <div className="font-mono">
              <div className="text-base whitespace-pre-wrap">
                {data.when_where}
              </div>
            </div>
          </motion.div>

          {/* Event Link Section */}
          {data.event_link && (
            <motion.div
              className="border-l-4 border-black dark:border-white pl-3 transform -rotate-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href={data.event_link}
                target="_blank"
                className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-mono text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors transform hover:-rotate-1"
              >
                Reserve a Spot →
              </Link>
            </motion.div>
          )}

          {/* Schedule Section */}
          <motion.div
            className="border-l-4 border-black dark:border-white pl-3 transform -rotate-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}
              className="w-full text-left flex items-center justify-between group hover:bg-black/5 rounded-lg px-2 py-1 transition-colors"
            >
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold uppercase tracking-tight">
                  Schedule
                </h2>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-300">
                  {isScheduleExpanded ? "(click to hide)" : "(click to show)"}
                </span>
              </div>
              <span
                className={`transform transition-transform duration-300 ${
                  isScheduleExpanded ? "rotate-180" : ""
                } text-gray-600 dark:text-gray-300`}
              >
                ▼
              </span>
            </button>
            <div
              className={`font-mono overflow-hidden transition-all duration-300 ease-in-out mt-2 ${
                isScheduleExpanded
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-base whitespace-pre-wrap">
                {data.schedule}
              </div>
            </div>
          </motion.div>
        </div>

        {/* What to Expect Section */}
        <motion.div
          className="mt-16 border-t-4 border-black dark:border-white pt-8 transform rotate-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-8 uppercase tracking-tight text-center">
            What to Expect
          </h2>
          <div className="text-lg font-mono space-y-4">
            <p className="whitespace-pre-wrap">{data.what_to_expect}</p>
          </div>
        </motion.div>

        {/* People Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 uppercase tracking-tight text-center">
            Featured Speakers
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {[0, 1, 2, 3, 4, 5, 6].map((index) => {
              const speakerIndex = index as SpeakerIndex;
              const speakerKey = `Speaker_${speakerIndex}` as const;
              const speakerNameKey = `name_${speakerIndex}` as const;
              const pictureKey = `picture_${speakerIndex}` as const;
              const bioKey = `bio_${speakerIndex}` as const;
              const link1Key = `link1_${speakerIndex}` as const;
              const link2Key = `link2_${speakerIndex}` as const;
              const shortdescriptionKey = "shortdescription" as const;
              const activityTitleKey = "activityTitle" as const;
              const speaker = data[speakerKey];
              if (!speaker || !speaker[speakerNameKey]) return null;

              return (
                <motion.div
                  key={index}
                  ref={(el) => {
                    speakerRefs.current[index] = el;
                  }}
                  className="border-4 border-black dark:border-white p-4 transition-all"
                  initial={{
                    opacity: 0,
                    y: 20,
                    rotate: index % 2 === 0 ? 0.5 : -0.5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: index % 2 === 0 ? 0.5 : -0.5,
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex gap-4">
                    {/* Left side - Image */}
                    <div className="w-1/3 flex-shrink-0">
                      <div className="aspect-square overflow-hidden border-2 border-black dark:border-white">
                        <Image
                          src={speaker[pictureKey] ?? ""}
                          alt={speaker[speakerNameKey] ?? ""}
                          width={150}
                          height={150}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-mono text-xl font-bold">
                        {speaker[speakerNameKey]}
                      </h3>

                      {speaker[activityTitleKey] && (
                        <p className="text-base font-mono font-bold">
                          {speaker[activityTitleKey]}
                        </p>
                      )}

                      {speaker[shortdescriptionKey] && (
                        <p className="text-sm font-mono mt-1">
                          {speaker[shortdescriptionKey]}
                        </p>
                      )}

                      <p className="text-xs font-mono mt-1 mb-2 text-gray-700 dark:text-gray-300">
                        {speaker[bioKey]}
                      </p>

                      <div className="flex gap-2 mt-auto">
                        {speaker[link1Key] && (
                          <Link
                            href={speaker[link1Key] as string}
                            target="_blank"
                            className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 font-mono text-xs hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                          >
                            Website
                          </Link>
                        )}
                        {speaker[link2Key] && (
                          <Link
                            href={speaker[link2Key] as string}
                            target="_blank"
                            className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 font-mono text-xs hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                          >
                            Link 2
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
