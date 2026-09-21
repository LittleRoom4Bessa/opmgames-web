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

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}
