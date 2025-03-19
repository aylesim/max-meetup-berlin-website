"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";

const Arrow = ({ angle, delay }: { angle: number; delay: number }) => (
  <motion.div
    className="absolute w-8 h-8 opacity-50"
    style={{
      transformOrigin: "center",
      rotate: `${angle}deg`,
    }}
    initial={{
      scale: 0,
      opacity: 0,
      x: `${Math.cos(((angle - 90) * Math.PI) / 180) * 500}px`,
      y: `${Math.sin(((angle - 90) * Math.PI) / 180) * 500}px`,
    }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 0.5, 0],
      x: 0,
      y: 0,
    }}
    transition={{
      duration: 2,
      delay: delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
        fill="currentColor"
      />
    </svg>
  </motion.div>
);

export default function Hero({ data }: { data: any }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const arrows = Array.from({ length: 8 }, (_, i) => ({
    angle: i * 45,
    delay: i * 0.2,
  }));

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // Use the nextMeetupData if available, otherwise fall back to the data.next_meetup
  const nextMeetupInfo = data.nextMeetupData
    ? data.nextMeetupData.when_where
    : data.next_meetup;

  // Forza il processo dei line break
  const nextMeetupLines =
    nextMeetupInfo?.split(/\r?\n/).filter((line: string) => line.trim()) || [];

  // Use the dynamic slug if available
  const meetingUrl = data.nextMeetupData
    ? `/meeting/${data.nextMeetupData.slug}`
    : "/meeting";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black px-4 py-16">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />

      <motion.div
        className="z-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="border-4 border-black p-6 md:p-8 lg:p-10 mb-8 transform -rotate-1">
          <h1 className="text-[min(7.5vw,5rem)] md:text-[min(8vw,6.5rem)] font-bold mb-6 md:mb-8 uppercase tracking-[-0.06em] w-full whitespace-normal leading-[1.3] flex-shrink-0">
            {data.title}
          </h1>
          <div className="text-xl md:text-[1.3rem] font-mono transform rotate-1">
            {data.subtitle}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <motion.div className="flex-1 border-white  transform -rotate-1 relative">
            <div className="text-6xl font-bold mb-2 uppercase tracking-tight">
              {data.next_meetup_0}
            </div>
            <div className="font-mono mb-6 space-y-1">
              {nextMeetupLines.map((line: string, index: number) => (
                <div key={index} className="text-base">
                  {line.trim()}
                </div>
              ))}
            </div>
            <div className="relative">
              {data.isFlashy &&
                arrows.map((arrow, i) => (
                  <Arrow key={i} angle={arrow.angle} delay={arrow.delay} />
                ))}
              <Link href={meetingUrl}>
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 rounded-none transform -rotate-[-5deg] transition-transform hover:rotate-0"
                >
                  More info
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="flex-1">
            <div className=" border-l-4 border-b-4 border-black pl-4 transform rotate-1">
              <div className="text-xl font-bold mb-2 uppercase tracking-tight">
                Newsletter
              </div>
              <p className="text-base md:text-base mb-4 font-mono">
                {data.description}
              </p>
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 rounded-none transform -rotate-3 transition-transform mb-4 hover:rotate-0"
                onClick={() => {
                  window.open(
                    "https://e3a5acc8d26511efb40edbb296134c3a.eo.page/ymjkn",
                    "_blank"
                  );
                }}
              >
                {data.mail_button}
              </Button>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 rounded-none transform -rotate-[-2deg] transition-transform hover:rotate-0"
                >
                  About
                </Button>
              </Link>
              <Link href="/archive">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 rounded-none transform -rotate-[2deg] transition-transform hover:rotate-0"
                >
                  Archive
                </Button>
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-end mt-6 space-x-4">
              <a
                href="https://discord.gg/Wjnf3WdTFU"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:rotate-6 transition-transform"
              >
                <div className="bg-black text-white p-3 flex items-center justify-center w-10 h-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </div>
              </a>
              <a
                href="https://instagram.com/maxberlinnetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:rotate-6 transition-transform"
              >
                <div className="bg-black text-white p-3 flex items-center justify-center w-10 h-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <div
        className="fixed w-12 h-12 rounded-full bg-black mix-blend-difference pointer-events-none z-50"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </section>
  );
}
