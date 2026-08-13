# Kalinga First 24*7 News

A modern, high-performance editorial news portal for the regional outlet **Kalinga First 24\*7 News**, built with [Astro](https://astro.build) and backed by [Contentful](https://www.contentful.com) as a headless CMS.

> **Truth First. Kalinga First.**

---

## Tech Stack

| Layer          | Choice                                                        |
| -------------- | ------------------------------------------------------------ |
| Framework      | Astro v4 (static / SSG, ultra-fast pre-rendered pages)       |
| Headless CMS   | Contentful (`contentful` SDK)                                |
| Rich Text      | `@contentful/rich-text-html-renderer`                        |
| Styling        | Scoped Astro styles + global CSS custom properties           |
| Icons          | FontAwesome (CDN)                                            |
| Typography     | Google Fonts — `Lora` (headlines) + `Inter` (body/UI)       |
| Interactivity  | Astro Islands (lightweight vanilla JS)                       |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Contentful

Copy the template and fill in your credentials:

```bash
cp .env.template .env
```

Then edit `.env`:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
```

> **No credentials yet?** The site still runs. It automatically serves bundled
> **fallback sample content** (`src/lib/fallbackData.js`) so you can develop and
> preview the full UI before connecting Contentful.

### 3. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321).

### 4. Build for production

```bash
npm run build      # outputs to ./dist
npm run preview    # preview the production build locally
```

---

## Contentful Content Model

Create a Content Model with the API identifier **`article`** and these fields:

| Field           | Field ID         | Type              | Notes                                                   |
| --------------- | ---------------- | ----------------- | ------------------------------------------------------- |
| Title           | `title`          | Short text        | Headline                                                |
| Slug            | `slug`           | Short text        | Unique URL slug                                         |
| Category        | `category`       | Short text        | One of: Politics, Business, Agriculture, Heritage, Sports, Local |
| Featured Image  | `featuredImage`  | Media (Asset)     | Hero / card image                                       |
| Summary         | `summary`        | Long text         | Short excerpt                                           |
| Content         | `content`        | Rich text         | Full article body                                       |
| Published Date  | `publishedDate`  | Date & time       | Sort key                                                |
| Read Time       | `readTime`       | Number (integer)  | Minutes                                                 |
| Is Breaking     | `isBreaking`     | Boolean           | Shows in the breaking-news ticker                       |
| Is Hero Feature | `isHeroFeature`  | Boolean           | Placed in the home page hero slot                       |

---

## Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── lib/
│   │   ├── contentful.js       # Client + data-access layer (with fallbacks)
│   │   └── fallbackData.js     # Bundled sample content
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── BreakingTicker.astro
│   │   └── NewsCard.astro
│   ├── layouts/
│   │   └── Layout.astro        # Global styles, fonts, design tokens
│   └── pages/
│       ├── index.astro         # Home
│       ├── about.astro
│       ├── contact.astro
│       └── articles/
│           ├── index.astro     # Feed + client-side filter/search
│           └── [slug].astro    # Dynamic article detail (getStaticPaths)
├── .env.template
├── astro.config.mjs
└── package.json
```

---

## Design System

Global CSS custom properties (defined in `src/layouts/Layout.astro`):

```css
--primary:      #0A2540;  /* Deep Navy Blue */
--accent:       #C8102E;  /* Crimson Red */
--text-dark:    #1A1A1A;
--text-muted:   #626262;
--bg-light:     #F4F6F8;
--bg-white:     #FFFFFF;
--border-color: #E2E8F0;
--font-heading: 'Lora', serif;
--font-body:    'Inter', sans-serif;
```

---

## Resilience & Error Handling

Every data call in `src/lib/contentful.js`:

- Detects missing / placeholder credentials and warns instead of crashing.
- Wraps all network requests in `try/catch`.
- Returns bundled fallback content on empty responses or failures.

This guarantees the site builds successfully in any environment.

---

## Notes

- `legacy-static-index.html` is the original single-file static prototype, kept
  for reference. It is not part of the Astro build and can be safely deleted.
```
