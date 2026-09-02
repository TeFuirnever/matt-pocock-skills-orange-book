'use strict';

const themeStorageKey = 'orange-book-theme';
const themeLabels = {
  system: '跟随系统',
  light: '浅色',
  dark: '深色',
};
const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const themeColor = document.querySelector('meta[name="theme-color"]');
const themeStatus = document.querySelector('#theme-status');
const colorSchemeMedia = window.matchMedia?.('(prefers-color-scheme: dark)');
let currentPreference = 'system';

function announce(message) {
  root.dataset.themePersistence = 'unavailable';
  if (themeStatus) themeStatus.textContent = message;
}

function savedPreference() {
  try {
    const value = window.localStorage.getItem(themeStorageKey);
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    announce('无法读取主题偏好；当前主题仅在本次浏览中有效。');
    return 'system';
  }
}

function systemTheme() {
  return colorSchemeMedia?.matches ? 'dark' : 'light';
}

function applyPreference(preference) {
  const theme = preference === 'system' ? systemTheme() : preference;
  currentPreference = preference;
  root.dataset.theme = theme;
  root.dataset.themePreference = preference;
  themeColor?.setAttribute('content', theme === 'dark' ? '#1c1f24' : '#f8f7f4');
  if (themeSelect) {
    themeSelect.value = preference;
    themeSelect.setAttribute('aria-label', `主题：${themeLabels[preference]}`);
  }
}

function savePreference(preference) {
  try {
    if (preference === 'system') window.localStorage.removeItem(themeStorageKey);
    else window.localStorage.setItem(themeStorageKey, preference);
  } catch {
    announce('无法保存主题偏好；当前主题仅在本次浏览中有效。');
  }
  applyPreference(preference);
}

applyPreference(savedPreference());

themeSelect?.addEventListener('change', () => savePreference(themeSelect.value));
colorSchemeMedia?.addEventListener?.('change', () => {
  if (currentPreference === 'system') applyPreference('system');
});
