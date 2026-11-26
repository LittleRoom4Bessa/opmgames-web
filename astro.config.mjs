// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

/**
 * hreflang groups for translation pairs. Slugs are siblings (`translationOf`),
 * not locale prefixes, so @astrojs/sitemap's i18n option does not apply.
 * x-default is the English URL.
 * @returns {Map<string, {lang: string, url: string}[]>}
 */
function translationLinks() {
  const dir = path.join(process.cwd(), 'src/content/blog');
  const posts = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const field = (key) => {
        const match = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
        return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : undefined;
      };
      return {
        id: file.replace(/\.(md|mdx)$/, ''),
        lang: field('lang') ?? 'en',
        translationOf: field('translationOf'),
        draft: field('draft') === 'true',
      };
    })
    .filter((post) => !post.draft);

  const byId = new Map(posts.map((post) => [post.id, post]));
  /** @type {Map<string, {lang: string, url: string}[]>} */
  const links = new Map();
  const site = 'https://opmgames.com';

  for (const post of posts) {
    if (!post.translationOf) continue;
    const original = byId.get(post.translationOf);
    if (!original) continue;
    const pair = [original, post];
    const en = pair.find((entry) => entry.lang === 'en');
    const zh = pair.find((entry) => entry.lang === 'zh');
    if (!en || !zh) continue;
    const enUrl = `${site}/blog/${en.id}/`;
    const zhUrl = `${site}/blog/${zh.id}/`;
    const group = [
      { lang: 'en', url: enUrl },
      { lang: 'zh', url: zhUrl },
      { lang: 'x-default', url: enUrl },
    ];
    for (const url of [enUrl, zhUrl, enUrl.replace(/\/$/, ''), zhUrl.replace(/\/$/, '')]) {
      links.set(url, group);
    }
  }
  return links;
}

const linksByUrl = translationLinks();

// https://astro.build/config
export default defineConfig({
  site: 'https://opmgames.com',
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        const group =
          linksByUrl.get(item.url) ?? linksByUrl.get(item.url.replace(/\/$/, '') + '/');
        if (group) item.links = group;
        return item;
      },
    }),
  ],
});
