"use client";

import { useRef, useState } from "react";
import { MeetupWithSlug } from "@/interfaces/meeting";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import dynamic from "next/dynamic";
import { Download, Loader2 } from "lucide-react";

// Dynamically import all template components
const PosterTemplate = dynamic(() => import("./templates/poster-template"));
const SpeakerTemplate = dynamic(() => import("./templates/speaker-template"));
const DetailsTemplate = dynamic(() => import("./templates/details-template"));
const ScheduleTemplate = dynamic(() => import("./templates/schedule-template"));

type TemplateType = "poster" | "speaker" | "details" | "schedule";

export default function InstagramPreview({
  meetup,
  templateType,
}: {
  meetup: MeetupWithSlug;
  templateType: string;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Find all available speakers
  const availableSpeakers =
    templateType === "speaker"
      ? (Array.from({ length: 7 }, (_, i) => {
          const speakerKey = `Speaker_${i}` as const;
          const nameKey = `name_${i}` as const;
          const speaker = meetup[speakerKey] as any;
          return speaker && speaker[nameKey] ? i : null;
        }).filter((i) => i !== null) as number[])
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

  const downloadImage = async (speakerIndex?: number) => {
    if (!previewRef.current) return;

    try {
      setIsGenerating(true);

      // For speaker template with multiple speakers, select the specific container
      const element =
        speakerIndex !== undefined
          ? document.getElementById(`speaker-card-${speakerIndex}`)
          : previewRef.current;

      if (!element) {
        setIsGenerating(false);
        return;
      }

      // Get the template component
      const canvas = await html2canvas(element, {
        scale: 3, // Higher resolution
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Convert to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Could not generate image");
          setIsGenerating(false);
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const speakerSuffix =
          speakerIndex !== undefined ? `-speaker-${speakerIndex}` : "";
        const fileName = `max-meetup-${meetup.slug}-${templateType}${speakerSuffix}.png`;

        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setIsGenerating(false);
      }, "image/png");
    } catch (error) {
      console.error("Error generating image:", error);
      setIsGenerating(false);
    }
  };

  // Render the appropriate template based on type
  const renderTemplate = () => {
    if (templateType === "speaker" && availableSpeakers.length > 0) {
      return (
        <div className="space-y-10">
          {availableSpeakers.map((speakerIndex) => (
            <div key={speakerIndex} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold font-mono">
                  Speaker:{" "}
                  {(meetup[`Speaker_${speakerIndex}` as const] as any)?.[
                    `name_${speakerIndex}` as const
                  ] || ""}
                </h3>
                <Button
                  onClick={() => downloadImage(speakerIndex)}
                  disabled={isGenerating}
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
                      Download Image
                    </>
                  )}
                </Button>
              </div>
              <div
                className="border-2 border-black bg-white flex justify-center items-center p-4"
                style={{ maxWidth: "650px", margin: "0 auto" }}
              >
                <div
                  id={`speaker-card-${speakerIndex}`}
                  className="w-[600px] h-[600px] relative bg-white overflow-hidden"
                  style={{ aspectRatio: "1/1" }}
                >
                  <SpeakerTemplate data={meetup} speakerIndex={speakerIndex} />
                </div>
              </div>
            </div>
          ))}
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
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold font-mono">{templateTitle}</h3>
          <Button
            onClick={() => downloadImage()}
            disabled={isGenerating}
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
                Download Image
              </>
            )}
          </Button>
        </div>

        {/* Instagram Preview Container */}
        <div
          className="border-2 border-black bg-white flex justify-center items-center p-4"
          style={{ maxWidth: "650px", margin: "0 auto" }}
        >
          <div
            ref={previewRef}
            className="w-[600px] h-[600px] relative bg-white overflow-hidden"
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

      {renderTemplate()}
    </div>
  );
}
