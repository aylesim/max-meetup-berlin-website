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
      <Hero data={data} />
    </main>
  );
}
