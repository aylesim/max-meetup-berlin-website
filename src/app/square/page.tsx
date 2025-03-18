import { getNextMeetup } from "@/lib/api";
import SquarePosterContent from "./square-poster-content";

export default async function SquarePoster() {
  const nextMeetup = await getNextMeetup();
  const data = nextMeetup || {
    title: "",
    subtitle: "",
    description: "",
    when_where: "",
    schedule: "",
    what_to_expect: "",
    slug: "",
  };

  return (
    <main className="min-h-screen bg-white">
      <SquarePosterContent data={data} />
    </main>
  );
}
