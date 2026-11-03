import type { Lang } from "../i18n/copy";

export type { Lang };

/** Standard API envelope wrapper for content endpoints */
export interface ApiEnvelope<T> {
  locale: Lang;
  data: T;
}

/** Hero Background Slide model (type: image|video) */
export interface HeroSlide {
  id?: number | string;
  type: "image" | "video";
  media_url: string;
  poster_url?: string;
  caption?: string;
}

/** Hero Featured Card model */
export interface HeroCard {
  id?: number | string;
  image_url: string;
  badge: string;
  title: string;
  subtitle: string;
}

/** Hero Metric / Fact model */
export interface HeroStat {
  id?: number | string;
  number: string;
  label: string;
}

/** News Item model */
export interface NewsItem {
  id?: number | string;
  date: string; // Y-m-d
  title: string;
  excerpt: string;
  link?: string;
}

/** Journey Stage Tag */
export interface JourneyTag {
  id?: number | string;
  name: string;
}

/** Journey Stage model */
export interface JourneyStage {
  id?: number | string;
  step: number;
  title: string;
  heading?: string;
  description: string;
  image_url?: string | null;
  tags?: Array<JourneyTag | string>;
}

/** Tag model */
export interface TagItem {
  id?: number | string;
  name: string;
}

/** At A Glance Item model */
export interface GlanceItem {
  id?: number | string;
  number: string;
  title: string;
  description: string;
}

/** Quality Standard model */
export interface StandardItem {
  id?: number | string;
  number: string;
  title: string;
  description: string;
}

/** Portfolio Project model */
export interface ProjectItem {
  id?: number | string;
  slug?: string;
  kicker?: string;
  title: string;
  category?: string;
  description?: string;
  image_url: string;
}

/** Architectural Service model */
export interface ServiceItem {
  id?: number | string;
  title: string;
  tags: string[];
  summary?: string;
  description: string;
}

/** Brand Client / Partner model */
export interface ClientItem {
  id?: number | string;
  name: string;
  logo_url?: string;
  website?: string;
}

/** Full Site Payload returned by GET /api/v1/site?locale={{locale}} */
export interface SitePayload {
  locale: Lang;
  hero?: {
    kicker?: string;
    title?: string;
    titleA?: string;
    titleB?: string;
    lead?: string;
    badge?: string;
    ctaPrimary?: string;
    cta_primary?: string;
    ctaSecondary?: string;
    cta_secondary?: string;
    scroll?: string;
    ticker?: string[];
    stats?: HeroStat[];
    cards?: HeroCard[];
    slides?: HeroSlide[];
    facts?: Array<[string, string]>;
    [key: string]: unknown;
  };
  news?: NewsItem[];
  glance?: GlanceItem[] | { kicker?: string; items: GlanceItem[] };
  journey?:
    | JourneyStage[]
    | { kicker?: string; title?: string; lead?: string; stages: JourneyStage[] };
  services?:
    | ServiceItem[]
    | { kicker?: string; title?: string; lead?: string; items: ServiceItem[] };
  work?:
    | ProjectItem[]
    | { kicker?: string; title?: string; lead?: string; items: ProjectItem[] };
  projects?: ProjectItem[];
  standards?:
    | StandardItem[]
    | { kicker?: string; title?: string; lead?: string; items: StandardItem[] };
  clients?:
    | ClientItem[]
    | { kicker?: string; title?: string; lead?: string; items: ClientItem[] };
  brand?: Record<string, unknown>;
  contact?: {
    kicker?: string;
    title?: string;
    lead?: string;
    note?: string;
    reply?: string;
    thanks?: string;
    rows?: Array<[string, string]>;
    [key: string]: unknown;
  };
  footer?: {
    note?: string;
    version?: string;
    [key: string]: unknown;
  };
}

/** Booth specification output submitted inside project brief */
export interface BriefSpecification {
  width?: number;
  depth?: number;
  height?: number;
  booth_type?: string;
  industry?: string;
  styles?: string[];
  colors?: string[];
  features?: string[];
  budget?: number;
  company?: string;
  notes?: string;
}

/** POST /api/v1/briefs payload */
export interface BriefSubmission {
  name: string;
  contact: string;
  details: string;
  locale?: Lang;
  website?: string; // Honeypot field (bots fill it, humans leave empty)
  specification?: BriefSpecification;
}

/** POST /api/v1/briefs response */
export interface BriefResponse {
  ok: boolean;
  id?: number | string;
  message: string;
}
