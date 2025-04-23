import { getAllMeetups } from "@/lib/api";
import Link from "next/link";
import PressMeetupList from "./press-meetup-list";
import CustomTextGenerator from "./custom-text-generator";

export default async function PressPage() {
  const meetups = await getAllMeetups();

  // Sort meetups by date (assuming the slug contains the date in format YYYY-MM-DD)
  const sortedMeetups = [...meetups].sort((a, b) => {
    // Extract date from slug if it follows the pattern YYYY-MM-DD
    const dateA = a.slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || "";
    const dateB = b.slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || "";
    // Sort in descending order (newest first)
    return dateB.localeCompare(dateA);
  });

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-10 text-center uppercase tracking-tight">
          Press Materials
        </h1>
        <p className="text-xl text-center mb-12 font-mono">
          Click on any meetup to preview and download Instagram-ready
          promotional images
        </p>

        {/* Custom Text Generator Tab */}
        <div className="mb-16">
          <CustomTextGenerator />
        </div>

        <hr className="border-t-2 border-black mb-16" />

        <PressMeetupList meetups={sortedMeetups} />
      </div>
    </main>
  );
}
