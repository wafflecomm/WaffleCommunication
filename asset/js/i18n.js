/**
 * Waffle Communication Lightweight Client-side i18n Engine
 * Supports: Korean (ko), English (en), Japanese (ja), Chinese (zh)
 */
(function () {
  'use strict';

  const SUPPORTED_LANGS = ['ko', 'en', 'ja', 'zh'];
  const DEFAULT_LANG = 'ko';
  const STORAGE_KEY = 'waffle_lang';

  const LANG_NAMES = {
    ko: '한국어',
    en: 'English',
    ja: '日本語',
    zh: '中文'
  };

  const LANG_FLAGS = {
    ko: '🇰🇷',
    en: '🇺🇸',
    ja: '🇯🇵',
    zh: '🇨🇳'
  };

  const cache = {};
  let currentLang = DEFAULT_LANG;

  // 1. Determine Initial Language
  function detectLanguage() {
    // 1-1. Check URL param (?lang=en)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && SUPPORTED_LANGS.includes(urlLang.toLowerCase())) {
      return urlLang.toLowerCase();
    }

    // 1-2. Check LocalStorage
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
      return savedLang;
    }

    // 1-3. Check Navigator Language
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('en')) return 'en';

    return DEFAULT_LANG;
  }

  // 2. Fetch Translation JSON
  async function fetchTranslations(lang) {
    if (cache[lang]) {
      return cache[lang];
    }

    try {
      // Relative path from index.html
      const res = await fetch(`asset/lang/${lang}.json?v=${Date.now()}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      cache[lang] = data;
      return data;
    } catch (err) {
      console.warn(`[i18n] Failed to load translations for ${lang}, falling back to ${DEFAULT_LANG}:`, err);
      if (lang !== DEFAULT_LANG) {
        return fetchTranslations(DEFAULT_LANG);
      }
      return null;
    }
  }

  // 3. Helper to resolve nested key (e.g. "services.traffic_catcher_title")
  function getNestedValue(obj, path) {
    if (!obj || !path) return null;
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
  }

  // 4. Update DOM Elements with Translations
  function updateDOM(data, lang) {
    if (!data) return;

    // Document Lang attribute
    document.documentElement.lang = lang;

    // Meta tags & Title
    if (data.meta) {
      if (data.meta.title) document.title = data.meta.title;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && data.meta.description) metaDesc.setAttribute('content', data.meta.description);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle && data.meta.title) ogTitle.setAttribute('content', data.meta.title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc && data.meta.description) ogDesc.setAttribute('content', data.meta.description);
    }

    // [data-i18n] Text & HTML replacement
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNestedValue(data, key);
      if (val !== null && val !== undefined) {
        if (el.hasAttribute('data-i18n-html') || /<[a-z][\s\S]*>/i.test(val)) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // [data-i18n-placeholder] Input placeholder replacement
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = getNestedValue(data, key);
      if (val !== null && val !== undefined) {
        el.setAttribute('placeholder', val);
      }
    });

    // [data-i18n-title] Tooltip / title attribute
    const titled = document.querySelectorAll('[data-i18n-title]');
    titled.forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = getNestedValue(data, key);
      if (val !== null && val !== undefined) {
        el.setAttribute('title', val);
      }
    });

    // [data-i18n-aria] Aria labels
    const ariaEls = document.querySelectorAll('[data-i18n-aria]');
    ariaEls.forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const val = getNestedValue(data, key);
      if (val !== null && val !== undefined) {
        el.setAttribute('aria-label', val);
      }
    });

    // Update Dropdown UI Active State
    updateSwitcherUI(lang);
  }

  // 5. Update Language Switcher UI components
  function updateSwitcherUI(lang) {
    const currentLabels = document.querySelectorAll('.lang-current-text');
    currentLabels.forEach(el => {
      el.textContent = LANG_NAMES[lang] || lang.toUpperCase();
    });

    const currentFlags = document.querySelectorAll('.lang-current-flag');
    currentFlags.forEach(el => {
      el.textContent = LANG_FLAGS[lang] || '🌐';
    });

    // Highlight active in menu
    const menuItems = document.querySelectorAll('[data-set-lang]');
    menuItems.forEach(item => {
      const itemLang = item.getAttribute('data-set-lang');
      if (itemLang === lang) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      }
    });
  }

  // 6. Set Language (Public Method)
  async function setLanguage(lang, updateUrl = true) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      lang = DEFAULT_LANG;
    }

    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    const translations = await fetchTranslations(lang);
    updateDOM(translations, lang);

    // Update URL parameter without page reload
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (lang === DEFAULT_LANG) {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', lang);
      }
      window.history.replaceState({}, '', url.toString());
    }

    // Trigger Custom Event for other modules
    window.dispatchEvent(new CustomEvent('waffle:langchange', { detail: { lang, translations } }));
  }

  // 7. Initialize Switcher Events & Dropdowns
  function setupSwitcherEvents() {
    // Dropdown toggle
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.lang-dropdown-toggle');
      const dropdown = e.target.closest('.lang-dropdown');

      // Close all other dropdowns
      document.querySelectorAll('.lang-dropdown.open').forEach(d => {
        if (!dropdown || d !== dropdown) {
          d.classList.remove('open');
        }
      });

      if (toggleBtn && dropdown) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('open');
      }
    });

    // Language option click
    document.addEventListener('click', (e) => {
      const optionBtn = e.target.closest('[data-set-lang]');
      if (optionBtn) {
        e.preventDefault();
        const selectedLang = optionBtn.getAttribute('data-set-lang');
        if (selectedLang) {
          setLanguage(selectedLang);
          
          // Close dropdown
          const parentDropdown = optionBtn.closest('.lang-dropdown');
          if (parentDropdown) {
            parentDropdown.classList.remove('open');
          }
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.lang-dropdown.open').forEach(d => d.classList.remove('open'));
      }
    });
  }

  // 8. Bootstrap Engine
  async function init() {
    setupSwitcherEvents();
    const initialLang = detectLanguage();
    await setLanguage(initialLang, false);
  }

  // Expose global API
  window.WaffleI18n = {
    setLanguage,
    getLanguage: () => currentLang,
    getSupportedLangs: () => [...SUPPORTED_LANGS]
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();