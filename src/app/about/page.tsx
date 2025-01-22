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
        <motion.div
          className="border-l-4 border-black pl-6 transform rotate-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="font-mono text-lg space-y-6">
            <p>A new series of Max meetups in person has started in Berlin!</p>
            <p>
              Sharing Max patches and patching methods are grounding principles
              behind Max's philosophy. So we, a small group of Maxers
              established in Berlin, thought it was time to call the local Max
              community to action.
            </p>
            <p>
              We know you are plenty, so whether you are a skilled creative
              coder, a sound engineer, a music producer, a visual artist, or
              just a curious beginner who wants to learn more about Max and its
              possibilities, you are welcome to join us.
            </p>
            <p>
              Betahaus in Mitte hosts our meetups on a monthly-ish basis.
              Subscribe to the newsletter and follow our page to keep up with
              the news, and be ready to RSVP for the appointments as we publish
              them.
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mt-16 border-t-4 border-black pt-8 transform -rotate-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-tight">
            Max Berlin Network
          </h2>
          <div className="font-mono text-xl">Massi, Ale, Riccardo, Edu</div>
          <div className="text-sm font-mono mt-2">January 2025</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
