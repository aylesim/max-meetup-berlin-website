import Link from "next/link";
import Image from "next/image";
import { getAllMeetups } from "@/lib/api";

export default async function ArchivePage() {
  const meetups = await getAllMeetups();

  // Sort meetups by title
  const sortedMeetups = [...meetups].sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="self-start mb-4">
              <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-mono text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors transform hover:-rotate-1">
                ← Back to Home
              </button>
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-center md:text-left uppercase tracking-tight">
              Meetups Archive
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedMeetups.map((meetup) => (
            <div
              key={meetup.slug}
              className="border-4 border-black dark:border-white p-6 transform hover:-rotate-1 transition-transform bg-white dark:bg-black"
            >
              <h2 className="text-2xl font-bold mb-3 uppercase tracking-tight">
                {meetup.title}
              </h2>
              <p className="font-mono mb-4 text-sm">
                {meetup.when_where?.split("\n")[0] || ""}
              </p>
              <p className="mb-6 text-sm line-clamp-3">
                {meetup.subtitle || meetup.description || meetup.what_to_expect}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {meetup.Speaker_0?.name_0 && (
                  <span className="inline-block bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-mono">
                    {meetup.Speaker_0.name_0}
                  </span>
                )}
                {meetup.Speaker_1?.name_1 && (
                  <span className="inline-block bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-mono">
                    {meetup.Speaker_1.name_1}
                  </span>
                )}
                {meetup.Speaker_2?.name_2 && (
                  <span className="inline-block bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-mono">
                    {meetup.Speaker_2.name_2}
                  </span>
                )}
              </div>

              <Link
                href={`/meeting/${meetup.slug}?from=archive`}
                className="inline-block font-mono border-2 border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
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
