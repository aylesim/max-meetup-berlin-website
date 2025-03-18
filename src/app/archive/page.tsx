import Link from "next/link";
import Image from "next/image";
import { getAllMeetups } from "@/lib/api";

export default async function ArchivePage() {
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-center md:text-left uppercase tracking-tight">
            Meetups Archive
          </h1>

          <Link href="/press" className="mt-4 md:mt-0">
            <button className="bg-black text-white px-6 py-3 font-mono hover:bg-gray-800 transition-colors transform hover:rotate-1">
              Press Materials
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedMeetups.map((meetup) => (
            <div
              key={meetup.slug}
              className="border-4 border-black p-6 transform hover:-rotate-1 transition-transform bg-white"
            >
              <h2 className="text-2xl font-bold mb-3 uppercase tracking-tight">
                {meetup.title}
              </h2>
              <p className="font-mono mb-4 text-sm">
                {meetup.when_where?.split("\n")[0] || ""}
              </p>
              <p className="mb-6 text-sm line-clamp-3">
                {meetup.what_to_expect || meetup.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {meetup.Speaker_0?.name_0 && (
                  <span className="inline-block bg-black text-white px-3 py-1 text-xs font-mono">
                    {meetup.Speaker_0.name_0}
                  </span>
                )}
                {meetup.Speaker_1?.name_1 && (
                  <span className="inline-block bg-black text-white px-3 py-1 text-xs font-mono">
                    {meetup.Speaker_1.name_1}
                  </span>
                )}
                {meetup.Speaker_2?.name_2 && (
                  <span className="inline-block bg-black text-white px-3 py-1 text-xs font-mono">
                    {meetup.Speaker_2.name_2}
                  </span>
                )}
              </div>

              <Link
                href={`/meeting/${meetup.slug}`}
                className="inline-block font-mono border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
