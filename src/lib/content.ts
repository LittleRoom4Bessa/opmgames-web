import { getCollection } from 'astro:content';

/** Exclude drafts in production builds; show them in dev. */
export async function getPosts() {
  return (
    await getCollection('blog', ({ data }) =>
      import.meta.env.PROD ? !data.draft : true
    )
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getAlbums() {
  return (await getCollection('albums')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
}

/** Original post id → langs of its translations (for index markers). */
export async function getTranslationLangs(): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  for (const p of await getPosts()) {
    if (!p.data.translationOf) continue;
    const arr = map.get(p.data.translationOf) ?? [];
    arr.push(p.data.lang);
    map.set(p.data.translationOf, arr);
  }
  return map;
}

export type Lang = 'en' | 'zh';

const CJK = /[\u3400-\u9FFF]/;

/** True when a string contains CJK unified ideographs (list titles, descriptions). */
export function containsCjk(text: string): boolean {
  return CJK.test(text);
}

function dateLocale(lang: Lang): string {
  return lang === 'zh' ? 'zh-CN' : 'en-US';
}

export function formatDate(date: Date, lang: Lang = 'en'): string {
  return date.toLocaleDateString(dateLocale(lang), {
    year: 'numeric',
    month: lang === 'zh' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatMonthYear(date: Date, lang: Lang = 'en'): string {
  return date.toLocaleDateString(dateLocale(lang), {
    year: 'numeric',
    month: lang === 'zh' ? 'long' : 'short',
    timeZone: 'UTC',
  });
}
