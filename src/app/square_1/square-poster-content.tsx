"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type MeetingData = {
  title: string;
  subtitle: string;
  description: string;
  when_where: string;
  schedule: string;
  what_to_expect: string;
  Speaker_0: {
    name_0: string;
    picture_0: string;
    bio_0: string;
    link1_0: string;
    link2_0: string;
  };
};

export default function SquarePosterContent({ data }: { data: MeetingData }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-black px-4 pt-16 pb-16">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />

      <div className="w-[1080px] h-[1080px] relative bg-white text-black overflow-hidden">
        {/* Content Container */}
        <div className="relative z-10 w-full h-full p-12 flex flex-col">
          {/* Title Block */}
          <motion.div
            className="border-8 border-black p-8 mb-8 transform -rotate-2 bg-white/90"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-6 uppercase tracking-tight leading-none">
              Schedule
            </h1>
            <div className="text-2xl font-mono transform rotate-1">
              {data.subtitle}
            </div>
          </motion.div>

          {/* Schedule Details */}
          <motion.div
            className="border-l-8 border-black pl-6 transform -rotate-1 bg-white/80 flex-grow"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="font-mono text-2xl whitespace-pre-wrap">
              {data.schedule}
            </div>
          </motion.div>

          {/* Footer with Hashtag and Links */}
          <motion.div
            className="mt-auto pt-4 flex justify-between items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex gap-4">
              <Link href={data.Speaker_0.link1_0} target="_blank">
                <Button
                  variant="outline"
                  className="border-black hover:bg-black hover:text-white"
                >
                  Register Now
                </Button>
              </Link>
            </div>
            <div className="flex gap-4 items-center transform -rotate-2">
              <div className="text-6xl font-bold font-mono">#</div>
              <div className="text-4xl font-bold uppercase">MaxBerlin</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
