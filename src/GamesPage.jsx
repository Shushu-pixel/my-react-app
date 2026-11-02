import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, Camera, Film, Instagram, Menu, X } from 'lucide-react';
import Brand from './components/Brand.jsx';
import gamesMedia from './gamesMedia.json';

const REGISTER_URL = 'https://bb2pch.github.io/';
const INSTAGRAM_URL = 'https://www.instagram.com/bb2ndpuchong/reels/';
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

function interleaveMedia(media) {
  const photos = media.filter((item) => item.type === 'photo');
  const videos = media.filter((item) => item.type === 'video');
  const result = [];
  let videoIndex = 0;
  photos.forEach((photo, index) => {
    result.push(photo);
    if ((index + 1) % 3 === 0 && videoIndex < videos.length) result.push(videos[videoIndex++]);
  });
  return result.concat(videos.slice(videoIndex));
}

function formatDuration(seconds) {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds <= 0) return null;
  const rounded = Math.floor(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, '0')}`;
}

const galleryMedia = interleaveMedia(gamesMedia);
const photoCount = galleryMedia.filter((item) => item.type === 'photo').length;
const videoCount = galleryMedia.filter((item) => item.type === 'video').length;
const galleryFilters = [
  { id: 'all', label: 'All', count: galleryMedia.length },
  { id: 'photo', label: 'Photos', count: photoCount },
  { id: 'video', label: 'Videos', count: videoCount },
];

function GamesEyebrow({ children }) {
  return <div className="games-eyebrow"><span />{children}</div>;
}

export default function GamesPage({ homeHref = './' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const menuButton = useRef(null);
  const videos = useRef(new Map());
  const visibleMedia = filter === 'all' ? galleryMedia : galleryMedia.filter((item) => item.type === filter);

  const pauseVideos = (except = null) => {
    videos.current.forEach((video) => {
      if (video !== except && !video.paused) video.pause();
    });
  };

  const selectFilter = (nextFilter) => {
    if (nextFilter === filter) return;
    pauseVideos();
    setFilter(nextFilter);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => () => {
    videos.current.forEach((video) => {
      if (!video.paused) video.pause();
    });
  }, []);

  const showingLabel = filter === 'all'
    ? `Showing all ${visibleMedia.length} moments.`
    : `Showing ${visibleMedia.length} ${filter === 'photo' ? 'photos' : 'videos'}.`;

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header games-header" id="games-top">
      <div className="header-inner">
        <Brand homeHref={homeHref} />
        <nav id="games-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Games navigation">
          <a href="#overview" onClick={() => setMenuOpen(false)}>Overview</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#join" onClick={() => setMenuOpen(false)}>Join us</a>
          <a className="mobile-join" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Registration & orders <ArrowUpRight size={14} aria-hidden="true" /></a>
        </nav>
        <a className="header-join" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Join the company <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button ref={menuButton} className="menu-toggle icon-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="games-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>

    <main id="main" className="games-page">
      <section className="games-hero section-shell" id="overview" aria-labelledby="games-title">
        <a className="games-back" href={`${homeHref}#parade`}><ArrowLeft size={15} aria-hidden="true" />Back to parade life</a>
        <div className="games-hero-content">
          <div><GamesEyebrow>GAMES & FELLOWSHIP</GamesEyebrow><h1 id="games-title">Good games.<br /><span>Great friends.</span></h1></div>
          <div className="games-hero-intro"><p>A little friendly competition. A lot of laughter. Games bring us together, build teamwork and sportsmanship, and give everyone a chance to belong.</p><a className="games-explore" href="#gallery">Explore the good times <ArrowDown size={16} aria-hidden="true" /></a><div className="games-values"><span>TEAMWORK</span><span aria-hidden="true">✦</span><span>SPORTSMANSHIP</span><span aria-hidden="true">✦</span><span>FRIENDSHIP</span></div></div>
        </div>
      </section>

      <section className="games-gallery section-shell" id="gallery" aria-labelledby="games-gallery-title">
        <div className="games-gallery-toolbar">
          <div className="games-gallery-heading"><GamesEyebrow>PHOTO & VIDEO GALLERY</GamesEyebrow><h2 id="games-gallery-title">More than just a game.</h2></div>
          <div className="games-filters" role="group" aria-label="Filter gallery">{galleryFilters.map((option) => <button type="button" key={option.id} className={`games-filter${filter === option.id ? ' games-filter-active' : ''}`} aria-pressed={filter === option.id} aria-controls="games-gallery-grid" onClick={() => selectFilter(option.id)}>{option.label}<span>{option.count}</span></button>)}</div>
        </div>
        <div className="games-gallery-meta"><p className="games-gallery-status" role="status" aria-live="polite" aria-atomic="true">{showingLabel}</p><span>SHARED MOMENTS. STRONGER FRIENDSHIPS.</span></div>

        <div className="games-gallery-grid" id="games-gallery-grid">
          {visibleMedia.map((item, index) => {
            const isVideo = item.type === 'video';
            const duration = isVideo ? formatDuration(item.duration) : null;
            return <article className={`games-media-card${isVideo ? ' games-media-card-video' : ''}`} data-media-type={item.type} key={item.id} aria-labelledby={`games-media-title-${item.id}`}>
              <figure className="games-media-figure">
                <div className="games-media-visual">
                  {isVideo ? <video
                    ref={(node) => {
                      if (node) videos.current.set(item.id, node);
                      else videos.current.delete(item.id);
                    }}
                    src={assetUrl(item.src)}
                    poster={item.poster ? assetUrl(item.poster) : undefined}
                    width={item.width}
                    height={item.height}
                    controls
                    playsInline
                    preload="none"
                    aria-labelledby={`games-media-title-${item.id}`}
                    onPlay={(event) => pauseVideos(event.currentTarget)}
                  >Your browser cannot play this video.</video> : <img className="games-media-image" src={assetUrl(item.src)} width={item.width} height={item.height} alt={item.alt} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />}
                </div>
                <figcaption className="games-media-caption">
                  <div className="games-media-kind"><span>{isVideo ? <Film size={13} aria-hidden="true" /> : <Camera size={13} aria-hidden="true" />}{isVideo ? 'VIDEO' : 'PHOTO'}</span>{duration && <span className="games-media-duration">{duration}</span>}</div>
                  <h3 id={`games-media-title-${item.id}`}>{item.title}</h3>
                </figcaption>
              </figure>
            </article>;
          })}
        </div>
        {visibleMedia.length === 0 && <p className="games-gallery-empty">There are no moments in this view yet. Choose another filter to explore the gallery.</p>}
      </section>

      <section className="games-invitation section-shell" id="join" aria-labelledby="games-invitation-title"><div className="games-invitation-panel"><div className="games-invitation-copy"><GamesEyebrow>FIND YOUR PEOPLE</GamesEyebrow><h2 id="games-invitation-title">Come for the games.<br /><span>Stay for the friendships.</span></h2><p>There’s room for you in our team. Boys and girls aged 9–19 are welcome — bring your curiosity, try something new, and grow with us.</p></div><div className="games-invitation-actions"><a className="button button-gold" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Registration & orders <ArrowUpRight size={17} aria-hidden="true" /></a><a className="games-social-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><Instagram size={16} aria-hidden="true" />Follow our adventures <ArrowUpRight size={14} aria-hidden="true" /></a></div></div></section>
    </main>

    <footer className="site-footer games-footer"><div className="section-shell"><div className="games-footer-top"><div><Brand footer homeHref={homeHref} /><p>Good games. Great friends.<br />Growing together, every step of the way.</p></div><div className="games-footer-links"><a href={homeHref}><ArrowLeft size={14} aria-hidden="true" />Back to our company</a><a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Registration & orders <ArrowUpRight size={14} aria-hidden="true" /></a><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Our Instagram <ArrowUpRight size={14} aria-hidden="true" /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} 2ND PUCHONG COMPANY.</span><span>BOYS & GIRLS, AGED 9–19. ALL ARE WELCOME.</span><a href="#games-top">BACK TO TOP ↑</a></div></div></footer>
  </>;
}
