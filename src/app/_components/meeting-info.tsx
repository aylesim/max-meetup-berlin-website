"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

type SpeakerIndex = 0 | 1 | 2 | 3 | 4 | 5;

type Speaker = {
  [K in SpeakerIndex as `name_${K}`]?: string;
} & {
  [K in SpeakerIndex as `picture_${K}`]?: string;
} & {
  [K in SpeakerIndex as `bio_${K}`]?: string;
} & {
  [K in SpeakerIndex as `link1_${K}`]?: string;
} & {
  [K in SpeakerIndex as `link2_${K}`]?: string;
};

type MeetingData = {
  title: string;
  subtitle: string;
  description: string;
  when_where: string;
  schedule: string;
  what_to_expect: string;
} & {
  [K in SpeakerIndex as `Speaker_${K}`]?: Speaker;
};

export default function MeetingInfo({ data }: { data: MeetingData }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black px-4 pt-16 pb-16">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />

      <motion.div
        className="z-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title Section */}
        <div className="border-4 border-black p-6 md:p-8 lg:p-10 mb-8 transform -rotate-1">
          <h1 className="text-[min(7.5vw,5rem)] md:text-[min(8vw,6.5rem)] font-bold mb-6 md:mb-8 uppercase tracking-[-0.06em] w-full whitespace-normal leading-[1.3] flex-shrink-0">
            {data.title}
          </h1>
          <div className="text-3xl md:text-[1.5rem] font-mono transform rotate-1">
            {data.subtitle}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Time and Location Section */}
          <motion.div
            className="border-l-4 border-black pl-4 transform rotate-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">
              When & Where
            </h2>
            <div className="font-mono space-y-2">
              <div className="text-xl whitespace-pre-wrap">
                {data.when_where}
              </div>
            </div>
          </motion.div>

          {/* Schedule Section */}
          <motion.div
            className="border-t-4 md:border-t-0 md:border-l-4 border-black pl-4 pt-4 md:pt-0 transform -rotate-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">
              Schedule
            </h2>
            <div className="font-mono space-y-4">
              <div className="text-lg whitespace-pre-wrap">{data.schedule}</div>
            </div>
          </motion.div>
        </div>

        {/* What to Expect Section */}
        <motion.div
          className="mt-16 border-t-4 border-black pt-8 transform rotate-1"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const speakerIndex = index as SpeakerIndex;
              const speakerKey = `Speaker_${speakerIndex}` as const;
              const nameKey = `name_${speakerIndex}` as const;
              const pictureKey = `picture_${speakerIndex}` as const;
              const bioKey = `bio_${speakerIndex}` as const;
              const link1Key = `link1_${speakerIndex}` as const;
              const link2Key = `link2_${speakerIndex}` as const;

              const speaker = data[speakerKey];
              if (!speaker || !speaker[nameKey]) return null;

              return (
                <motion.div
                  key={index}
                  className="border-4 border-black p-6 transform hover:rotate-1 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Image
                    src={speaker[pictureKey] ?? ""}
                    alt={speaker[nameKey] ?? ""}
                    width={200}
                    height={200}
                    className="mb-4 w-full object-cover"
                  />
                  <h3 className="text-2xl font-bold mb-2">
                    {speaker[nameKey]}
                  </h3>
                  <p className="font-mono text-lg mb-4">{speaker[bioKey]}</p>
                  <div className="flex gap-4">
                    {speaker[link1Key] && (
                      <Link
                        href={speaker[link1Key] as string}
                        target="_blank"
                        className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-gray-800 transition-colors"
                      >
                        Website
                      </Link>
                    )}
                    {speaker[link2Key] && (
                      <Link
                        href={speaker[link2Key] as string}
                        target="_blank"
                        className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-gray-800 transition-colors"
                      >
                        Link 2
                      </Link>
                    )}
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
