import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check,
  Footprints, Menu, ShieldCheck, Sparkles, Users, X,
} from 'lucide-react';
import Brand from './components/Brand.jsx';
import { drillPhotos } from './drillPhotos.js';

const REGISTER_URL = 'https://bb2pch.github.io/';

const lessons = [
  {
    title: 'Discipline & teamwork',
    icon: Users,
    description: 'Boys’ Brigade drill teaches members discipline, teamwork, and obedience by following commands correctly.',
    detail: 'We learn to listen, trust one another, and work towards a shared goal.',
  },
  {
    title: 'Posture & presentation',
    icon: Sparkles,
    description: 'Drill helps members develop good posture and maintain a smart and neat appearance.',
    detail: 'Care in the little things builds pride in how we carry ourselves.',
  },
  {
    title: 'Attention & at ease',
    icon: Footprints,
    description: 'Members learn to stand at attention and stand at ease according to the commands given by the officer.',
    detail: 'Each movement begins with focus and a willingness to learn.',
  },
  {
    title: 'Focus & response',
    icon: ShieldCheck,
    description: 'Members learn to respond quickly and correctly to commands given by the drill instructor.',
    detail: 'Practice helps us become more alert, confident, and coordinated.',
  },
  {
    title: 'The confidence to lead',
    icon: Users,
    description: 'Drill helps develop leadership skills by allowing experienced members to lead and give commands.',
    detail: 'As we grow, we learn to guide others with clarity, responsibility, and encouragement.',
  },
];

function DrillEyebrow({ children }) {
  return <div className="drill-eyebrow"><span />{children}</div>;
}

export default function DrillPage({ homeHref = './' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" id="drill-top">
      <div className="header-inner">
        <Brand homeHref={homeHref} />
        <nav id="drill-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Drill navigation">
          <a href="#overview" onClick={closeMenu}>Overview</a>
          <a href="#learning" onClick={closeMenu}>What we learn</a>
          <a href="#media" onClick={closeMenu}>Drill photos</a>
          <a className="mobile-join" href={REGISTER_URL} target="_blank" rel="noreferrer">Join us <ArrowUpRight size={14} /></a>
        </nav>
        <a className="header-join" href={REGISTER_URL} target="_blank" rel="noreferrer">Join the company <ArrowUpRight size={15} /></a>
        <button className="menu-toggle icon-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="drill-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>

    <main id="main" className="drill-page">
      <section id="overview" className="drill-hero section-shell" aria-labelledby="drill-title">
        <a className="drill-back" href={`${homeHref}#parade`}><ArrowLeft size={15} />Back to parade life</a>
        <div className="drill-hero-layout">
          <div className="drill-hero-copy">
            <DrillEyebrow>LIFE IN THE BRIGADE / DRILL</DrillEyebrow>
            <h1 id="drill-title">Every step.<br /><span>One team.</span></h1>
            <p>More than marching. Drill builds discipline, teamwork, and the confidence to move forward together.</p>
            <div className="drill-hero-actions">
              <a className="button button-gold" href="#learning">What we learn <ArrowDown size={17} /></a>
              <a className="button button-outline" href="#media">See drill photos <ArrowRight size={17} /></a>
            </div>
          </div>
          <div className="drill-formation" aria-hidden="true">
            <div className="drill-formation-caption"><span>INDIVIDUAL EFFORT.</span><span>SHARED PURPOSE.</span></div>
            <div className="drill-formation-grid">
              {Array.from({ length: 9 }, (_, index) => <span className={index === 4 ? 'drill-formation-person drill-formation-center' : 'drill-formation-person'} key={index}><Footprints size={28} strokeWidth={1.3} /></span>)}
            </div>
            <span className="drill-formation-rule" />
            <p>In step.<br /><span>In spirit.</span></p>
            <span className="drill-formation-footnote">SURE & STEDFAST · 2ND PUCHONG</span>
          </div>
        </div>
        <div className="drill-principles" aria-label="Drill values">
          <span><Check size={15} />Listen with purpose</span>
          <span><Check size={15} />Move with confidence</span>
          <span><Check size={15} />Grow as a team</span>
        </div>
      </section>

      <section id="learning" className="drill-learning" aria-labelledby="drill-learning-title">
        <div className="section-shell">
          <div className="drill-section-top"><DrillEyebrow>SMALL MOVEMENTS. LASTING LESSONS.</DrillEyebrow><span className="drill-section-index">01 / WHAT WE LEARN</span></div>
          <div className="drill-section-intro"><h2 id="drill-learning-title">Skills for parade.<br /><span>Values for life.</span></h2><p>Every command is a chance to practise focus.<br />Every formation is a lesson in working together.</p></div>
          <div className="drill-lessons">
            {lessons.map((lesson, index) => {
              const Icon = lesson.icon;
              return <article className="drill-lesson" key={lesson.title}>
                <div className="drill-lesson-top"><span className="drill-lesson-icon"><Icon size={25} strokeWidth={1.4} /></span><span className="drill-lesson-number">0{index + 1}</span></div>
                <div className="drill-lesson-copy"><h3>{lesson.title}</h3><p>{lesson.description}</p><span className="drill-lesson-detail">{lesson.detail}</span></div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="media" className="drill-media section-shell" aria-labelledby="drill-media-title">
        <div className="drill-section-top"><DrillEyebrow>OUR COMPANY IN ACTION</DrillEyebrow><span className="drill-section-index">02 / DRILL PHOTOS</span></div>
        <div className="drill-media-heading"><div><h2 id="drill-media-title">See us <span>in step.</span></h2><p>Discipline, teamwork and confidence, one parade at a time.<br />A few moments from drill with our company.</p></div></div>
        <div className="drill-photo-gallery">
          {drillPhotos.map((photo, index) => <figure className="drill-photo" key={photo.filename}>
            <img className="drill-photo-image" src={`${import.meta.env.BASE_URL}images/drill/${photo.filename}`} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" />
            <figcaption className="drill-photo-caption"><span className="drill-photo-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{photo.title}</h3><p>{photo.caption}</p></div></figcaption>
          </figure>)}
        </div>
      </section>

      <section className="drill-invitation section-shell" aria-labelledby="drill-invitation-title"><div className="drill-invitation-panel"><div><DrillEyebrow>TAKE YOUR FIRST STEP</DrillEyebrow><h2 id="drill-invitation-title">There’s a place<br />in the team <span>for you.</span></h2><p>Boys and girls aged 9–19. No experience needed.<br />Come ready to learn. We’ll grow together.</p></div><a className="button button-gold" href={REGISTER_URL} target="_blank" rel="noreferrer">Registration & orders <ArrowUpRight size={18} /></a></div></section>
    </main>

    <footer className="site-footer drill-footer"><div className="section-shell"><div className="drill-footer-top"><div><Brand footer homeHref={homeHref} /><p>Building character. Growing faith.<br />Moving forward, together.</p></div><div className="drill-footer-links"><a href={homeHref}><ArrowLeft size={15} />Back to our company</a><a href={REGISTER_URL} target="_blank" rel="noreferrer">Registration & orders <ArrowUpRight size={15} /></a><a href="#media">Drill photos <ArrowRight size={15} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} 2ND PUCHONG COMPANY.</span><span>BOYS & GIRLS, AGED 9–19. ALL ARE WELCOME.</span><a href="#drill-top">BACK TO TOP ↑</a></div></div></footer>
  </>;
}
