import yaml from 'js-yaml';
import { join } from "path";
import fs from "fs";

const homeFile = join(process.cwd(), "_home.yml");
const meetupsDirectory = join(process.cwd(), "_meetups");

export function getHomeData() {
  const fileContents = fs.readFileSync(homeFile, 'utf8');
  return yaml.load(fileContents) as any;
}

export function getMeetupBySlug(slug: string) {
  const fullPath = join(meetupsDirectory, `${slug}.yml`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return yaml.load(fileContents) as any;
}

export function getAllMeetups() {
  const slugs = fs.readdirSync(meetupsDirectory);
  const meetups = slugs
    .filter(slug => slug.endsWith('.yml'))
    .map(slug => {
      const meetupData = getMeetupBySlug(slug.replace(/\.yml$/, ''));
      return {
        ...meetupData,
        slug: slug.replace(/\.yml$/, '')
      };
    });
  return meetups;
}
