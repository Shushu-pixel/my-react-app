import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, Instagram, Menu, X } from 'lucide-react';
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

function isHalfInViewport(video) {
  const rect = video.getBoundingClientRect();
  const width = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
  const height = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
  return rect.width > 0 && rect.height > 0 && width * height / (rect.width * rect.height) >= 0.5;
}

function ViewportVideo({ item, registerVideo, onAudiblePlayback }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    registerVideo(item.id, video);
    let active = true;
    let visible = false;
    let manuallyPaused = false;
    let expectedPauses = 0;
    let playPending = false;
    let revision = 0;

    const canPlay = () => active && video.isConnected && visible && !document.hidden && !manuallyPaused && isHalfInViewport(video);
    const pauseForVisibility = () => {
      if (!video.paused) {
        expectedPauses += 1;
        video.pause();
      }
    };
    const playWhenVisible = () => {
      if (!canPlay() || video.ended || !video.paused || playPending) return;
      playPending = true;
      const attemptedRevision = revision;
      let playback;
      try {
        playback = video.play();
      } catch {
        playPending = false;
        return;
      }
      Promise.resolve(playback)
        .then(() => {
          // A play request can finish after scrolling, filtering, or hiding the page.
          if (!canPlay()) pauseForVisibility();
        })
        .catch(() => {
          // Native controls remain usable when the browser declines autoplay.
        })
        .finally(() => {
          playPending = false;
          // Retry only after a real visibility change, never in a rejection loop.
          if (active && revision !== attemptedRevision) playWhenVisible();
        });
    };
    const updateVisibility = (nextVisible) => {
      if (nextVisible === visible) return;
      visible = nextVisible;
      revision += 1;
      if (visible) {
        manuallyPaused = false;
        playWhenVisible();
      } else pauseForVisibility();
    };
    const onPause = () => {
      if (expectedPauses > 0) {
        expectedPauses -= 1;
        return;
      }
      if (active && visible && !document.hidden && !video.ended) {
        manuallyPaused = true;
        revision += 1;
      }
    };
    const onPlay = () => {
      // Ignore a queued play event if the user has already paused the clip.
      if (video.paused) return;
      if (!active || !video.isConnected || !visible || document.hidden || !isHalfInViewport(video)) {
        pauseForVisibility();
        return;
      }
      manuallyPaused = false;
      onAudiblePlayback(video);
    };
    const onVolumeChange = () => {
      if (!video.paused) onAudiblePlayback(video);
    };
    const onVisibilityChange = () => {
      revision += 1;
      if (document.hidden) pauseForVisibility();
      else {
        if (visible && !isHalfInViewport(video)) visible = false;
        playWhenVisible();
      }
    };

    video.addEventListener('pause', onPause);
    video.addEventListener('play', onPlay);
    video.addEventListener('volumechange', onVolumeChange);
    document.addEventListener('visibilitychange', onVisibilityChange);
    const observer = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver((entries) => {
        if (!active) return;
        entries.forEach((entry) => updateVisibility(entry.isIntersecting && entry.intersectionRatio >= 0.5));
      }, { threshold: [0, 0.5] })
      : null;
    const checkViewport = () => updateVisibility(isHalfInViewport(video));
    if (observer) observer.observe(video);
    else {
      window.addEventListener('scroll', checkViewport, { passive: true });
      window.addEventListener('resize', checkViewport);
      checkViewport();
    }

    return () => {
      active = false;
      observer?.disconnect();
      window.removeEventListener('scroll', checkViewport);
      window.removeEventListener('resize', checkViewport);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('volumechange', onVolumeChange);
      registerVideo(item.id, null);
      if (!video.paused) video.pause();
    };
  }, [item.id, registerVideo, onAudiblePlayback]);

  return <video
    ref={videoRef}
    src={assetUrl(item.src)}
    poster={item.poster ? assetUrl(item.poster) : undefined}
    width={item.width}
    height={item.height}
    controls
    playsInline
    muted
    preload="none"
    aria-label={item.alt || item.title}
  >Your browser cannot play this video.</video>;
}

export default function GamesPage({ homeHref = './' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const menuButton = useRef(null);
  const videos = useRef(new Map());
  const visibleMedia = filter === 'all' ? galleryMedia : galleryMedia.filter((item) => item.type === filter);

  const registerVideo = useCallback((id, node) => {
    if (node) videos.current.set(id, node);
    else videos.current.delete(id);
  }, []);

  const onAudiblePlayback = useCallback((playingVideo) => {
    if (playingVideo.muted || playingVideo.volume === 0) return;
    videos.current.forEach((video) => {
      if (video !== playingVideo && !video.paused) video.pause();
    });
  }, []);

  const selectFilter = (nextFilter) => {
    if (nextFilter === filter) return;
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
            return <article className={`games-media-card${isVideo ? ' games-media-card-video' : ''}`} data-media-type={item.type} key={item.id} aria-label={item.title}>
              <figure className="games-media-figure">
                <div className="games-media-visual">
                  {isVideo ? <ViewportVideo item={item} registerVideo={registerVideo} onAudiblePlayback={onAudiblePlayback} /> : <img className="games-media-image" src={assetUrl(item.src)} width={item.width} height={item.height} alt={item.alt} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />}
                </div>
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
