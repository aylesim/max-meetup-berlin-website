"use client";

import { motion } from "framer-motion";

export default function CustomTextTemplate({
  text,
  rotation = -1,
}: {
  text: string;
  rotation?: number;
}) {
  return (
    <div className="w-full h-full relative bg-white text-black">
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
        {/* Title Block - Large centered text */}
        <div
          className="border-4 border-black p-5 bg-white w-11/12 mx-auto"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-center uppercase tracking-tighter leading-none"
            style={{
              overflowWrap: "break-word",
              hyphens: "auto",
              maxHeight: "100%",
            }}
          >
            {text || "YOUR CUSTOM TEXT HERE"}
          </h1>
        </div>
      </div>
    </div>
  );
}
