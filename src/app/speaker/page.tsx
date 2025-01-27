import { getMeetupBySlug } from "@/lib/api";
import SquarePosterContent from "./speaker-info";

export default async function SquarePoster() {
  const data = await getMeetupBySlug("2025-01-17-next");

  return (
    <main className="min-h-screen bg-white">
      <SquarePosterContent data={data} />
    </main>
  );
}
