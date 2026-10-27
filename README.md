# 2nd Puchong Company

A responsive React website for 2nd Puchong Boys’ Brigade Company, welcoming **boys and girls aged 9–19**. Built with Vite, React, Lucide icons, and locally hosted DM Sans and Manrope fonts.

## Develop

Use Node.js 22 or newer (validated with Node.js 24).

```sh
npm ci
npm run dev -- --port 5173
```

The development server binds to `0.0.0.0`. Use the existing checkout; a separate worktree is unnecessary.

## Production

```sh
npm run build
npm run preview -- --port 4173
```

Deploy the generated `dist/` directory to a static web host. Vite uses relative asset URLs so the site works at a GitHub Pages project path or on a custom domain.

## Publish with GitHub Pages

1. Upload or push the project files to `Shushu-pixel/my-react-app` on the `main` branch. Include the `.github/workflows/deploy-pages.yml` file, source files, `public/`, `package.json`, and `package-lock.json`. Do not upload `node_modules/` or `dist/`.
2. In the GitHub repository, open **Settings → Pages**. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open **Actions → Deploy website to GitHub Pages → Run workflow** and select `main`. Future pushes to `main` deploy automatically.
4. When the workflow succeeds, GitHub Pages will show the live site URL. For this repository, the expected address is <https://shushu-pixel.github.io/my-react-app/>.

The workflow is stored in `.github/workflows/deploy-pages.yml`. Confirm deployment success in the repository’s Actions tab; a local build does not by itself publish the website. If Pages is unavailable for a private repository, make the repository public or use a GitHub plan that supports private-repository Pages. Do not replace the existing `bb2pch.github.io` registration portal with this website.

## Content and links

- Edit parade activities, event previews, and FAQs in `src/data.js`.
- Edit the introduction, company story, brand, and external link constants in `src/App.jsx`.
- Edit the drill page and its five learning descriptions in `src/DrillPage.jsx`. The homepage Drill card links to `drill.html`.
- Edit drill photo metadata and captions in `src/drillPhotos.js`. Original JPEGs are stored in `public/images/drill/`.
- Update styling and brand colour tokens in `src/styles.css`.
- Registration and ordering: <https://bb2pch.github.io/>
- Boys’ Brigade Malaysia: <https://bbmalaysia.org/>
- Company Facebook: <https://www.facebook.com/bb2ndpuchong/>

The three event cards are **programme previews**, not confirmed scheduled events. Replace them with actual event details and dates before announcing events. Company founding dates, church sponsorship, meeting arrangements, and achievements have intentionally not been invented; add approved company history when available.

The company logo supplied for this website is stored in `public/images/company-logo.png` and appears in the header, footer, and browser icon. It is prepared with a transparent background and displayed on a white backplate to keep the original dark outlines visible on the navy page. The hero anchor illustration was generated for this website and is stored locally in `public/images/anchor-hero.png`.

The drill page displays the six supplied photographs directly in a responsive gallery. Original JPEGs were downloaded from the company’s shared Drive folder and verified before saving under `public/images/drill/`. Every image displays at its natural aspect ratio with a caption; the photographs are not links and do not open a folder or lightbox. The source folder currently contains six JPEGs and no video files.

The company logo, drill photographs, hero illustration, and fonts are self-hosted. Visitors need no Google Drive access or sign-in to view the photographs. No API keys, backend, or extra environment variables are needed. External destinations open in new tabs.

## Validation

Verified with a production build and Chromium browser checks at desktop and mobile sizes. Checks cover the fan carousel (arrows, indicators, card selection, touch swipes), activity and event dialogs, Escape and keyboard focus handling, FAQ expansion, mobile navigation, destination URLs, and horizontal overflow. The external sites themselves remain subject to network availability.
