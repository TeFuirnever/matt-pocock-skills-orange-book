const markdownUrlPattern = /\]\((https?:\/\/[^)\s]+)\)/g;
const mattPocockSkillsPath = '/mattpocock/skills';

export function collectMarkdownUrls(markdown) {
  return [...markdown.matchAll(markdownUrlPattern)].flatMap((match) => {
    try {
      return [new URL(match[1])];
    } catch {
      return [];
    }
  });
}

export function hasMattPocockSkillsSource(urls) {
  return urls.some(
    (url) =>
      url.origin === 'https://github.com' &&
      (url.pathname === mattPocockSkillsPath ||
        url.pathname.startsWith(`${mattPocockSkillsPath}/`)),
  );
}

export function hasAiHeroSource(urls) {
  return urls.some((url) => url.origin === 'https://www.aihero.dev');
}
