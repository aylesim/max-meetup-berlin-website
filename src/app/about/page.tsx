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
                  Massimiliano Cerioni (1986, Italy) is an award-winning
                  composer based in Berlin. He holds an MMus in electronic music
                  from the Alfredo Casella Conservatory of Music (L'Aquila, IT)
                  and is also a sound engineer, sound artist, educator, and Max
                  Certified Trainer since 2024. Massimiliano is proficient in
                  composition, sound design, digital signal processing for audio
                  and music applications, generative algorithms, creative
                  coding, sound art, Audiovisual installations, augmented
                  instrument design, and performance. He teaches these topics in
                  person and online via Zoom.
                </p>
                <a
                  href="https://cerionimusic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm underline hover:text-gray-600"
                >
                  Connect →
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
                  Connect →
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
                  Alessandro Miracapillo
                </h3>
                <p className="font-mono text-sm mb-4">
                  Aylesim is an Italian artist and developer currently based in
                  Berlin, specializing in the intersection of technology, music,
                  and art. He creates immersive audio-visual experiences,
                  interactive installations, and self-playing instruments, with
                  a focus on designing custom Max for Live devices. Aylesim has
                  a deep passion for both creating technological tools as a
                  developer and critiquing them through his artistic work. His
                  projects explore the duality of technology—embracing its
                  creative potential while questioning its role and impact in
                  society. With a background in electronic music composition and
                  interactive design, Aylesim has presented his work in
                  exhibitions, live performances, and workshops, collaborating
                  with organizations such as Isotonik Studios and La Scuola Open
                  Source. His contributions to the field have earned him several
                  accolades, including first prize in the "Electronic Arts"
                  category at the XV International Italian Art Prize.
                </p>
                <a
                  href="https://www.aylesim.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm underline hover:text-gray-600"
                >
                  Connect →
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
                  Eduardo Pesole is a Berlin-based sound designer, sound artist
                  and composer. He is a graduate in Sound Design from IED -
                  Istituto Europeo di Design, Rome. He has worked with studios
                  like Point Blank Games, 505 Games and Oneoone Games,
                  developing multi-platform games such as "Stray Blade" a 3rd
                  person action RPG, the generative environmental systems for
                  the unreleased "Aftermath", and some music for online racing
                  games. Eduardo started playing guitars and bass at the age of
                  14 in some psychedelic rock bands. From 2019 to 2021, he
                  worked as mix engineer, audio editor and sound designer for
                  short movies, until he switched to interactive sound design
                  and tech audio for video games and interactive installations
                  and eventually left Rome to move to Berlin. Meanwhile, he also
                  worked as a composer for fashion movies and collections,
                  collaborated with other artists and developed solo projects:
                  the latest under the name: "Hypocyrta Glabra" with which, on
                  september 2024 released the album "Botanical Garden" out with
                  the bristol based Nostro Hood System. The knowledge acquired
                  from the game industry makes him able to move easily through
                  multidisciplinary projects and to experiment with acoustics
                  and the architecture of spaces through the use of spatial
                  audio technology, within both the digital and the real world.
                  He has a personal and genuine aesthetic that fully encloses
                  all different genres he likes and gets inspiration from, in an
                  organic and evolving form of sound narration. The use of
                  analog synthesizers, granular synthesis and resampling allows
                  him to design soundscapes and explore unique and interesting
                  timbres.
                </p>
                <a
                  href="https://www.eduardopesole.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm underline hover:text-gray-600"
                >
                  Connect →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
