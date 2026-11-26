export type Lang = "en" | "zh";

/** Chrome strings. English pages stay English; zh articles switch the UI with the article. */
export function ui(lang: Lang) {
  const zh = lang === "zh";
  return {
    skip: zh ? "跳到正文" : "Skip to content",
    est: zh ? "始于 2026" : "Est. 2026",
    nav: {
      home: zh ? "首页" : "Home",
      blog: zh ? "博客" : "Blog",
      fotos: zh ? "相册" : "Fotos",
      about: zh ? "关于" : "About",
    },
    section: {
      home: zh ? "首页" : "HOME",
      blog: zh ? "博客" : "BLOG",
      fotos: zh ? "相册" : "FOTOS",
      about: zh ? "关于" : "ABOUT",
      tags: zh ? "标签" : "TAGS",
    } as Record<string, string>,
    dateline: zh ? "写于工作台" : "Filed from the workbench",
    close: zh ? "关闭 ×" : "Close ×",
    photoViewer: zh ? "照片查看" : "Photo viewer",
    featuredCover: zh ? "封面" : "Featured — cover",
    viewPhoto: (alt: string) => (zh ? `查看 ${alt}` : `View ${alt}`),
    category: (category: "devlog" | "essay") =>
      zh ? (category === "devlog" ? "开发日志" : "随笔") : category,
    morePosts: zh ? "相邻文章" : "More posts",
  };
}
