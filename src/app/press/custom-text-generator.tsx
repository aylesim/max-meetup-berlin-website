"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScreenshotHelper from "./templates/screenshot-helper";
import dynamic from "next/dynamic";

const CustomTextTemplate = dynamic(
  () => import("./templates/custom-text-template")
);

const CustomTextTemplateExtended = dynamic(
  () => import("./templates/custom-text-template-extended")
);

export default function CustomTextGenerator() {
  const [customText, setCustomText] = useState("");
  const [rotation, setRotation] = useState(-1);
  const [fontSize, setFontSize] = useState(8);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const [extendedText, setExtendedText] = useState("");
  const [extendedRotation, setExtendedRotation] = useState(-1);
  const [extendedFontSize, setExtendedFontSize] = useState(8);
  const [showSquare, setShowSquare] = useState(true);

  const uniqueTemplateId = `custom-text-template-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  const uniqueExtendedTemplateId = `custom-text-template-extended-${Math.random()
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

        <div className="mb-6">
          <label
            htmlFor="fontSizeSlider"
            className="block text-lg font-bold font-mono mb-2"
          >
            Font Size: {fontSize}
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">4</span>
            <input
              id="fontSizeSlider"
              type="range"
              min="4"
              max="12"
              step="1"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-mono">12</span>
          </div>
          <Button
            onClick={() => setFontSize(8)}
            className="mt-2 bg-black text-white hover:bg-gray-800 text-xs"
            size="sm"
          >
            Reset to Default
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
            <CustomTextTemplate
              text={customText}
              rotation={rotation}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-black my-16 max-w-xl mx-auto" />

      <div className="max-w-xl mx-auto mb-6">
        <div className="mb-4">
          <label
            htmlFor="extendedText"
            className="block text-lg font-bold font-mono mb-2"
          >
            Extended Text (longer, multiline)
          </label>
          <textarea
            id="extendedText"
            value={extendedText}
            onChange={(e) => setExtendedText(e.target.value)}
            placeholder="Enter longer text here...
New lines supported"
            className="border-2 border-black p-4 text-lg w-full min-h-[120px] resize-y"
            maxLength={500}
          />
          <p className="text-sm text-gray-500 mt-2 font-mono">
            Max 500 characters. New lines supported.
          </p>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <input
            id="showSquare"
            type="checkbox"
            checked={showSquare}
            onChange={(e) => setShowSquare(e.target.checked)}
            className="w-4 h-4 border-2 border-black rounded cursor-pointer"
          />
          <label htmlFor="showSquare" className="text-lg font-bold font-mono cursor-pointer">
            Show square border
          </label>
        </div>

        <div className="mb-6">
          <label
            htmlFor="extendedRotationSlider"
            className="block text-lg font-bold font-mono mb-2"
          >
            Box Tilt: {extendedRotation}°
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">-15°</span>
            <input
              id="extendedRotationSlider"
              type="range"
              min="-15"
              max="15"
              step="1"
              value={extendedRotation}
              onChange={(e) => setExtendedRotation(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-mono">+15°</span>
          </div>
          <Button
            onClick={() => setExtendedRotation(0)}
            className="mt-2 bg-black text-white hover:bg-gray-800 text-xs"
            size="sm"
          >
            Reset to 0°
          </Button>
        </div>

        <div className="mb-6">
          <label
            htmlFor="extendedFontSizeSlider"
            className="block text-lg font-bold font-mono mb-2"
          >
            Font Size: {extendedFontSize}
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">4</span>
            <input
              id="extendedFontSizeSlider"
              type="range"
              min="4"
              max="12"
              step="1"
              value={extendedFontSize}
              onChange={(e) => setExtendedFontSize(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-mono">12</span>
          </div>
          <Button
            onClick={() => setExtendedFontSize(8)}
            className="mt-2 bg-black text-white hover:bg-gray-800 text-xs"
            size="sm"
          >
            Reset to Default
          </Button>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-4 max-w-xl mx-auto">
          <h3 className="text-xl font-bold font-mono">Extended Preview</h3>
          <ScreenshotHelper
            elementId={uniqueExtendedTemplateId}
            title={"Custom-Text-Extended"}
            isDisabled={!fontsLoaded}
          />
        </div>

        <div
          className="border-2 border-black bg-white flex justify-center items-center p-4"
          style={{ maxWidth: "650px", margin: "0 auto" }}
        >
          <div
            id={uniqueExtendedTemplateId}
            className="w-[600px] h-[600px] relative bg-white overflow-visible"
            style={{ aspectRatio: "1/1" }}
          >
            <CustomTextTemplateExtended
              text={extendedText}
              rotation={extendedRotation}
              fontSize={extendedFontSize}
              showSquare={showSquare}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
