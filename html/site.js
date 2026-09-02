'use strict';

const body = document.body;
const menuButton = document.querySelector('#menu-button');
const sidebar = document.querySelector('#sidebar');
const sidebarOverlay = document.querySelector('#sidebar-overlay');
const searchInput = document.querySelector('#site-search');
const searchResults = document.querySelector('#search-results');
const mobileSearchButton = document.querySelector('#mobile-search-button');
const sidebarSearchButton = document.querySelector('#sidebar-search-button');
const sidebarPrintButton = document.querySelector('#sidebar-print-button');
const progressBar = document.querySelector('#reading-progress-bar');
const printButton = document.querySelector('#print-button');
const backToTopButton = document.querySelector('#back-to-top');
const chapterLinks = [...document.querySelectorAll('.toc-link')];
const searchableHeadings = [
  ...document.querySelectorAll('.book-article h2, .book-article h3'),
];

function setMenu(open) {
  if (open) setMobileSearch(false);
  body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭目录' : '打开目录');
  sidebarOverlay.hidden = !open;
}

function setMobileSearch(open) {
  body.classList.toggle('mobile-search-open', open);
  mobileSearchButton.setAttribute('aria-expanded', String(open));
  mobileSearchButton.setAttribute('aria-label', open ? '关闭搜索' : '打开搜索');
  if (open) {
    body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    sidebarOverlay.hidden = true;
    window.setTimeout(() => searchInput.focus(), 0);
  } else {
    closeSearch();
    searchInput.blur();
  }
}

menuButton.addEventListener('click', () => {
  setMenu(!body.classList.contains('menu-open'));
});

sidebarOverlay.addEventListener('click', () => setMenu(false));
sidebar.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
mobileSearchButton.addEventListener('click', () => {
  setMobileSearch(!body.classList.contains('mobile-search-open'));
});
sidebarSearchButton?.addEventListener('click', () => setMobileSearch(true));

function sectionText(heading) {
  const parts = [];
  let node = heading.nextElementSibling;
  while (node && !/^H[23]$/.test(node.tagName)) {
    parts.push(node.textContent ?? '');
    node = node.nextElementSibling;
  }
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

const searchIndex = searchableHeadings
  .map((heading) => ({
    id: heading.id,
    title: heading.childNodes[0]?.textContent?.trim() || heading.textContent.trim(),
    text: sectionText(heading),
  }))
  .filter(({ title }) => title !== '目录');

function closeSearch() {
  searchResults.hidden = true;
  searchInput.setAttribute('aria-expanded', 'false');
}

function renderSearchResults(query) {
  searchResults.replaceChildren();
  const normalized = query.trim().toLocaleLowerCase('zh-CN');
  if (!normalized) {
    closeSearch();
    return;
  }

  const matches = searchIndex
    .filter(({ title, text }) =>
      `${title} ${text}`.toLocaleLowerCase('zh-CN').includes(normalized),
    )
    .sort((left, right) => {
      const leftTitle = left.title.toLocaleLowerCase('zh-CN').includes(normalized);
      const rightTitle = right.title.toLocaleLowerCase('zh-CN').includes(normalized);
      return Number(rightTitle) - Number(leftTitle);
    })
    .slice(0, 12);

  if (matches.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'search-empty';
    empty.textContent = '未找到匹配章节。试试 Skill 名、问题现象或交付物。';
    searchResults.append(empty);
  } else {
    for (const match of matches) {
      const link = document.createElement('a');
      const title = document.createElement('strong');
      const excerpt = document.createElement('span');
      link.className = 'search-result';
      link.href = `#${match.id}`;
      title.textContent = match.title;
      const at = match.text.toLocaleLowerCase('zh-CN').indexOf(normalized);
      const start = Math.max(0, at - 36);
      excerpt.textContent = match.text
        ? `${start > 0 ? '…' : ''}${match.text.slice(start, start + 92)}${match.text.length > start + 92 ? '…' : ''}`
        : '打开该章节';
      link.append(title, excerpt);
      link.addEventListener('click', () => {
        closeSearch();
        setMobileSearch(false);
        searchInput.blur();
      });
      searchResults.append(link);
    }
  }

  searchResults.hidden = false;
  searchInput.setAttribute('aria-expanded', 'true');
}

searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
searchInput.addEventListener('focus', () => renderSearchResults(searchInput.value));
document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-wrap')) closeSearch();
});

document.addEventListener('keydown', (event) => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
  if (event.key === '/' && !typing) {
    event.preventDefault();
    if (window.innerWidth <= 780) setMobileSearch(true);
    else searchInput.focus();
  }
  if (event.key === 'Escape') {
    closeSearch();
    setMenu(false);
    setMobileSearch(false);
    searchInput.blur();
  }
});

function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
  backToTopButton.hidden = window.scrollY < 700;
}

window.addEventListener('scroll', updateScrollState, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 780) {
    setMenu(false);
    setMobileSearch(false);
  }
  updateScrollState();
});
updateScrollState();

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];
    if (!visible) return;
    for (const link of chapterLinks) {
      const active = link.dataset.section === visible.target.id;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  },
  { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
);

for (const heading of document.querySelectorAll('.book-article h2')) {
  observer.observe(heading);
}

printButton.addEventListener('click', () => window.print());
sidebarPrintButton?.addEventListener('click', () => window.print());
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
