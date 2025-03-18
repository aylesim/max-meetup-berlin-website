import { redirect } from "next/navigation";
import { getAllMeetups } from "@/lib/api";

export default async function MeetingPage() {
  const meetups = await getAllMeetups();

  // Find meetup that has is_next flag or fallback to most recent
  const nextMeetup =
    meetups.find((meetup) => meetup.is_next) ||
    meetups.sort((a, b) => {
      const dateA = a.slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || "";
      const dateB = b.slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || "";
      return dateB.localeCompare(dateA);
    })[0];

  if (nextMeetup) {
    redirect(`/meeting/${nextMeetup.slug}`);
  } else {
    // Fallback to the known meetup if no meetups found
    redirect(`/meeting/2025-01-17-next`);
  }
}
