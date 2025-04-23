"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScreenshotHelper from "./templates/screenshot-helper";
import dynamic from "next/dynamic";

const CustomTextTemplate = dynamic(
  () => import("./templates/custom-text-template")
);

export default function CustomTextGenerator() {
  const [customText, setCustomText] = useState("");
  const [rotation, setRotation] = useState(-1);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Generate a unique ID for this template
  const uniqueTemplateId = `custom-text-template-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  // Ensure fonts are loaded
  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      setTimeout(() => setFontsLoaded(true), 2000);
    }
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 uppercase font-mono text-center">
        Custom Text Generator
      </h2>
      <p className="text-lg text-center mb-8 font-mono">
        Create Instagram-ready images with your custom text
      </p>

      <div className="max-w-xl mx-auto mb-6">
        <div className="mb-4">
          <label
            htmlFor="customText"
            className="block text-lg font-bold font-mono mb-2"
          >
            Your Custom Text
          </label>
          <Input
            id="customText"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter your text here..."
            className="border-2 border-black p-4 text-lg w-full"
            maxLength={100}
          />
          <p className="text-sm text-gray-500 mt-2 font-mono">
            Max 100 characters. Text will be displayed in uppercase.
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="rotationSlider"
            className="block text-lg font-bold font-mono mb-2"
          >
            Box Tilt: {rotation}°
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">-15°</span>
            <input
              id="rotationSlider"
              type="range"
              min="-15"
              max="15"
              step="1"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-mono">+15°</span>
          </div>
          <Button
            onClick={() => setRotation(0)}
            className="mt-2 bg-black text-white hover:bg-gray-800 text-xs"
            size="sm"
          >
            Reset to 0°
          </Button>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-4 max-w-xl mx-auto">
          <h3 className="text-xl font-bold font-mono">Preview</h3>
          <ScreenshotHelper
            elementId={uniqueTemplateId}
            title={"Custom-Text"}
            isDisabled={!fontsLoaded}
          />
        </div>

        {/* Instagram Preview Container */}
        <div
          className="border-2 border-black bg-white flex justify-center items-center p-4"
          style={{ maxWidth: "650px", margin: "0 auto" }}
        >
          <div
            ref={previewRef}
            id={uniqueTemplateId}
            className="w-[600px] h-[600px] relative bg-white overflow-visible"
            style={{ aspectRatio: "1/1" }}
          >
            <CustomTextTemplate text={customText} rotation={rotation} />
          </div>
        </div>
      </div>
    </div>
  );
}
