import yaml from "js-yaml";
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

type MeetingData = {
  title: string;
  subtitle: string;
  description: string;
  when_where: string;
  schedule: string;
  what_to_expect: string;
  is_next?: boolean;
  Speaker_0: {
    name_0: string;
    picture_0: string;
    bio_0: string;
    link1_0: string;
    link2_0: string;
  };
  // Add other speaker types as needed
};

const homeFile = join(process.cwd(), "_home.yml");
const meetupsDirectory = join(process.cwd(), "_meetups");

export function getHomeData() {
  const fileContents = fs.readFileSync(homeFile, "utf8");
  return yaml.load(fileContents) as any;
}

export function getMeetupBySlug(slug: string): MeetingData {
  const fullPath = join(meetupsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return data as MeetingData;
}

export function getAllMeetups() {
  const slugs = fs.readdirSync(meetupsDirectory);
  const meetups = slugs
    .filter((slug) => slug.endsWith(".md") && !slug.startsWith("."))
    .map((slug) => {
      const meetupData = getMeetupBySlug(slug.replace(/\.md$/, ""));
      return {
        ...meetupData,
        slug: slug.replace(/\.md$/, ""),
      };
    });
  return meetups;
}

// Function to get the next meetup
export function getNextMeetup() {
  const meetups = getAllMeetups();

  // First, check if any meetup is explicitly marked as next
  const nextMeetup = meetups.find((meetup) => meetup.is_next);
  if (nextMeetup) return nextMeetup;

  // Otherwise, fallback to the most recent one by date in the slug
  const sortedMeetups = [...meetups].sort((a, b) => {
    const dateA = a.slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || "";
    const dateB = b.slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || "";
    return dateB.localeCompare(dateA);
  });

  return sortedMeetups[0];
}
