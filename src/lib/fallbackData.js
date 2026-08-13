/**
 * ==========================================================================
 * Fallback / Sample Content
 * --------------------------------------------------------------------------
 * Used automatically when Contentful credentials are absent or a request
 * fails. This lets the site build and look complete during initial setup.
 *
 * The shape of each object matches the normalized `Article` produced by
 * `normalizeArticle()` in contentful.js so the two are interchangeable.
 * `content` uses the Contentful Rich Text document format so the article
 * detail page renders identically to live content.
 * ==========================================================================
 */

/** Small helper to build a valid Rich Text document from plain paragraphs. */
function richText(paragraphs) {
  return {
    nodeType: 'document',
    data: {},
    content: paragraphs.map((text) => ({
      nodeType: 'paragraph',
      data: {},
      content: [{ nodeType: 'text', value: text, marks: [], data: {} }],
    })),
  };
}

/** Deterministic themed placeholder image (Unsplash source-style CDN). */
function img(seed, alt) {
  return {
    url: `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=70`,
    alt,
    width: 1200,
    height: 800,
  };
}

export const FALLBACK_ARTICLES = [
  {
    id: 'fallback-1',
    title: 'State Government Unveils Vision 2030 for Smart Infrastructure Development',
    slug: 'vision-2030-smart-infrastructure',
    category: 'Politics',
    summary:
      'A comprehensive blueprint highlights major connectivity pipelines across rural and urban centers over the next four years.',
    content: richText([
      'The State Government today unveiled its ambitious Vision 2030 roadmap, a comprehensive blueprint aimed at transforming both rural and urban infrastructure across the region over the next four years.',
      'Officials outlined major connectivity pipelines, including new expressways, upgraded rail links, and last-mile digital connectivity for interior districts. The plan places grassroots welfare at its core.',
      'Analysts note that the initiative could reshape the economic landscape of coastal Odisha, provided implementation timelines are met and funding remains consistent.',
    ]),
    featuredImage: img('photo-1477959858617-67f85cf4f1df', 'City skyline at dusk'),
    publishedDate: '2026-07-18T09:00:00.000Z',
    readTime: 3,
    isBreaking: true,
    isHeroFeature: true,
  },
  {
    id: 'fallback-2',
    title: 'New Irrigation Framework Empowers Smallholder Farmers',
    slug: 'irrigation-framework-smallholder-farmers',
    category: 'Agriculture',
    summary:
      'A modernized irrigation framework promises reliable water access for smallholder farmers across the state.',
    content: richText([
      'A newly announced irrigation framework is set to bring reliable water access to thousands of smallholder farmers, marking one of the largest agricultural interventions in recent years.',
      'The programme combines micro-irrigation subsidies with community-managed water storage, reducing dependence on erratic monsoon cycles.',
      'Farmer collectives have welcomed the move, calling it a decisive step toward climate-resilient agriculture.',
    ]),
    featuredImage: img('photo-1500382017468-9049fed747ef', 'Green farmland'),
    publishedDate: '2026-07-17T08:30:00.000Z',
    readTime: 4,
    isBreaking: true,
    isHeroFeature: false,
  },
  {
    id: 'fallback-3',
    title: 'Temple Restoration Dynamics: Merging History & Modern Safety',
    slug: 'temple-restoration-history-modern-safety',
    category: 'Heritage',
    summary:
      'Restoration teams balance centuries-old craftsmanship with modern structural safety standards.',
    content: richText([
      'Restoration of the region\u2019s historic temples is entering a new phase, blending traditional craftsmanship with modern structural engineering.',
      'Conservationists are documenting original stonework while reinforcing foundations against seismic and weathering risks.',
      'The effort aims to preserve cultural heritage for future generations without compromising visitor safety.',
    ]),
    featuredImage: img('photo-1524492412937-b28074a5d7da', 'Historic temple architecture'),
    publishedDate: '2026-07-16T10:15:00.000Z',
    readTime: 5,
    isBreaking: false,
    isHeroFeature: false,
  },
  {
    id: 'fallback-4',
    title: 'State Athletics Academy Scouting Program Launches Next Week',
    slug: 'athletics-academy-scouting-program',
    category: 'Sports',
    summary:
      'A statewide talent scouting drive will identify and nurture young athletes ahead of national trials.',
    content: richText([
      'The State Athletics Academy will launch a statewide scouting program next week, aiming to identify promising young athletes from district-level competitions.',
      'Selected candidates will receive coaching, nutrition support, and access to modern training facilities.',
      'Officials hope the initiative will strengthen the region\u2019s presence at upcoming national trials.',
    ]),
    featuredImage: img('photo-1461896836934-ffe607ba8211', 'Running track'),
    publishedDate: '2026-07-15T07:45:00.000Z',
    readTime: 3,
    isBreaking: false,
    isHeroFeature: false,
  },
  {
    id: 'fallback-5',
    title: 'E-commerce Logistics Center Slated Near Capital',
    slug: 'ecommerce-logistics-center-capital',
    category: 'Business',
    summary:
      'A major logistics hub is planned near the capital, promising thousands of jobs and faster deliveries.',
    content: richText([
      'A large e-commerce logistics center has been announced near the state capital, expected to create thousands of direct and indirect jobs.',
      'The facility will feature automated sorting systems and serve as a regional distribution backbone.',
      'Local businesses anticipate faster fulfillment and reduced shipping costs as a result.',
    ]),
    featuredImage: img('photo-1553413077-190dd305871c', 'Warehouse logistics'),
    publishedDate: '2026-07-14T11:00:00.000Z',
    readTime: 4,
    isBreaking: true,
    isHeroFeature: false,
  },
  {
    id: 'fallback-6',
    title: 'Smart Water Storage Modules Active Across Districts',
    slug: 'smart-water-storage-modules-districts',
    category: 'Local',
    summary:
      'Newly installed smart water storage modules are now operational across multiple districts.',
    content: richText([
      'Smart water storage modules have gone live across several districts, improving water availability for both households and agriculture.',
      'The IoT-enabled systems monitor levels in real time and alert authorities to leaks or shortages.',
      'Residents report noticeably improved supply reliability in the pilot zones.',
    ]),
    featuredImage: img('photo-1519692933481-e162a57d6721', 'Water reservoir'),
    publishedDate: '2026-07-13T09:20:00.000Z',
    readTime: 5,
    isBreaking: false,
    isHeroFeature: false,
  },
  {
    id: 'fallback-7',
    title: 'Annual Heritage Preservation Convention Begins Tomorrow',
    slug: 'heritage-preservation-convention',
    category: 'Heritage',
    summary:
      'Experts, historians, and artisans gather for the annual convention on cultural preservation.',
    content: richText([
      'The annual Heritage Preservation Convention opens tomorrow, bringing together historians, artisans, and policymakers.',
      'Sessions will cover digital archiving, artisan livelihoods, and sustainable tourism.',
      'Organizers expect record attendance this year following renewed public interest in cultural heritage.',
    ]),
    featuredImage: img('photo-1466442929976-97f336a657be', 'Ornate heritage building'),
    publishedDate: '2026-07-12T08:00:00.000Z',
    readTime: 3,
    isBreaking: false,
    isHeroFeature: false,
  },
  {
    id: 'fallback-8',
    title: 'Community Medical Drive Targets Interior Blocks',
    slug: 'community-medical-drive-interior-blocks',
    category: 'Local',
    summary:
      'A large-scale medical outreach program will bring free health screenings to remote communities.',
    content: richText([
      'A community medical drive is set to reach interior blocks, offering free health screenings and essential medicines.',
      'Mobile health units staffed by volunteer doctors will visit remote villages over the coming month.',
      'The program prioritizes maternal health, diabetes screening, and childhood immunization.',
    ]),
    featuredImage: img('photo-1584515933487-779824d29309', 'Medical outreach'),
    publishedDate: '2026-07-11T10:30:00.000Z',
    readTime: 4,
    isBreaking: false,
    isHeroFeature: false,
  },
];
