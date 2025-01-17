import yaml from 'js-yaml';
import { join } from "path";
import fs from "fs";
import matter from 'gray-matter';

type MeetingData = {
  title: string
  subtitle: string
  description: string
  when_where: string
  schedule: string
  what_to_expect: string
  Speaker_0: {
    name_0: string
    picture_0: string
    bio_0: string
    link1_0: string
    link2_0: string
  }
}

const homeFile = join(process.cwd(), "_home.yml");
const meetupsDirectory = join(process.cwd(), "_meetups");

export function getHomeData() {
  const fileContents = fs.readFileSync(homeFile, 'utf8');
  return yaml.load(fileContents) as any;
}

export function getMeetupBySlug(slug: string): MeetingData {
  const fullPath = join(meetupsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  return data as MeetingData;
}

export function getAllMeetups() {
  const slugs = fs.readdirSync(meetupsDirectory);
  const meetups = slugs
    .filter(slug => slug.endsWith('.md') && !slug.startsWith('.'))
    .map(slug => {
      const meetupData = getMeetupBySlug(slug.replace(/\.md$/, ''));
      return {
        ...meetupData,
        slug: slug.replace(/\.md$/, '')
      };
    });
  return meetups;
}
