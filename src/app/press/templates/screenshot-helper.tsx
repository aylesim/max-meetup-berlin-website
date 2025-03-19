"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";

export default function ScreenshotHelper({
  elementId,
  title,
  isDisabled = false,
}: {
  elementId: string;
  title: string;
  isDisabled?: boolean;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadImage = async () => {
    setError(null);
    setIsGenerating(true);

    try {
      // Get the element to capture
      const element = document.getElementById(elementId);

      if (!element) {
        throw new Error(`Element with ID "${elementId}" not found`);
      }

      console.log(`Capturing element with ID: ${elementId}`);

      // Force any images within to load fully
      const images = Array.from(element.querySelectorAll("img"));
      await Promise.all(
        images.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve();
              } else {
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Continue even if image fails
              }
            })
        )
      );

      // Add a delay to ensure rendering is complete
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Take a screenshot using html-to-image
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3,
        quality: 1.0,
        backgroundColor: "#FFFFFF",
        includeQueryParams: true,
        skipFonts: false,
      });

      // Download the image
      const link = document.createElement("a");
      link.download = `max-berlin-${title
        .toLowerCase()
        .replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      setError(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={downloadImage}
        disabled={isGenerating || isDisabled}
        className="bg-black text-white hover:bg-gray-800"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download
          </>
        )}
      </Button>
      {error && (
        <div className="p-2 bg-red-100 text-red-800 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
