import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { copy, type Lang } from "./copy";
import { getSite } from "../api/client";
import type {
  ClientItem,
  HeroCard,
  HeroSlide,
  NewsItem,
  SitePayload,
} from "../api/types";

type CopyShape = (typeof copy)["ar"];

interface LangContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  c: CopyShape;
  setLang: (l: Lang) => void;
  toggle: () => void;
  apiStatus: "idle" | "loading" | "live" | "fallback";
  siteData: SitePayload | null;
  news: NewsItem[];
  heroSlides: HeroSlide[];
  heroCards: HeroCard[];
  clientsData: ClientItem[];
  refreshSite: () => Promise<void>;
}

const LangCtx = createContext<LangContextValue | null>(null);

function mergeSiteData(base: CopyShape, site: SitePayload | null): CopyShape {
  if (!site) return base;

  // Deep clone base copy so we never mutate static dictionaries
  const merged: CopyShape = JSON.parse(JSON.stringify(base));

  // Merge Hero
  if (site.hero) {
    if (site.hero.badge) merged.hero.badge = site.hero.badge;
    if (site.hero.kicker) merged.hero.kicker = site.hero.kicker;
    if (site.hero.titleA) merged.hero.titleA = site.hero.titleA;
    if (site.hero.titleB) merged.hero.titleB = site.hero.titleB;
    if (site.hero.lead) merged.hero.lead = site.hero.lead;
    if (site.hero.ctaPrimary) merged.hero.ctaPrimary = site.hero.ctaPrimary;
    if (site.hero.cta_primary) merged.hero.ctaPrimary = site.hero.cta_primary;
    if (site.hero.ctaSecondary) merged.hero.ctaSecondary = site.hero.ctaSecondary;
    if (site.hero.cta_secondary) merged.hero.ctaSecondary = site.hero.cta_secondary;
    if (site.hero.scroll) merged.hero.scroll = site.hero.scroll;
    if (Array.isArray(site.hero.ticker) && site.hero.ticker.length > 0) {
      merged.hero.ticker = site.hero.ticker;
    }
    if (Array.isArray(site.hero.stats) && site.hero.stats.length > 0) {
      merged.hero.facts = site.hero.stats.map((s) => [s.number, s.label]) as [string, string][];
    } else if (Array.isArray(site.hero.facts) && site.hero.facts.length > 0) {
      merged.hero.facts = site.hero.facts as [string, string][];
    }
  }

  // Merge Glance
  const glanceItems = Array.isArray(site.glance)
    ? site.glance
    : site.glance && typeof site.glance === "object" && "items" in site.glance
    ? site.glance.items
    : null;

  if (glanceItems && glanceItems.length > 0) {
    glanceItems.forEach((it, i) => {
      if (merged.glance.items[i]) {
        if (it.title) merged.glance.items[i].t = it.title;
        if (it.description) merged.glance.items[i].d = it.description;
      }
    });
  }
  if (site.glance && !Array.isArray(site.glance) && site.glance.kicker) {
    merged.glance.kicker = site.glance.kicker;
  }

  // Merge Journey
  const journeyStages = Array.isArray(site.journey)
    ? site.journey
    : site.journey && typeof site.journey === "object" && "stages" in site.journey
    ? site.journey.stages
    : null;

  if (journeyStages && journeyStages.length > 0) {
    journeyStages.forEach((st, i) => {
      if (merged.journey.stages[i]) {
        if (st.title) merged.journey.stages[i].tag = st.title;
        if (st.heading || st.title) merged.journey.stages[i].title = st.heading || st.title || "";
        if (st.description) merged.journey.stages[i].body = st.description;
        if (Array.isArray(st.tags)) {
          merged.journey.stages[i].chips = st.tags.map((t) => (typeof t === "string" ? t : t.name));
        }
        if (st.image_url) merged.journey.stages[i].img = st.image_url;
      }
    });
  }
  if (site.journey && !Array.isArray(site.journey)) {
    if (site.journey.kicker) merged.journey.kicker = site.journey.kicker;
    if (site.journey.title) merged.journey.title = site.journey.title;
    if (site.journey.lead) merged.journey.lead = site.journey.lead;
  }

  // Merge Services
  const serviceList = Array.isArray(site.services)
    ? site.services
    : site.services && typeof site.services === "object" && "items" in site.services
    ? site.services.items
    : null;

  if (serviceList && serviceList.length > 0) {
    serviceList.forEach((s, i) => {
      if (merged.services.items[i]) {
        if (s.title) merged.services.items[i].t = s.title;
        if (s.description || s.summary) {
          merged.services.items[i].d = s.description || s.summary || "";
        }
        if (Array.isArray(s.tags)) {
          merged.services.items[i].tags = s.tags;
        }
      }
    });
  }
  if (site.services && !Array.isArray(site.services)) {
    if (site.services.kicker) merged.services.kicker = site.services.kicker;
    if (site.services.title) merged.services.title = site.services.title;
    if (site.services.lead) merged.services.lead = site.services.lead;
  }

  // Merge Work / Projects
  const projectList =
    site.projects ||
    (Array.isArray(site.work)
      ? site.work
      : site.work && typeof site.work === "object" && "items" in site.work
      ? site.work.items
      : null);

  if (projectList && projectList.length > 0) {
    projectList.forEach((p, i) => {
      if (merged.work.items[i]) {
        if (p.title) merged.work.items[i].title = p.title;
        if (p.category || p.kicker) merged.work.items[i].tag = p.category || p.kicker || "";
        if (p.description) merged.work.items[i].meta = p.description;
        if (p.image_url) merged.work.items[i].img = p.image_url;
      }
    });
  }
  if (site.work && !Array.isArray(site.work)) {
    if (site.work.kicker) merged.work.kicker = site.work.kicker;
    if (site.work.title) merged.work.title = site.work.title;
    if (site.work.lead) merged.work.lead = site.work.lead;
  }

  // Merge Standards
  const standardsList = Array.isArray(site.standards)
    ? site.standards
    : site.standards && typeof site.standards === "object" && "items" in site.standards
    ? site.standards.items
    : null;

  if (standardsList && standardsList.length > 0) {
    standardsList.forEach((s, i) => {
      if (merged.standards.items[i]) {
        if (s.title) merged.standards.items[i].t = s.title;
        if (s.description) merged.standards.items[i].d = s.description;
      }
    });
  }
  if (site.standards && !Array.isArray(site.standards)) {
    if (site.standards.kicker) merged.standards.kicker = site.standards.kicker;
    if (site.standards.title) merged.standards.title = site.standards.title;
    if (site.standards.lead) merged.standards.lead = site.standards.lead;
  }

  // Merge Contact
  if (site.contact) {
    if (site.contact.kicker) merged.contact.kicker = site.contact.kicker;
    if (site.contact.title) merged.contact.title = site.contact.title;
    if (site.contact.lead) merged.contact.lead = site.contact.lead;
    if (site.contact.note) merged.contact.note = site.contact.note;
    if (site.contact.reply) merged.contact.reply = site.contact.reply;
    if (site.contact.thanks) merged.contact.thanks = site.contact.thanks;
    if (Array.isArray(site.contact.rows)) {
      merged.contact.rows = site.contact.rows as [string, string][];
    }
  }

  return merged;
}

function getInitialLang(): Lang {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("tam_lang");
      if (stored === "ar" || stored === "en") {
        return stored;
      }
    } catch {
      // ignore
    }
  }
  return "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const [siteData, setSiteData] = useState<SitePayload | null>(null);
  const [apiStatus, setApiStatus] = useState<"idle" | "loading" | "live" | "fallback">("idle");
  const dir = lang === "ar" ? "rtl" : "ltr";

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("tam_lang", l);
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    setLangState((curr) => {
      const next = curr === "ar" ? "en" : "ar";
      try {
        localStorage.setItem("tam_lang", next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const fetchSiteData = useCallback(async (currentLang: Lang) => {
    try {
      const payload = await getSite(currentLang);
      if (payload) {
        setSiteData(payload);
        setApiStatus("live");
      } else {
        setApiStatus("fallback");
      }
    } catch {
      setApiStatus("fallback");
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    getSite(lang)
      .then((payload) => {
        if (!ignore) {
          if (payload) {
            setSiteData(payload);
            setApiStatus("live");
          } else {
            setApiStatus("fallback");
          }
        }
      })
      .catch(() => {
        if (!ignore) {
          setApiStatus("fallback");
        }
      });

    return () => {
      ignore = true;
    };
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    document.title = copy[lang].meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", copy[lang].meta.desc);
  }, [lang, dir]);

  const c = useMemo(() => {
    return mergeSiteData(copy[lang], siteData);
  }, [lang, siteData]);

  const news = useMemo<NewsItem[]>(() => {
    return siteData?.news || [];
  }, [siteData]);

  const heroSlides = useMemo<HeroSlide[]>(() => {
    return siteData?.hero?.slides || [];
  }, [siteData]);

  const heroCards = useMemo<HeroCard[]>(() => {
    return siteData?.hero?.cards || [];
  }, [siteData]);

  const clientsData = useMemo<ClientItem[]>(() => {
    if (Array.isArray(siteData?.clients)) return siteData.clients;
    if (siteData?.clients && typeof siteData.clients === "object" && "items" in siteData.clients) {
      return (siteData.clients as { items: ClientItem[] }).items;
    }
    return [];
  }, [siteData]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      dir,
      c,
      setLang,
      toggle,
      apiStatus,
      siteData,
      news,
      heroSlides,
      heroCards,
      clientsData,
      refreshSite: () => fetchSiteData(lang),
    }),
    [
      lang,
      dir,
      c,
      toggle,
      apiStatus,
      siteData,
      news,
      heroSlides,
      heroCards,
      clientsData,
      fetchSiteData,
    ]
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

/** Bold display + body font classes follow the active language. */
export function langFonts(lang: Lang) {
  return lang === "ar"
    ? { head: "font-ar", body: "font-ar" }
    : { head: "font-display", body: "font-sans" };
}
