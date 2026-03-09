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
  
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [imagePosition, setImagePosition] = useState<"cover" | "contain" | "fill" | "none">("cover");
  const [imageFilter, setImageFilter] = useState<string>("none");
  const [textColor, setTextColor] = useState("#000000");
  const [boxBgColor, setBoxBgColor] = useState("#ffffff");
  const [boxBorderColor, setBoxBorderColor] = useState("#000000");
  const [boxOpacity, setBoxOpacity] = useState(100);
  const [boxFillOpacity, setBoxFillOpacity] = useState(100);

  const [extendedText, setExtendedText] = useState("");
  const [extendedRotation, setExtendedRotation] = useState(-1);
  const [extendedFontSize, setExtendedFontSize] = useState(8);
  const [showSquare, setShowSquare] = useState(true);
  
  const [extendedBackgroundImage, setExtendedBackgroundImage] = useState<string>("");
  const [extendedImagePosition, setExtendedImagePosition] = useState<"cover" | "contain" | "fill" | "none">("cover");
  const [extendedImageFilter, setExtendedImageFilter] = useState<string>("none");
  const [extendedTextColor, setExtendedTextColor] = useState("#000000");
  const [extendedBoxBgColor, setExtendedBoxBgColor] = useState("#ffffff");
  const [extendedBoxBorderColor, setExtendedBoxBorderColor] = useState("#000000");
  const [extendedBoxOpacity, setExtendedBoxOpacity] = useState(100);
  const [extendedBoxFillOpacity, setExtendedBoxFillOpacity] = useState(100);

  const uniqueTemplateId = `custom-text-template-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  const uniqueExtendedTemplateId = `custom-text-template-extended-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      setTimeout(() => setFontsLoaded(true), 2000);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isExtended: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (isExtended) {
          setExtendedBackgroundImage(result);
        } else {
          setBackgroundImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filterPresets = [
    { label: "None", value: "none" },
    { label: "B&W", value: "grayscale(100%)" },
    { label: "Sepia", value: "sepia(80%)" },
    { label: "Blur", value: "blur(3px)" },
    { label: "Bright", value: "brightness(120%)" },
    { label: "Dark", value: "brightness(70%)" },
    { label: "High Contrast", value: "contrast(150%)" },
    { label: "Low Contrast", value: "contrast(70%)" },
    { label: "Saturate", value: "saturate(150%)" },
    { label: "Desaturate", value: "saturate(50%)" },
    { label: "Vintage", value: "sepia(50%) contrast(120%) brightness(90%)" },
    { label: "Cool Tone", value: "brightness(105%) contrast(110%) hue-rotate(180deg)" },
    { label: "Warm Tone", value: "brightness(105%) contrast(110%) sepia(30%)" },
  ];

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
          <label className="block text-lg font-bold font-mono mb-2">
            Background Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, false)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-gray-100"
          />
          {backgroundImage && (
            <Button
              onClick={() => setBackgroundImage("")}
              className="mt-2 bg-red-600 text-white hover:bg-red-700 text-xs"
              size="sm"
            >
              Remove Image
            </Button>
          )}
        </div>

        {backgroundImage && (
          <>
            <div className="mb-6">
              <label className="block text-lg font-bold font-mono mb-2">
                Image Fit
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["cover", "contain", "fill", "none"] as const).map((fit) => (
                  <Button
                    key={fit}
                    onClick={() => setImagePosition(fit)}
                    className={`${
                      imagePosition === fit
                        ? "bg-black text-white"
                        : "bg-white text-black border-2 border-black hover:bg-gray-100"
                    }`}
                    size="sm"
                  >
                    {fit.charAt(0).toUpperCase() + fit.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-bold font-mono mb-2">
                Image Filter
              </label>
              <div className="grid grid-cols-3 gap-2">
                {filterPresets.map((preset) => (
                  <Button
                    key={preset.value}
                    onClick={() => setImageFilter(preset.value)}
                    className={`${
                      imageFilter === preset.value
                        ? "bg-black text-white"
                        : "bg-white text-black border-2 border-black hover:bg-gray-100"
                    } text-xs`}
                    size="sm"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mb-6 grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold font-mono mb-2">
              Text Color
            </label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full h-10 border-2 border-black cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-bold font-mono mb-2">
              Box Background
            </label>
            <input
              type="color"
              value={boxBgColor}
              onChange={(e) => setBoxBgColor(e.target.value)}
              className="w-full h-10 border-2 border-black cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-bold font-mono mb-2">
              Box Border
            </label>
            <input
              type="color"
              value={boxBorderColor}
              onChange={(e) => setBoxBorderColor(e.target.value)}
              className="w-full h-10 border-2 border-black cursor-pointer"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-bold font-mono mb-2">
            Box Background Opacity: {boxFillOpacity}%
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">0%</span>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={boxFillOpacity}
              onChange={(e) => setBoxFillOpacity(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-mono">100%</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-bold font-mono mb-2">
            Box Border Opacity: {boxOpacity}%
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">0%</span>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={boxOpacity}
              onChange={(e) => setBoxOpacity(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-mono">100%</span>
          </div>
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
              backgroundImage={backgroundImage}
              imagePosition={imagePosition}
              imageFilter={imageFilter}
              textColor={textColor}
              boxBgColor={boxBgColor}
              boxBorderColor={boxBorderColor}
              boxOpacity={boxOpacity}
              boxFillOpacity={boxFillOpacity}
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

        <div className="mb-6">
          <label className="block text-lg font-bold font-mono mb-2">
            Background Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, true)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-gray-100"
          />
          {extendedBackgroundImage && (
            <Button
              onClick={() => setExtendedBackgroundImage("")}
              className="mt-2 bg-red-600 text-white hover:bg-red-700 text-xs"
              size="sm"
            >
              Remove Image
            </Button>
          )}
        </div>

        {extendedBackgroundImage && (
          <>
            <div className="mb-6">
              <label className="block text-lg font-bold font-mono mb-2">
                Image Fit
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["cover", "contain", "fill", "none"] as const).map((fit) => (
                  <Button
                    key={fit}
                    onClick={() => setExtendedImagePosition(fit)}
                    className={`${
                      extendedImagePosition === fit
                        ? "bg-black text-white"
                        : "bg-white text-black border-2 border-black hover:bg-gray-100"
                    }`}
                    size="sm"
                  >
                    {fit.charAt(0).toUpperCase() + fit.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-bold font-mono mb-2">
                Image Filter
              </label>
              <div className="grid grid-cols-3 gap-2">
                {filterPresets.map((preset) => (
                  <Button
                    key={preset.value}
                    onClick={() => setExtendedImageFilter(preset.value)}
                    className={`${
                      extendedImageFilter === preset.value
                        ? "bg-black text-white"
                        : "bg-white text-black border-2 border-black hover:bg-gray-100"
                    } text-xs`}
                    size="sm"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mb-6 grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold font-mono mb-2">
              Text Color
            </label>
            <input
              type="color"
              value={extendedTextColor}
              onChange={(e) => setExtendedTextColor(e.target.value)}
              className="w-full h-10 border-2 border-black cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-bold font-mono mb-2">
              Box Background
            </label>
            <input
              type="color"
              value={extendedBoxBgColor}
              onChange={(e) => setExtendedBoxBgColor(e.target.value)}
              className="w-full h-10 border-2 border-black cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-bold font-mono mb-2">
              Box Border
            </label>
            <input
              type="color"
              value={extendedBoxBorderColor}
              onChange={(e) => setExtendedBoxBorderColor(e.target.value)}
              className="w-full h-10 border-2 border-black cursor-pointer"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-bold font-mono mb-2">
            Box Background Opacity: {extendedBoxFillOpacity}%
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">0%</span>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={extendedBoxFillOpacity}
              onChange={(e) => setExtendedBoxFillOpacity(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-mono">100%</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-bold font-mono mb-2">
            Box Border Opacity: {extendedBoxOpacity}%
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">0%</span>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={extendedBoxOpacity}
              onChange={(e) => setExtendedBoxOpacity(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-mono">100%</span>
          </div>
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
              backgroundImage={extendedBackgroundImage}
              imagePosition={extendedImagePosition}
              imageFilter={extendedImageFilter}
              textColor={extendedTextColor}
              boxBgColor={extendedBoxBgColor}
              boxBorderColor={extendedBoxBorderColor}
              boxOpacity={extendedBoxOpacity}
              boxFillOpacity={extendedBoxFillOpacity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
