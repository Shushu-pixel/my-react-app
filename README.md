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

- Edit parade activities, event announcements, and FAQs in `src/data.js`. Event records control card dates and artwork, detail paragraphs, optional date/time/fee/venue facts, and their own action links.
- Edit the introduction, company story, brand, and external link constants in `src/App.jsx`.
- Edit the floating Christian Faith and Discipline labels and their hover/tap explanations in `src/components/TwinPillars.jsx`.
- Edit the drill page and its five learning descriptions in `src/DrillPage.jsx`. The homepage Drill card links to `drill.html`.
- Edit drill photo metadata and captions in `src/drillPhotos.js`. Original JPEGs are stored in `public/images/drill/`.
- Edit the badgework page in `src/BadgeworkPage.jsx`, award summaries in `src/badgeworkAwards.json`, and photo metadata in `src/badgeworkPhotos.js`. The homepage Badgework card links to `badgework.html`.
- Edit the camp page in `src/CampPage.jsx`, its 16 stories in `src/campStories.js`, and photo metadata in `src/campPhotos.json`. The homepage Camp card links to `camp.html`.
- Edit the games page in `src/GamesPage.jsx` and its photo/video metadata in `src/gamesMedia.json`. The homepage Games & fellowship card links to `games.html`.
- Update styling and brand colour tokens in `src/styles.css`.
- Registration and ordering: <https://bb2pch.github.io/>
- Boys’ Brigade Malaysia: <https://bbmalaysia.org/>
- Company Instagram: <https://www.instagram.com/bb2ndpuchong/reels/>

The three announcement cards show company-supplied information: Thanksgiving & Awards Day on **21 November 2026, 2:00 PM–8:00 PM**, at **Logos Presbyterian Church Puchong**, with a **RM15 fee including dinner** and its [event registration link](https://bb2pch.github.io/events/?e=EV-261023-734); **no parade throughout December 2026**, with the 2027 restart date awaiting a company announcement; and a **Stay tuned** placeholder for the next unannounced event. Only the Thanksgiving card offers event registration. Company founding dates, church sponsorship, and achievements have intentionally not been invented; add approved company history when available.

The company logo supplied for this website is stored in `public/images/company-logo.png` and appears in the header, footer, and browser icon. It is prepared with a transparent background and displayed on a white backplate to keep the original dark outlines visible on the navy page. The hero anchor illustration was generated for this website and is stored locally in `public/images/anchor-hero.png`.

The drill page displays five supplied photographs directly in a responsive gallery. Original JPEGs were downloaded from the company’s shared Drive folder and verified before saving under `public/images/drill/`. Every image displays at its natural aspect ratio with a caption; the photographs are not links and do not open a folder or lightbox.

The uploaded `IMG_7749.MP4` appears above the photographs as `public/videos/drill-practice.mp4`, with native playback, volume, seeking and fullscreen controls. The H.264/AAC streams are preserved without re-encoding, and MP4 metadata is moved to the beginning for streaming. Its preview is an actual frame saved as `public/images/drill-video-poster.jpg`. The video plays inline on mobile, preloads metadata only, and does not autoplay.

The badgework guide covers all 34 Senior Section proficiency awards described on pages 125–184 of the supplied November 2024 BB Malaysia Senior Member’s Handbook, including the four separate band awards. Learning summaries and suggested class activities are paraphrased from that section; they do not replace official assessment requirements or confirm a company course schedule. Each award stores its source page references.

Christian Education, First Aid, and Financial Stewardship appear first. Card covers use a distinct simple line icon for each award and have no photographs. Opening an award reveals its learning information and, when available, all corresponding company photos in a cream text/photograph split layout. Eight original JPEGs are self-hosted in `public/images/badgework/`. The large First Aid `.MOV` was not included because this page’s requested media are photographs. The requested Framer module returned HTTP 403, so the page-turn animation is implemented locally without a Framer runtime dependency.

The camp page pairs all 16 company-supplied photographs with their corresponding stories, in the supplied order. Text and photos alternate sides on desktop, starting with text on the left; on phones each story stacks above its photograph. Photos show directly at their natural aspect ratios without cropping, links, or a lightbox. Original images are stored in `public/images/camp/`, and their source Drive URLs are recorded in the photo metadata. The page describes camp experiences; it does not announce a date for a future camp.

The games page displays all 11 photos and four videos supplied through the games Drive folder in a responsive photo-and-video grid. All, Photos, and Videos filters help visitors browse. The gallery cards display media only, without visible titles, descriptions, type labels, or duration footers. Photos retain descriptive alt text and videos retain accessible labels. Videos autoplay muted when they enter the viewport and pause when they leave it or the browser tab is hidden. Native inline controls let visitors pause playback or turn on sound. Each video has a poster extracted from its actual footage and uses `preload="none"` so offscreen clips do not download before playback. Only videos visible in the selected gallery view can autoplay. Original photos are stored in `public/images/games/`; compatible H.264/AAC videos are remuxed without re-encoding to `public/videos/games/`, with streaming metadata at the start. Source Drive URLs are recorded in the media metadata. The Framer reference returned HTTP 403; the user approved a local gallery implementation in the company’s navy and gold colours.

The company logo, drill and badgework photographs, camp and games media, hero illustration, and fonts are self-hosted. Visitors need no Google Drive access or sign-in to view the photographs or play the videos. No API keys, backend, or extra environment variables are needed. External destinations open in new tabs.

## Validation

Verified with a production build and Chromium browser checks at desktop and mobile sizes. Checks cover the fan carousel (arrows, indicators, card selection, touch swipes), activity and event dialogs, Escape and keyboard focus handling, FAQ expansion, mobile navigation, destination URLs, and horizontal overflow. The external sites themselves remain subject to network availability.

Camp checks also cover all 16 photo/story pairings, alternating desktop rows, mobile text-first stacking, image aspect ratios, and navigation under a GitHub Pages project path.

Games checks cover all 15 media items, media-only cards, all three filters, photo aspect ratios, viewport-triggered muted autoplay and pause behavior, manual playback controls, mobile touch navigation, and HTTP range streaming under the project path.
