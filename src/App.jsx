import { useEffect, useRef, useState } from 'react';
import { Anchor, ArrowUpRight, ArrowRight, ArrowLeft, ChevronDown, Plus, Minus, X, Menu, Music2, Footprints, Award, HeartHandshake, Compass, MapPin, CalendarDays, Clock, Ticket, Tent, Check } from 'lucide-react';
import { activities, events, faqs } from './data.js';
import Brand from './components/Brand.jsx';
import TwinPillars from './components/TwinPillars.jsx';

const REGISTER_URL = 'https://bb2pch.github.io/';
const BBM_URL = 'https://bbmalaysia.org/';
const INSTAGRAM_URL = 'https://www.instagram.com/bb2ndpuchong/reels/';
const activityIcons = { worship: Music2, drill: Footprints, badgework: Award, camp: Tent, fellowship: Compass, service: HeartHandshake };
const activityPages = { drill: 'drill.html', badgework: 'badgework.html' };

function Eyebrow({children, light = false}) {
  return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span />{children}</div>;
}

function PosterArt({type}) {
  if (type === 'thanksgiving') return <svg viewBox="0 0 300 320" className="poster-art" aria-hidden="true"><circle cx="150" cy="143" r="82" fill="none" stroke="currentColor" opacity=".2"/><path d="M150 57v105M112 94h76" stroke="currentColor" strokeWidth="5"/><path d="m73 222 39-31 38 20 38-20 39 31-77 36zM150 212v46" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="222" cy="168" r="23" fill="currentColor" opacity=".85"/><path d="m208 186-6 32 20-11 20 11-6-32" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m216 168 4 5 9-10" fill="none" stroke="#d7be78" strokeWidth="3"/><path d="M75 99h14m-7-7v14M228 89h12m-6-6v12" stroke="currentColor" opacity=".6"/></svg>;
  if (type === 'holiday') return <svg viewBox="0 0 300 320" className="poster-art" aria-hidden="true"><circle cx="150" cy="155" r="82" fill="none" stroke="currentColor" opacity=".2"/><path d="M183 77a77 77 0 1 0 41 127 69 69 0 0 1-41-127Z" fill="currentColor" opacity=".8"/><path d="M220 83v22m-11-11h22M76 74v14m-7-7h14M245 152v12m-6-6h12" stroke="currentColor" strokeWidth="2"/><path d="M76 261h148M101 275h98" stroke="currentColor" opacity=".3"/></svg>;
  return <svg viewBox="0 0 300 320" className="poster-art" aria-hidden="true"><circle cx="150" cy="157" r="84" fill="none" stroke="currentColor" opacity=".2"/><path d="M118 119c0-43 71-46 71-3 0 24-39 25-39 53v12" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/><circle cx="150" cy="207" r="5" fill="currentColor"/><path d="M70 78h16m-8-8v16M225 94h14m-7-7v14M235 228h12m-6-6v12M83 234h10m-5-5v10" stroke="currentColor" strokeWidth="2"/></svg>;
}

function Modal({item, onClose}) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    ref.current?.querySelector('button')?.focus();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if(e.key === 'Escape') onClose();
      if(e.key === 'Tab') {
        const nodes = ref.current?.querySelectorAll('a, button, [tabindex="0"]');
        const first = nodes?.[0], last = nodes?.[nodes.length-1];
        if(e.shiftKey && document.activeElement === first) {e.preventDefault();last?.focus();}
        else if(!e.shiftKey && document.activeElement === last) {e.preventDefault();first?.focus();}
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown',handleKey);previous?.focus(); };
  }, [onClose]);
  return <div className="modal-backdrop" onClick={onClose}>
    <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1} ref={ref} onClick={e=>e.stopPropagation()}>
      <button className="icon-button modal-close" onClick={onClose} aria-label="Close details"><X size={20}/></button>
      <Eyebrow>{item.category || item.eyebrow || 'LIFE IN THE BRIGADE'}</Eyebrow>
      <h2 id="modal-title">{item.name || item.title}</h2>
      <p>{item.description}</p>
      {item.paragraphs?.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
      {item.purpose && <><h3>Why it matters</h3><p>{item.purpose}</p></>}
      {item.learnings && <><h3>What you’ll discover</h3><ul className="learning-list">{item.learnings.map(text=><li key={text}><Check size={16}/>{text}</li>)}</ul></>}
      {item.date && <dl className="event-facts">
        <div><dt><CalendarDays size={17} aria-hidden="true"/>Date</dt><dd>{item.dateTime ? <time dateTime={item.dateTime}>{item.date}</time> : item.date}</dd></div>
        {item.time && <div><dt><Clock size={17} aria-hidden="true"/>Time</dt><dd>{item.time}</dd></div>}
        {item.fee && <div><dt><Ticket size={17} aria-hidden="true"/>Fee</dt><dd>{item.fee}</dd></div>}
        {item.location && <div><dt><MapPin size={17} aria-hidden="true"/>Venue</dt><dd>{item.location}</dd></div>}
      </dl>}
      {item.note && <p className="small-note">{item.note}</p>}
      <a className="button button-gold" href={item.actionUrl || REGISTER_URL} target="_blank" rel="noreferrer">{item.actionLabel || 'Join the adventure'}<ArrowUpRight size={17}/></a>
    </section>
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [detail, setDetail] = useState(null);
  const touchStart = useRef(0);
  const nextEvent = (direction) => setActiveEvent(current=>(current+direction+events.length)%events.length);
  const goTo = () => setMenuOpen(false);
  const closeDetail = () => setDetail(null);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" id="home">
      <div className="header-inner"><Brand />
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#about" onClick={goTo}>Our company</a><a href="#parade" onClick={goTo}>Life in the Brigade</a><a href="#events" onClick={goTo}>What’s on</a>
          <a className="mobile-join" href={REGISTER_URL} target="_blank" rel="noreferrer">Join us <ArrowUpRight size={14}/></a>
        </nav>
        <a className="header-join" href={REGISTER_URL} target="_blank" rel="noreferrer">Join the company <ArrowUpRight size={15}/></a>
        <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <a className="welcome-pill" href="#join"><span className="status-dot"/>A place for every boy & girl, aged 9–19<ArrowUpRight size={13}/></a>
          <h1 id="hero-title">Anchored in faith.<br/>Built for <span className="hero-life">life.<svg viewBox="0 0 170 13" aria-hidden="true"><path d="M3 10Q80-3 167 5"/></svg></span></h1>
          <p>Big adventures. Lifelong friendships. A purpose that stays with you.<br className="desktop-break"/> Find your people at 2nd Puchong Company.</p>
          <div className="hero-actions"><a className="button button-gold" href="#about">Discover our company <ArrowDownIcon/></a><a className="button button-outline" href={REGISTER_URL} target="_blank" rel="noreferrer">Join the adventure <ArrowUpRight size={17}/></a></div>
          <div className="hero-caption"><span className="tiny-anchor"><Anchor size={13}/></span> THE BOYS’ BRIGADE MALAYSIA <span className="caption-divider"/> 2ND PUCHONG COMPANY</div>
        </div>
        <div className="hero-visual" aria-label="A blue and gold anchor, a symbol of faith and steadfastness">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="visual-glow"/>
          <img className="anchor-art" src={`${import.meta.env.BASE_URL}images/anchor-hero.png`} alt="Royal blue and gold anchor with a rope, standing among misty mountains" fetchPriority="high"/>
          <TwinPillars />
          <div className="hero-bottom"><span>GROW TOGETHER. GO FURTHER.</span><a href="#about" aria-label="Scroll to our company"><ChevronDown size={19}/></a><span>SURE & STEDFAST <span className="gold-star">✦</span></span></div>
        </div>
      </section>

      <div className="values-strip" role="group" tabIndex={0} aria-label="Our values"><span>FRIENDSHIP</span><span className="strip-star">✦</span><span>DISCIPLINE</span><span className="strip-star">✦</span><span>CHRISTIAN FAITH</span><span className="strip-star">✦</span><span>ADVENTURE</span><span className="strip-star">✦</span><span>SERVICE</span><span className="strip-star">✦</span><span>LEADERSHIP</span></div>

      <section className="about-section section-shell" id="about" aria-labelledby="about-title">
        <div className="section-heading"><Eyebrow>MORE THAN A UNIFORM</Eyebrow><span className="section-index">01 / OUR COMPANY</span></div>
        <div className="about-layout"><div><h2 id="about-title">Small steps.<br/>Strong values.<br/><span className="muted-heading">A bigger future.</span></h2><a className="text-link" href={BBM_URL} target="_blank" rel="noreferrer">Meet the Boys’ Brigade Malaysia <ArrowUpRight size={17}/></a></div>
          <div className="about-copy"><p className="lead-copy">A place to belong.<br/>A chance to become.</p><p>The Boys’ Brigade is a Christian youth organisation where young people discover their potential through faith, teamwork and real-world adventures.</p><p>Here at <strong>2nd Puchong Company</strong>, we welcome <strong>boys and girls aged 9–19</strong>. Together, we learn new skills, grow in character and make a difference — one parade, one friendship and one act of service at a time.</p><div className="motto"><Anchor size={30}/><div>OUR MOTTO<span>Sure & Stedfast.</span></div></div></div>
        </div>
        <div className="history-block"><div className="history-label"><span className="history-number">1883<span>→ TODAY</span></span><span>A MOVEMENT WITH PURPOSE</span></div><div><h3>Part of a story bigger than ourselves.</h3><p>Founded by Sir William Alexander Smith in Glasgow in 1883, the Boys’ Brigade began with a simple vision: helping young people grow in faith and character. Today, 2nd Puchong carries that spirit forward in our own community.</p><a className="subtle-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Follow our company’s story <ArrowUpRight size={14}/></a></div></div>
      </section>

      <section className="parade-section" id="parade" aria-labelledby="parade-title"><div className="section-shell">
        <div className="section-heading"><Eyebrow>A LITTLE OF EVERYTHING. A LOT TO BECOME.</Eyebrow><span className="section-index">02 / PARADE LIFE</span></div>
        <div className="section-title-row"><h2 id="parade-title">Not your<br/>ordinary <span className="serif-word">weekend.</span></h2><p>Every parade is a new opportunity to learn,<br className="desktop-break"/> connect and grow. Here’s a little of what we do.</p></div>
        <div className="activities-grid">{activities.map((activity,index)=>{
          const Icon = activityIcons[activity.id] || Award;
          const linkedPage = activityPages[activity.id];
          const Card = linkedPage ? 'a' : 'button';
          return <Card className="activity-card" key={activity.id} {...(linkedPage ? {href: `${import.meta.env.BASE_URL}${linkedPage}`} : {onClick: ()=>setDetail(activity)})}>
            <div className="activity-top"><span className="activity-icon"><Icon size={24} strokeWidth={1.4}/></span><span className="activity-number">0{index+1}</span></div>
            <h3>{activity.name}</h3><p>{activity.shortDescription}</p>
            <span className="activity-bottom">{linkedPage ? `EXPLORE ${activity.name.toUpperCase()}` : 'A LITTLE MORE'} <ArrowUpRight size={17}/></span>
          </Card>;
        })}</div>
        <p className="parade-footnote"><span className="status-dot"/> Different activities. One journey of growth. <span>Parade arrangements are shared with members.</span></p>
      </div></section>

      <section className="events-section section-shell" id="events" aria-labelledby="events-title">
        <div className="section-heading"><Eyebrow>MAKE ROOM FOR SOMETHING MEMORABLE</Eyebrow><span className="section-index">03 / WHAT’S ON</span></div>
        <div className="events-heading"><h2 id="events-title">Good things<br/>are <span className="serif-word">ahead.</span></h2><p>More than dates on a calendar.<br/>Experiences that bring us together.</p></div>
        <div className="fan-carousel" role="region" aria-label="Upcoming experiences" aria-roledescription="carousel" onTouchStart={e=>{touchStart.current=e.touches[0].clientX;}} onTouchEnd={e=>{const delta=touchStart.current-e.changedTouches[0].clientX;if(Math.abs(delta)>45)nextEvent(delta>0?1:-1);}}>
          <div className="fan-stage">{events.map((event,index)=>{const offset = (index-activeEvent+events.length)%events.length; const position = offset === 0 ? 'center' : offset === 1 ? 'right' : 'left';return <button key={event.id} className={`event-card event-card-${index} position-${position}`} onClick={()=>position==='center'?setDetail(event):setActiveEvent(index)} aria-label={position==='center'?`View ${event.name} details`:`Show ${event.name}`} aria-current={position==='center'?'true':undefined}><div className="event-card-top"><span>{event.name}</span><ArrowUpRight size={19}/></div><PosterArt type={event.art}/><div className="event-card-copy"><span className="event-date"><span/>{event.dateLabel}</span><h3>{event.title}</h3><span className="event-card-detail">{event.tagline}</span></div></button>;})}</div>
          <div className="carousel-controls"><button className="icon-button" onClick={()=>nextEvent(-1)} aria-label="Previous event"><ArrowLeft size={20}/></button><div className="carousel-indicators">{events.map((e,i)=><button key={e.id} className={i===activeEvent?'active':''} onClick={()=>setActiveEvent(i)} aria-label={`Show ${e.name}`} aria-pressed={i===activeEvent}/>)}</div><button className="icon-button" onClick={()=>nextEvent(1)} aria-label="Next event"><ArrowRight size={20}/></button></div>
          <div className="carousel-status" aria-live="polite">{events[activeEvent].name} <span> / {String(activeEvent+1).padStart(2,'0')} OF {String(events.length).padStart(2,'0')}</span></div>
        </div>
        <div className="event-update-note"><CalendarDays size={16}/><p>Thanksgiving on 21 November. No parade in December; watch for our 2027 restart announcement.</p><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Stay in the loop<ArrowUpRight size={15}/></a></div>
      </section>

      <section className="join-section section-shell" id="join" aria-labelledby="join-title"><div className="join-panel"><div className="join-watermark"><Anchor strokeWidth={.65}/></div><div className="join-content"><Eyebrow light>YOUR NEXT CHAPTER STARTS HERE</Eyebrow><h2 id="join-title">There’s a place<br/>for <span className="serif-word">you</span> here.</h2><p>Boys and girls. Ages 9–19. One incredible journey.<br/>Come as you are. Discover who you can become.</p><a className="button button-gold" href={REGISTER_URL} target="_blank" rel="noreferrer">Registration & orders <ArrowUpRight size={18}/></a><span className="join-small">One step towards something meaningful.</span></div><div className="join-seal"><Anchor size={36} strokeWidth={1.3}/><span>SURE & STEDFAST</span><small>2ND PUCHONG</small></div></div></section>

      <section className="faq-section section-shell" id="faq" aria-labelledby="faq-title"><div className="faq-heading"><Eyebrow>A FEW THINGS TO KNOW</Eyebrow><h2 id="faq-title">Curious?<br/><span className="muted-heading">You’re in good<br className="desktop-break"/> company.</span></h2><p>Still have a question?</p><a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Say hello to our company <ArrowUpRight size={15}/></a></div><div className="faq-list">{faqs.map((faq,index)=><div className={`faq-item ${openFaq===index?'faq-open':''}`} key={faq.question}><h3><button onClick={()=>setOpenFaq(openFaq===index?null:index)} aria-expanded={openFaq===index} aria-controls={`faq-answer-${index}`}><span>{faq.question}</span><span className="faq-icon">{openFaq===index?<Minus size={16}/>:<Plus size={16}/>}</span></button></h3><div className="faq-answer" id={`faq-answer-${index}`} inert={openFaq!==index?true:undefined}><div><p>{faq.answer}</p>{index===0&&<a href={REGISTER_URL} target="_blank" rel="noreferrer">Start your journey <ArrowUpRight size={14}/></a>}</div></div></div>)}</div></section>
    </main>

    <footer className="site-footer"><div className="section-shell"><div className="footer-top"><div><Brand footer/><p>Building character. Growing faith.<br/>Making memories, together.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#about">Our company</a><a href="#parade">Parade life</a><a href="#events">What’s on</a></div><div><span>TAKE THE NEXT STEP</span><a href={REGISTER_URL} target="_blank" rel="noreferrer">Registration & orders <ArrowUpRight size={13}/></a><a href={BBM_URL} target="_blank" rel="noreferrer">BB Malaysia <ArrowUpRight size={13}/></a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Our Instagram <ArrowUpRight size={13}/></a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} 2ND PUCHONG COMPANY.</span><span>BOYS & GIRLS, AGED 9–19. ALL ARE WELCOME.</span><a href="#home">BACK TO TOP ↑</a></div></div><div className="footer-wordmark" aria-hidden="true">SURE & STEDFAST<span>✦</span></div></footer>
    {detail && <Modal item={detail} onClose={closeDetail}/>}
  </>;
}

function ArrowDownIcon() {return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6"/></svg>;}

export default App;
