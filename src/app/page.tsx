import Hero from "@/app/_components/hero";
import { getHomeData, getNextMeetup } from "@/lib/api";

export default async function Index() {
  const homeData = await getHomeData();
  const nextMeetup = await getNextMeetup();

  // Prepare data for hero component
  const data = {
    ...homeData,
    // If we have a next meetup with is_next flag, extract and format the when_where info
    nextMeetupData: nextMeetup && nextMeetup.is_next
      ? {
          title: nextMeetup.title,
          when_where: nextMeetup.when_where,
          slug: nextMeetup.slug,
        }
      : null,
  };

  return (
    <main className="w-full h-full">
      <div className="w-full border-b-4 border-black dark:border-white bg-white dark:bg-black py-4 px-6 text-center">
        <span className="font-mono text-base md:text-lg text-black dark:text-white">
          The next meetup is postponed to March 14.
        </span>
      </div>
      <Hero data={data} />
    </main>
  );
}
