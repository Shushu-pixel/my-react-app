import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, Instagram, Menu, X } from 'lucide-react';
import Brand from './components/Brand.jsx';
import { campStories } from './campStories.js';

const REGISTER_URL = 'https://bb2pch.github.io/';
const INSTAGRAM_URL = 'https://www.instagram.com/bb2ndpuchong/reels/';

function CampEyebrow({ children }) {
  return <div className="camp-eyebrow"><span />{children}</div>;
}

export default function CampPage({ homeHref = './' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const closeMenu = () => setMenuOpen(false);

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

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header camp-header" id="camp-top">
      <div className="header-inner">
        <Brand homeHref={homeHref} />
        <nav id="camp-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Camp navigation">
          <a href="#overview" onClick={closeMenu}>Overview</a>
          <a href="#stories" onClick={closeMenu}>Camp life</a>
          <a href="#join" onClick={closeMenu}>Join the adventure</a>
          <a className="mobile-join" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Registration & orders <ArrowUpRight size={14} aria-hidden="true" /></a>
        </nav>
        <a className="header-join" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Join the company <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button ref={menuButton} className="menu-toggle icon-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="camp-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>

    <main id="main" className="camp-page">
      <section className="camp-hero section-shell" id="overview" aria-labelledby="camp-title">
        <a className="camp-back" href={`${homeHref}#parade`}><ArrowLeft size={15} aria-hidden="true" />Back to parade life</a>
        <div className="camp-hero-content">
          <div className="camp-hero-heading">
            <CampEyebrow>LIFE IN THE BRIGADE / CAMP</CampEyebrow>
            <h1 id="camp-title">Camp Adventures</h1>
            <p className="camp-tagline">Learn, Explore & Grow!</p>
          </div>
          <div className="camp-hero-intro">
            <p>More than just a camp, it’s a place to discover new skills, take on challenges, make lasting friendships, and create unforgettable memories.</p>
            <a className="button button-gold" href="#stories">Explore camp life <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="camp-hero-footnote"><span>NEW SKILLS. SHARED CHALLENGES. LASTING FRIENDSHIPS.</span><span>{String(campStories.length).padStart(2, '0')} CAMP MOMENTS <ArrowDown size={13} aria-hidden="true" /></span></div>
      </section>

      <section className="camp-stories section-shell" id="stories" aria-label="Camp stories">
        {campStories.map((story, index) => <article className="camp-story" key={story.id} aria-labelledby={`camp-story-${story.id}`}>
          <div className="camp-story-copy">
            <span className="camp-story-number" aria-label={`Camp moment ${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span><span className="camp-story-number-rule" aria-hidden="true" /><span className="camp-story-number-label">CAMP LIFE</span></span>
            <h2 className="camp-story-title" id={`camp-story-${story.id}`}>{story.title}</h2>
            <p className="camp-story-description">{story.description}</p>
          </div>
          <figure className={`camp-story-photo${story.photo.width < story.photo.height ? ' camp-story-photo-portrait' : ''}`}>
            <img src={`${import.meta.env.BASE_URL}${story.photo.src}`} width={story.photo.width} height={story.photo.height} alt={story.photo.alt} loading="lazy" decoding="async" />
          </figure>
        </article>)}
      </section>

      <section className="camp-invitation section-shell" id="join" aria-labelledby="camp-invitation-title">
        <div className="camp-invitation-panel">
          <CampEyebrow>THERE’S MORE TO DISCOVER</CampEyebrow>
          <div className="camp-invitation-layout">
            <div className="camp-invitation-heading"><h2 id="camp-invitation-title">Your Next Adventure<br /><span>Starts Here!</span></h2><span className="camp-welcome">BOYS & GIRLS · AGES 9–19</span></div>
            <div className="camp-invitation-copy">
              <p>At The Boys’ Brigade, camp is more than just an outdoor experience. It’s where we learn to be independent, grow in confidence, develop leadership skills, discover new abilities, and build meaningful friendships.</p>
              <p>You don’t need to know everything before joining. Come with curiosity, a willingness to try, and a spirit of adventure!</p>
              <p className="camp-invitation-emphasis">Join us and be part of our next unforgettable camp adventure!</p>
              <div className="camp-invitation-actions"><a className="button button-gold" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Registration & orders <ArrowUpRight size={17} aria-hidden="true" /></a><a className="camp-social-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><Instagram size={16} aria-hidden="true" />Follow our adventures <ArrowUpRight size={14} aria-hidden="true" /></a></div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="site-footer camp-footer"><div className="section-shell">
      <div className="camp-footer-top"><div><Brand footer homeHref={homeHref} /><p>New adventures. Stronger friendships.<br />Growing together, every step of the way.</p></div><div className="camp-footer-links"><a href={homeHref}><ArrowLeft size={14} aria-hidden="true" />Back to our company</a><a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Registration & orders <ArrowUpRight size={14} aria-hidden="true" /></a><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Our Instagram <ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} 2ND PUCHONG COMPANY.</span><span>BOYS & GIRLS, AGED 9–19. ALL ARE WELCOME.</span><a href="#camp-top">BACK TO TOP ↑</a></div>
    </div></footer>
  </>;
}
