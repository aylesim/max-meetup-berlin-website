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
  Speaker_0?: {
    activityTitle?: string;
    shortdescription?: string;
    name_0: string;
    picture_0: string;
    bio_0: string;
    link1_0: string;
    link2_0?: string;
  };
  Speaker_1?: {
    activityTitle?: string;
    shortdescription?: string;
    name_1: string;
    picture_1: string;
    bio_1: string;
    link1_1: string;
    link2_1?: string;
  };
  Speaker_2?: {
    activityTitle?: string;
    shortdescription?: string;
    name_2: string;
    picture_2: string;
    bio_2: string;
    link1_2: string;
    link2_2?: string;
  };
  Speaker_3?: {
    activityTitle?: string;
    shortdescription?: string;
    name_3: string;
    picture_3: string;
    bio_3: string;
    link1_3: string;
    link2_3?: string;
  };
  Speaker_4?: {
    activityTitle?: string;
    shortdescription?: string;
    name_4: string;
    picture_4: string;
    bio_4: string;
    link1_4: string;
    link2_4?: string;
  };
  Speaker_5?: {
    activityTitle?: string;
    shortdescription?: string;
    name_5: string;
    picture_5: string;
    bio_5: string;
    link1_5: string;
    link2_5?: string;
  };
  Speaker_6?: {
    activityTitle?: string;
    shortdescription?: string;
    name_6: string;
    picture_6: string;
    bio_6: string;
    link1_6: string;
    link2_6?: string;
  };
};

type MeetupWithSlug = MeetingData & {
  slug: string;
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

export function getAllMeetups(): MeetupWithSlug[] {
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
export function getNextMeetup(): MeetupWithSlug | undefined {
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
