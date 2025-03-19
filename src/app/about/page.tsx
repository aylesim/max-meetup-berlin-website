"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Client component for the back button
function BackButton() {
  const searchParams = useSearchParams();
  const fromArchive = searchParams.get("from") === "archive";

  return (
    <div className="absolute top-4 left-4 z-20">
      <Link href={fromArchive ? "/archive" : "/"}>
        <button className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-gray-800 transition-colors transform hover:-rotate-1">
          ← Back to {fromArchive ? "Archive" : "Home"}
        </button>
      </Link>
    </div>
  );
}

export default function AboutPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black px-4 pt-16 pb-16">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />

      {/* Back Button with Suspense */}
      <Suspense
        fallback={
          <div className="absolute top-4 left-4 z-20">
            <Link href="/">
              <button className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-gray-800 transition-colors transform hover:-rotate-1">
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
                <div className="font-mono text-xl">Rick, Edu</div>
                <div className="text-sm font-mono mt-2 text-gray-600">
                  January 2025
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <h1 className="text-4xl transform -rotate-1 font-bold font-mono text-center mt-16">
          Meet the team:
        </h1>
        {/* Team Cards Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* First Row */}
          <div className="space-y-8">
            {/* Massi Card */}
            <div className="border-4 border-black p-8 transform hover:-rotate-1 transition-transform">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full aspect-square mb-6">
                  <Image
                    src="/team/massi.jpeg"
                    alt="Massi"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Massimiliano Cerioni
                </h3>
                <p className="font-mono text-sm mb-4">
                  Massimiliano Cerioni (1986, Italy) is a composer, sound
                  engineer, educator, and Max Certified Trainer based in Berlin.
                  He holds an MA in electronic music from the A. Casella
                  Conservatory – L'Aquila, IT, where he also researches AI for
                  the EAR project. His work spans music, sound design, creative
                  coding, audiovisual installations, generative algorithms, DSP,
                  software development, augmented instruments, and performance.
                  In 2015, he won 1st prize at the National Arts Prize 'Premio
                  Abbado.' His works have been featured at CTM, ICMC Athens,
                  Tempo Reale, Artescienza, Kunsttage Basel, Chilean Conexión,
                  and the Psychedelic Film and Music Festival NYC. He is part of
                  Radius Collective, Wasch Berlin, and Max Berlin Network. He
                  releases music with Elli Records and distributes Culto M4L
                  Devices via Isotonik Studios.
                </p>
                <a
                  href="https://cerionimusic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm underline hover:text-gray-600"
                >
                  More →
                </a>
              </div>
            </div>

            {/* Ale Card */}
            <div className="border-4 border-black p-8 transform hover:rotate-1 transition-transform">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full aspect-square mb-6">
                  <Image
                    src="/team/rick.jpg"
                    alt="Ale"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Riccardo Sellan</h3>
                <p className="font-mono text-sm mb-4">
                  Riccardo Sellan, after graduating in Electronic Music from the
                  Venice Conservatory, began independently developing audio
                  software for sound design, multimedia installations, and
                  performances. He is currently working as a technical sound
                  designer for NevaXR and Tilde Sound Art. Based in Berlin, he
                  continues his research into creating innovative tools and
                  software in the field of sound.
                </p>
                <a
                  href="https://www.instagram.com/riccardo.sellan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm underline hover:text-gray-600"
                >
                  More →
                </a>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="space-y-8">
            {/* Rick Card */}
            <div className="border-4 border-black p-8 transform hover:-rotate-1 transition-transform">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full aspect-square mb-6">
                  <Image
                    src="/team/ale.jpg"
                    alt="Rick"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Aylesim (Alessandro Miracapillo)
                </h3>
                <p className="font-mono text-sm mb-4">
                  Aylesim, an Italian artist and developer based in Berlin,
                  specializes in the intersection of technology, music, and art.
                  He creates immersive AV works, installations, and automatic
                  instruments, with a focus on M4L device design. Passionate
                  about developing and critiquing tech tools, his work explores
                  technology's creative potential and societal impact. Trained
                  in electronic music composition and interactive design,
                  Aylesim has showcased his work through exhibitions,
                  performances, and workshops, collaborating with organizations
                  like Isotonik Studios and La Scuola Open Source. He won first
                  prize in "Electronic Arts" at the XV International Italian Art
                  Prize.
                </p>
                <a
                  href="https://www.aylesim.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm underline hover:text-gray-600"
                >
                  More →
                </a>
              </div>
            </div>

            {/* Edu Card */}
            <div className="border-4 border-black p-8 transform hover:rotate-1 transition-transform">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full aspect-square mb-6">
                  <Image
                    src="/team/edu.jpeg"
                    alt="Edu"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Eduardo Pesole</h3>
                <p className="font-mono text-sm mb-4">
                  Eduardo Pesole, a Berlin-based sound designer, artist, and
                  composer, graduated in Sound Design from IED Rome. In gaming,
                  he worked with studios like Point Blank Games, 505 Games, and
                  Oneoone Games, contributing to projects like Stray Blade. A
                  guitarist and bassist since his teens, he played in
                  psychedelic rock bands. Before Berlin, he mixed, edited, and
                  composed for shorts and fashion films. In 2024, under
                  Hypocirta Glabra, he released Botanical Garden via Nostro Hood
                  System (Bristol). His multidisciplinary work spans spatial
                  audio, soundscapes, analog synths, granular synthesis, and
                  resampling.
                </p>
                <a
                  href="https://www.eduardopesole.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm underline hover:text-gray-600"
                >
                  More →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
