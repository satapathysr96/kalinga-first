/**
 * ==========================================================================
 * Contentful Client + Data Access Layer
 * --------------------------------------------------------------------------
 * This module is the single source of truth for fetching `article` content.
 *
 * Design goals:
 *  - Gracefully degrade: if credentials are missing or a network call fails,
 *    we log a warning and return bundled fallback content so the site still
 *    builds and renders during setup / offline development.
 *  - Normalize Contentful's nested response shape into a flat, predictable
 *    `Article` object that components can consume without null-checking chaos.
 * ==========================================================================
 */

import { createClient } from 'contentful';
import { FALLBACK_ARTICLES } from './fallbackData.js';

const SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID;
const DELIVERY_TOKEN = import.meta.env.CONTENTFUL_DELIVERY_TOKEN;
const ENVIRONMENT = import.meta.env.CONTENTFUL_ENVIRONMENT || 'master';

/**
 * True only when both required credentials are present AND are not the
 * placeholder values shipped in `.env.template`.
 */
export const isContentfulConfigured = Boolean(
  SPACE_ID &&
    DELIVERY_TOKEN &&
    SPACE_ID !== 'your_space_id_here' &&
    DELIVERY_TOKEN !== 'your_delivery_token_here'
);

let client = null;
if (isContentfulConfigured) {
  client = createClient({
    space: SPACE_ID,
    accessToken: DELIVERY_TOKEN,
    environment: ENVIRONMENT,
  });
} else {
  console.warn(
    '\n[Contentful] Credentials not configured — serving bundled FALLBACK content.\n' +
      '            Copy .env.template to .env and add your CONTENTFUL_SPACE_ID and\n' +
      '            CONTENTFUL_DELIVERY_TOKEN to load live content.\n'
  );
}

/* -------------------------------------------------------------------------- */
/*  Normalization helpers                                                      */
/* -------------------------------------------------------------------------- */

/** Safely resolve a Contentful asset (image) into a plain URL + alt text. */
function normalizeImage(asset) {
  const file = asset?.fields?.file;
  if (!file?.url) return null;
  const url = file.url.startsWith('//') ? `https:${file.url}` : file.url;
  return {
    url,
    alt: asset?.fields?.title || asset?.fields?.description || '',
    width: file?.details?.image?.width ?? null,
    height: file?.details?.image?.height ?? null,
  };
}

/**
 * Convert a raw Contentful entry into a flat Article object.
 * Every field is defensively defaulted so downstream code never crashes on
 * partially-filled entries.
 */
function normalizeArticle(entry) {
  const f = entry?.fields ?? {};
  return {
    id: entry?.sys?.id ?? f.slug ?? crypto.randomUUID?.() ?? String(Math.random()),
    title: f.title ?? 'Untitled Story',
    slug: f.slug ?? '',
    category: f.category ?? 'Local',
    summary: f.summary ?? '',
    // `content` is Contentful Rich Text (a document object) — kept raw here and
    // rendered on the detail page. May be undefined for fallback data.
    content: f.content ?? null,
    featuredImage: normalizeImage(f.featuredImage),
    publishedDate: f.publishedDate ?? entry?.sys?.createdAt ?? null,
    readTime: typeof f.readTime === 'number' ? f.readTime : 3,
    isBreaking: Boolean(f.isBreaking),
    isHeroFeature: Boolean(f.isHeroFeature),
  };
}

/* -------------------------------------------------------------------------- */
/*  Public data-access functions                                              */
/* -------------------------------------------------------------------------- */

/**
 * Fetch all articles, newest first.
 * @returns {Promise<Array>} normalized Article[]
 */
export async function getAllArticles() {
  if (!client) return [...FALLBACK_ARTICLES];

  try {
    const res = await client.getEntries({
      content_type: 'article',
      order: '-fields.publishedDate',
      include: 2,
    });
    const items = res?.items ?? [];
    if (items.length === 0) {
      console.warn('[Contentful] No articles returned — using fallback content.');
      return [...FALLBACK_ARTICLES];
    }
    return items.map(normalizeArticle);
  } catch (err) {
    console.error('[Contentful] getAllArticles failed:', err?.message ?? err);
    return [...FALLBACK_ARTICLES];
  }
}

/**
 * Fetch a single article by its unique slug.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getArticleBySlug(slug) {
  if (!slug) return null;

  if (!client) {
    return FALLBACK_ARTICLES.find((a) => a.slug === slug) ?? null;
  }

  try {
    const res = await client.getEntries({
      content_type: 'article',
      'fields.slug': slug,
      include: 2,
      limit: 1,
    });
    const entry = res?.items?.[0];
    if (!entry) {
      return FALLBACK_ARTICLES.find((a) => a.slug === slug) ?? null;
    }
    return normalizeArticle(entry);
  } catch (err) {
    console.error(`[Contentful] getArticleBySlug("${slug}") failed:`, err?.message ?? err);
    return FALLBACK_ARTICLES.find((a) => a.slug === slug) ?? null;
  }
}

/** All articles flagged for the breaking-news ticker. */
export async function getBreakingArticles() {
  const all = await getAllArticles();
  const breaking = all.filter((a) => a.isBreaking);
  return breaking.length ? breaking : all.slice(0, 3);
}

/** The single hero-feature story, falling back to the most recent article. */
export async function getHeroArticle() {
  const all = await getAllArticles();
  return all.find((a) => a.isHeroFeature) ?? all[0] ?? null;
}

/**
 * Related stories for a given article: same category first, then recent others.
 * Excludes the article itself.
 */
export async function getRelatedArticles(article, limit = 3) {
  if (!article) return [];
  const all = await getAllArticles();
  const others = all.filter((a) => a.slug !== article.slug);
  const sameCategory = others.filter((a) => a.category === article.category);
  const rest = others.filter((a) => a.category !== article.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Distinct list of categories present in the content set. */
export async function getCategories() {
  const all = await getAllArticles();
  return [...new Set(all.map((a) => a.category).filter(Boolean))];
}
