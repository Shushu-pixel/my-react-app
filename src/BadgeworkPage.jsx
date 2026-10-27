import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Award, BookOpen, Check, Menu, Search, Sparkles, X } from 'lucide-react';
import Brand from './components/Brand.jsx';
import { badgeworkAwards, handbookUrl } from './badgeworkData.js';
import { badgeworkIcons } from './badgeworkIcons.js';

const REGISTER_URL = 'https://bb2pch.github.io/';
const categories = ['All awards', 'Compulsory', 'Electives'];

function BadgeEyebrow({ children }) {
  return <div className="badge-eyebrow"><span />{children}</div>;
}

function BadgeCoverIcon({ awardId }) {
  const Icon = badgeworkIcons[awardId] || Award;
  return <Icon size={34} strokeWidth={1.25} aria-hidden="true" />;
}

function AwardDetails({ award, onClose, backgroundRef }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const hasPhotos = award.photos?.length > 0;
  const firstPage = award.sourcePages?.[0];
  const sourceUrl = `${handbookUrl.split('#')[0]}${firstPage ? `#page=${firstPage}` : ''}`;

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const background = backgroundRef.current;
    const previousInert = background?.inert;
    document.body.style.overflow = 'hidden';
    if (background) background.inert = true;
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), a[href], [tabindex="0"]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const outside = !dialogRef.current.contains(document.activeElement);
      if (event.shiftKey && (document.activeElement === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (background) background.inert = previousInert;
      previousFocus?.focus();
    };
  }, [backgroundRef, onClose]);

  return <div className="badge-dialog-backdrop" onClick={onClose}>
    <section ref={dialogRef} className={`badge-dialog ${hasPhotos ? 'badge-dialog-with-photos' : 'badge-dialog-text-only'}`} role="dialog" aria-modal="true" aria-labelledby="badge-detail-title" aria-describedby="badge-detail-summary" onClick={(event) => event.stopPropagation()}>
      <div className="badge-dialog-bar"><span><BookOpen size={15} strokeWidth={1.5} />THE BADGEWORK JOURNAL<span className="badge-dialog-bar-divider">/</span>{award.category}</span><button ref={closeRef} className="badge-close" onClick={onClose} aria-label="Close award details"><X size={21} strokeWidth={1.5} /></button></div>
      <div className="badge-detail-layout">
        <div className="badge-detail-story">
          <div className="badge-detail-category"><Award size={16} strokeWidth={1.4} />{award.category} award</div>
          <h2 id="badge-detail-title">{award.name}<span>.</span></h2>
          <p className="badge-detail-summary" id="badge-detail-summary">{award.summary}</p>
          <div className="badge-story-section"><span className="badge-story-number">01</span><div><h3>What you can learn</h3><ul className="badge-learning-list">{award.learn.map((item) => <li key={item}><Check size={15} strokeWidth={1.6} /><span>{item}</span></li>)}</ul></div></div>
          <div className="badge-story-section"><span className="badge-story-number">02</span><div><h3>Inside a badgework class</h3><p className="badge-story-intro">A few ways learning can come to life.</p><ul className="badge-activity-list">{award.classActivities.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
          {award.levels.length > 0 && <div className="badge-story-section"><span className="badge-story-number">03</span><div><h3>Levels & progression</h3><div className="badge-levels">{award.levels.map((item) => <p key={item}>{item}</p>)}</div></div></div>}
          <div className="badge-detail-source"><span>FROM THE HANDBOOK</span><p>BBM Senior Section Handbook · November 2024<br />{award.sourcePages.length === 1 ? 'Page' : 'Pages'} {award.sourcePages.join(', ')}</p><a href={sourceUrl} target="_blank" rel="noreferrer">Read the official requirements <ArrowUpRight size={15} /></a></div>
        </div>
        {hasPhotos && <aside className="badge-detail-photos" aria-label={`${award.name} in our company`}><div className="badge-photos-heading"><span>LEARNING, TOGETHER.</span><span>2ND PUCHONG COMPANY</span></div>{award.photos.map((photo, index) => <figure className="badge-photo" key={photo.src}><img src={`${import.meta.env.BASE_URL}${photo.src}`} width={photo.width} height={photo.height} alt={photo.alt} decoding="async" loading={index === 0 ? 'eager' : 'lazy'} /><figcaption><span>{String(index + 1).padStart(2, '0')}</span><p>{photo.caption}</p></figcaption></figure>)}</aside>}
      </div>
    </section>
  </div>;
}

export default function BadgeworkPage({ homeHref = './' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All awards');
  const [selectedAward, setSelectedAward] = useState(null);
  const backgroundRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);
  const filteredAwards = useMemo(() => {
    const normalQuery = query.trim().toLocaleLowerCase();
    return badgeworkAwards.filter((award) => (category === 'All awards' || award.category === category) && (!normalQuery || `${award.name} ${award.summary} ${award.category} ${award.learn.join(' ')}`.toLocaleLowerCase().includes(normalQuery)));
  }, [query, category]);

  useEffect(() => {
    const onEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  return <>
    <div ref={backgroundRef} className="badge-site">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header" id="badge-top"><div className="header-inner"><Brand homeHref={homeHref} /><nav id="badge-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Badgework navigation"><a href="#overview" onClick={closeMenu}>Overview</a><a href="#awards" onClick={closeMenu}>Explore the awards</a><a href="#handbook" onClick={closeMenu}>The handbook</a><a className="mobile-join" href={REGISTER_URL} target="_blank" rel="noreferrer">Join us <ArrowUpRight size={14} /></a></nav><a className="header-join" href={REGISTER_URL} target="_blank" rel="noreferrer">Join the company <ArrowUpRight size={15} /></a><button className="menu-toggle icon-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="badge-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></header>

      <main id="main" className="badge-page">
        <section className="badge-hero section-shell" id="overview" aria-labelledby="badge-title">
          <a className="badge-back" href={`${homeHref}#parade`}><ArrowLeft size={15} />Back to parade life</a>
          <div className="badge-hero-layout"><div className="badge-hero-copy"><BadgeEyebrow>LIFE IN THE BRIGADE / BADGEWORK</BadgeEyebrow><h1 id="badge-title">Small badges.<br /><span>Big possibilities.</span></h1><p>Follow your curiosity. Find a new skill. Discover the confidence to put what you learn into practice.</p><a className="button button-gold" href="#awards">Explore the awards <ArrowDown size={17} /></a><div className="badge-welcome"><span />Boys and girls, aged 9–19. A place to grow.</div></div>
            <div className="badge-hero-books" aria-hidden="true"><div className="badge-decor-book badge-decor-book-back"><span>SKILLS FOR LIFE</span><Award size={50} strokeWidth={.8} /></div><div className="badge-decor-book badge-decor-book-front"><span className="badge-decor-book-top">THE BOYS’ BRIGADE MALAYSIA</span><BookOpen size={54} strokeWidth={.8} /><strong>A little<br />curiosity.<br /><em>A whole world<br />to discover.</em></strong><span className="badge-decor-book-bottom">THE BADGEWORK JOURNAL <span>✦</span></span></div><span className="badge-hero-books-label">TURN A PAGE. TRY SOMETHING NEW.</span></div>
          </div>
          <div className="badge-hero-foot"><span><Sparkles size={15} />Practical skills</span><span><Award size={15} />Personal growth</span><span><BookOpen size={15} />Learning with purpose</span></div>
        </section>

        <section className="badge-awards-section" id="awards" aria-labelledby="badge-awards-title"><div className="section-shell">
          <div className="badge-section-top"><BadgeEyebrow>EVERY AWARD OPENS A NEW DOOR</BadgeEyebrow><span className="badge-section-index">01 / EXPLORE BADGEWORK</span></div>
          <div className="badge-section-heading"><h2 id="badge-awards-title">Where will your<br /><span>curiosity take you?</span></h2><p>Explore all {badgeworkAwards.length} awards from the BBM Senior Section Handbook, pages 125–184. Turn a page to see what you can learn.</p></div>
          <div className="badge-library-controls"><div className="badge-filter-tabs" role="group" aria-label="Filter awards by category">{categories.map((item) => <button key={item} className={item === category ? 'badge-filter-active' : ''} onClick={() => setCategory(item)} aria-pressed={item === category}>{item}</button>)}</div><label className="badge-search"><Search size={17} strokeWidth={1.7} /><span className="badge-sr-only">Search badgework awards</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your next interest…" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}><X size={14} /></button>}</label></div>
          <div className="badge-library-status" aria-live="polite"><span>{filteredAwards.length} {filteredAwards.length === 1 ? 'award' : 'awards'} to explore</span><span>OPEN A COVER. DISCOVER MORE.</span></div>
          <div className="badge-awards-grid">{filteredAwards.map((award) => <button key={award.id} className={`badge-award-cover ${award.category === 'Compulsory' ? 'badge-cover-compulsory' : 'badge-cover-elective'}`} onClick={() => setSelectedAward(award)} aria-label={`Turn the page: ${award.name}`}><span className="badge-cover-top"><span>{award.category}</span><span>{String(badgeworkAwards.indexOf(award) + 1).padStart(2, '0')}</span></span><span className="badge-cover-mark"><BadgeCoverIcon awardId={award.id} /></span><span className="badge-cover-title">{award.name}</span><span className="badge-cover-summary">{award.summary}</span><span className="badge-cover-bottom">Turn the page <ArrowRight size={17} strokeWidth={1.3} /></span><span className="badge-paper-fold" aria-hidden="true" /></button>)}</div>
          {filteredAwards.length === 0 && <div className="badge-empty"><Search size={31} strokeWidth={1} /><h3>A new interest is waiting.</h3><p>No awards match this search. Try a different word or explore the full collection.</p><button className="button button-outline" onClick={() => { setQuery(''); setCategory('All awards'); }}>Show all awards <ArrowRight size={16} /></button></div>}
          <p className="badge-library-note">Class activities are handbook-based examples. Our officers confirm each course’s timetable, suitable level and official assessment requirements.</p>
        </div></section>

        <section className="badge-handbook section-shell" id="handbook" aria-labelledby="badge-handbook-title"><div className="badge-handbook-panel"><div className="badge-handbook-icon"><BookOpen size={39} strokeWidth={1} /></div><div className="badge-handbook-copy"><BadgeEyebrow>KEEP EXPLORING</BadgeEyebrow><h2 id="badge-handbook-title">A guide to the journey.</h2><p>This collection follows the awards in the Boys’ Brigade Malaysia Senior Section Handbook, November 2024 edition. Read the official handbook for the full syllabus and assessment requirements.</p><span>AWARDS REFERENCE · PAGES 125–184</span></div><a className="button button-outline" href={handbookUrl} target="_blank" rel="noreferrer">Open the handbook <ArrowUpRight size={17} /></a></div></section>
      </main>

      <footer className="site-footer badge-footer"><div className="section-shell"><div className="badge-footer-top"><div><Brand footer homeHref={homeHref} /><p>Building character. Growing faith.<br />A little more curious, together.</p></div><div className="badge-footer-links"><a href={`${homeHref}#parade`}><ArrowLeft size={15} />Back to parade life</a><a href={REGISTER_URL} target="_blank" rel="noreferrer">Registration & orders <ArrowUpRight size={15} /></a><a href="#awards">Explore the awards <ArrowRight size={15} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} 2ND PUCHONG COMPANY.</span><span>BOYS & GIRLS, AGED 9–19. ALL ARE WELCOME.</span><a href="#badge-top">BACK TO TOP ↑</a></div></div></footer>
    </div>
    {selectedAward && <AwardDetails award={selectedAward} onClose={() => setSelectedAward(null)} backgroundRef={backgroundRef} />}
  </>;
}
