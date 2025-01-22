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
            <div className="font-mono mb-6">{data.next_meetup}</div>
            <div className="relative">
              {data.isFlashy &&
                arrows.map((arrow, i) => (
                  <Arrow key={i} angle={arrow.angle} delay={arrow.delay} />
                ))}
              <Link href="/meeting">
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

            <div className="flex justify-end">
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 rounded-none transform -rotate-[-2deg] transition-transform hover:rotate-0 mt-4"
                >
                  About
                </Button>
              </Link>
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
