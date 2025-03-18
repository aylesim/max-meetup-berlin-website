"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MeetingData } from "@/interfaces/meeting";

export default function SquarePosterContent({ data }: { data: MeetingData }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-black px-4 pt-16 pb-16">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />

      <div className="w-[1080px] h-[1080px] relative bg-white text-black overflow-hidden">
        {/* Content Container */}
        <div className="relative z-10 w-full h-full p-12 flex flex-col">
          {/* Title Block */}
          <motion.div
            className="border-4 border-black p-10 mb-12 transform -rotate-3 bg-white "
            initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <h1 className="text-7xl font-bold mb-6 uppercase tracking-tighter leading-none">
              {data.title}
            </h1>
            <div className="text-3xl font-mono transform rotate-1 text-black">
              {data.subtitle}
            </div>
          </motion.div>

          {/* Time and Location */}
          <motion.div
            className="transform rotate-2 bg-white/90 mb-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
          >
            <h2 className="text-5xl tansform -rotate-2 font-bold mb-6 uppercase tracking-tight text-black/90">
              You are invited to our first Max meeting!
            </h2>
            <div className="font-mono text-xl transform rotate-2 text-right whitespace-pre-wrap leading-relaxed">
              {data.when_where}
            </div>
          </motion.div>

          {/* What to Expect */}
          <motion.div
            className=" border-black pl-8 transform -rotate-3 bg-white/90 flex-grow"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.3 }}
          >
            <div className="font-mono text-2xl border-l-4 border-black pl-8 leading-relaxed">
              {data.what_to_expect}
            </div>
          </motion.div>

          {/* Footer with Hashtag and Links */}
          <motion.div
            className="mt-auto pt-8 flex justify-end items-end"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring", bounce: 0.3 }}
          >
            <div className="flex gap-4 items-center transform -rotate-3">
              <div className="text-7xl font-bold font-mono">#</div>
              <div className="text-5xl font-bold uppercase tracking-tighter">
                MaxBerlin
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
