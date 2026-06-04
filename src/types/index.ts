export interface Localized {
  en: string;
  th: string;
}

export interface CaseStudyMedia {
  hero: string;
  thumbs: string[];
  gallery: string[];
  video: string;
  videoPoster: string;
}

export interface CaseStudy {
  problem: Localized;
  role: Localized;
  whatTeamBuilt: Localized;
  personalContribution: Localized;
  hardestIssue: {
    headline: Localized;
    plain: Localized;
    whatWeDid: Localized;
  };
  decisions: Localized;
  collaboration: Localized;
  result: Localized;
  contactHandoff: Localized;
  media: CaseStudyMedia;
}

export interface Project {
  title: string;
  description: string;
  descriptionTh?: string;
  tag: string;
  techs: string[];
  githubUrl: string;
  liveUrl?: string;
  badge?: string;
  thumbnail?: string;
  previewVideo?: string;
  gallery?: string[];
  caseStudy?: CaseStudy;
}
