export type SpeakerIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Speaker = {
  activityTitle?: string;
  shortdescription?: string;
} & {
  [K in SpeakerIndex as `name_${K}`]?: string;
} & {
  [K in SpeakerIndex as `picture_${K}`]?: string;
} & {
  [K in SpeakerIndex as `bio_${K}`]?: string;
} & {
  [K in SpeakerIndex as `link1_${K}`]?: string;
} & {
  [K in SpeakerIndex as `link2_${K}`]?: string;
};

export type MeetingData = {
  title: string;
  subtitle: string;
  description: string;
  when_where: string;
  schedule: string;
  what_to_expect: string;
  is_next?: boolean;
  Speaker_0?: Speaker;
  Speaker_1?: Speaker;
  Speaker_2?: Speaker;
  Speaker_3?: Speaker;
  Speaker_4?: Speaker;
  Speaker_5?: Speaker;
  Speaker_6?: Speaker;
};

export type MeetupWithSlug = MeetingData & {
  slug: string;
};
