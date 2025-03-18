import MeetingInfo from "@/app/_components/meeting-info";
import { getMeetupBySlug, getAllMeetups } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const meetups = getAllMeetups();
  return meetups.map((meetup) => ({
    slug: meetup.slug,
  }));
}

interface MeetingPageProps {
  params: {
    slug: string;
  };
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  try {
    const data = await getMeetupBySlug(params.slug);

    return (
      <main>
        <MeetingInfo data={data} />
      </main>
    );
  } catch (error) {
    notFound();
  }
}
