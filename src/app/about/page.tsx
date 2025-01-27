"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
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
            About Us
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <motion.div
            className="border-l-4 border-black pl-6 transform rotate-1 flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="font-mono text-lg space-y-6">
              <p>
                A new series of Max meetups in person has started in Berlin!
              </p>
              <p>
                Sharing Max patches and patching methods are grounding
                principles behind Max's philosophy. So we, a small group of
                Maxers established in Berlin, thought it was time to call the
                local Max community to action.
              </p>
              <p>
                We know you are plenty, so whether you are a skilled creative
                coder, a sound engineer, a music producer, a visual artist, or
                just a curious beginner who wants to learn more about Max and
                its possibilities, you are welcome to join us.
              </p>
              <p>
                Betahaus in Mitte hosts our meetups on a monthly-ish basis.
                Subscribe to the newsletter and follow our page to keep up with
                the news, and be ready to RSVP for the appointments as we
                publish them.
              </p>
            </div>
          </motion.div>

          {/* Team Section - Now on the right */}
          <motion.div
            className="md:w-64 flex flex-col justify-between"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="border-l-4 md:border-l-0 md:border-r-4 border-black pl-4 md:pl-0 md:pr-4">
              <div className="text-sm font-mono mb-1 uppercase tracking-wider text-gray-600">
                When & Where
              </div>
              <div className="font-mono text-base">
                Betahaus, Mitte
                <br />
                Monthly-ish basis
              </div>
            </div>

            <motion.div
              className="mt-8 md:mt-auto pt-8 flex flex-col items-end"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", bounce: 0.3 }}
            >
              <div className="flex flex-col items-end">
                <div className="text-7xl font-bold font-mono">#</div>
                <div className="text-5xl font-bold uppercase tracking-tighter -mt-2">
                  MaxBerlin
                </div>
              </div>
              <div className="mt-6 text-right">
                <div className="font-mono text-xl">Massi, Ale,</div>
                <div className="font-mono text-xl">Riccardo, Edu</div>
                <div className="text-sm font-mono mt-2 text-gray-600">
                  January 2025
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
