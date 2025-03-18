"use client";

import { useState } from "react";
import { MeetupWithSlug } from "@/interfaces/meeting";
import InstagramPreview from "./instagram-preview";

export default function PressMeetupList({
  meetups,
}: {
  meetups: MeetupWithSlug[];
}) {
  const [selectedMeetup, setSelectedMeetup] = useState<MeetupWithSlug | null>(
    meetups.length > 0 ? meetups[0] : null
  );

  // Different Instagram-formatted templates
  const templateTypes = ["poster", "speaker", "details", "schedule"];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Meetup List */}
      <div className="lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4 uppercase font-mono">Meetups</h2>
        <div className="space-y-4">
          {meetups.map((meetup) => (
            <button
              key={meetup.slug}
              onClick={() => setSelectedMeetup(meetup)}
              className={`w-full text-left p-4 border-2 transition-all ${
                selectedMeetup?.slug === meetup.slug
                  ? "border-black bg-black text-white"
                  : "border-black hover:bg-black/5"
              }`}
            >
              <h3 className="text-xl font-bold">{meetup.title}</h3>
              <p className="font-mono mt-1">
                {meetup.when_where?.split("\n")[0] || ""}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Instagram Previews */}
      <div className="lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4 uppercase font-mono">
          Instagram Preview
        </h2>

        {selectedMeetup ? (
          <div className="space-y-8">
            {templateTypes.map((type) => (
              <InstagramPreview
                key={type}
                meetup={selectedMeetup}
                templateType={type}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 border-2 border-black text-center">
            <p className="text-xl font-mono">Select a meetup to see previews</p>
          </div>
        )}
      </div>
    </div>
  );
}
