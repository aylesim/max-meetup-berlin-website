"use client";

import { useRef, useState, useEffect } from "react";
import { MeetupWithSlug, SpeakerIndex } from "@/interfaces/meeting";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import ScreenshotHelper from "./templates/screenshot-helper";

// Dynamically import all template components
const PosterTemplate = dynamic(() => import("./templates/poster-template"));
const SpeakerTemplate = dynamic(() => import("./templates/speaker-template"));
const DetailsTemplate = dynamic(() => import("./templates/details-template"));
const ScheduleTemplate = dynamic(() => import("./templates/schedule-template"));

type TemplateType = "poster" | "speaker" | "details" | "schedule";

// Helper type for dynamic Speaker keys
type SpeakerKey = `Speaker_${SpeakerIndex}`;
type NameKey = `name_${SpeakerIndex}`;

export default function InstagramPreview({
  meetup,
  templateType,
}: {
  meetup: MeetupWithSlug;
  templateType: string;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const speakerRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Ensure fonts are loaded
  useEffect(() => {
    // Check if document.fonts is available (modern browsers)
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      // Fallback for older browsers - just assume fonts are loaded after a delay
      setTimeout(() => setFontsLoaded(true), 2000);
    }
  }, []);

  // Find all available speakers
  const availableSpeakers =
    templateType === "speaker"
      ? (Array.from({ length: 7 }, (_, i) => {
          const idx = i as SpeakerIndex;
          const speakerKey = `Speaker_${idx}` as SpeakerKey;
          const nameKey = `name_${idx}` as NameKey;
          const speaker = meetup[speakerKey];
          return speaker && speaker[nameKey] ? idx : null;
        }).filter((i) => i !== null) as SpeakerIndex[])
      : [];

  const templateTitle =
    {
      poster: "Event Poster",
      speaker:
        availableSpeakers.length > 1
          ? "Speaker Highlights"
          : "Speaker Highlight",
      details: "Event Details",
      schedule: "Event Schedule",
    }[templateType as TemplateType] || "Preview";

  // Render the appropriate template based on type
  const renderTemplate = () => {
    if (templateType === "speaker" && availableSpeakers.length > 0) {
      return (
        <div className="space-y-10">
          {availableSpeakers.map((speakerIndex) => {
            const speakerKey = `Speaker_${speakerIndex}` as SpeakerKey;
            const nameKey = `name_${speakerIndex}` as NameKey;
            const speaker = meetup[speakerKey];
            // Generate a truly unique ID for each speaker
            const uniqueSpeakerId = `speaker-card-${speakerIndex}-${
              meetup.slug
            }-${Math.random().toString(36).substring(2, 9)}`;

            return (
              <div key={speakerIndex} className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold font-mono">
                    Speaker: {speaker?.[nameKey] || ""}
                  </h3>
                  <ScreenshotHelper
                    elementId={uniqueSpeakerId}
                    title={`Speaker-${speakerIndex + 1}`}
                    isDisabled={!fontsLoaded}
                  />
                </div>
                <div
                  className="border-2 border-black bg-white flex justify-center items-center p-4"
                  style={{ maxWidth: "650px", margin: "0 auto" }}
                >
                  <div
                    id={uniqueSpeakerId}
                    ref={(el) => {
                      speakerRefs.current[speakerIndex] = el;
                    }}
                    className="w-[600px] h-[600px] relative bg-white overflow-visible"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <SpeakerTemplate
                      data={meetup}
                      speakerIndex={speakerIndex}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    switch (templateType as TemplateType) {
      case "poster":
        return <PosterTemplate data={meetup} />;
      case "speaker":
        return <SpeakerTemplate data={meetup} speakerIndex={0} />;
      case "details":
        return <DetailsTemplate data={meetup} />;
      case "schedule":
        return <ScheduleTemplate data={meetup} />;
      default:
        return <div>Invalid template type</div>;
    }
  };

  // For non-speaker templates or if no speakers
  if (templateType !== "speaker" || availableSpeakers.length === 0) {
    // Generate a unique ID for this template
    const uniqueTemplateId = `template-${templateType}-${
      meetup.slug
    }-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold font-mono">{templateTitle}</h3>
          <ScreenshotHelper
            elementId={uniqueTemplateId}
            title={templateTitle}
            isDisabled={!fontsLoaded}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded text-sm">
            {error}
          </div>
        )}

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
            {renderTemplate()}
          </div>
        </div>
      </div>
    );
  }

  // For speaker template with multiple speakers - already rendering them in renderTemplate
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold font-mono">{templateTitle}</h3>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded text-sm">
          {error}
        </div>
      )}

      {renderTemplate()}
    </div>
  );
}
