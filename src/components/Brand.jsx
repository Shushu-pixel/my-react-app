export default function Brand({ footer = false, homeHref = '#home' }) {
  return <a href={homeHref} className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="2nd Puchong Company home">
    <span className="brand-emblem"><img className="brand-logo" src={`${import.meta.env.BASE_URL}images/company-logo.png`} alt="2nd Puchong Company logo" width="58" height="58" loading={footer ? 'lazy' : 'eager'} decoding="async" /></span>
    <span className="brand-name">2ND PUCHONG<span>THE BOYS’ BRIGADE</span></span>
  </a>;
}
