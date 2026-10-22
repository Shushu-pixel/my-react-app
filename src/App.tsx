import { useState } from 'react'
import { ComponentExamples } from '@/components/component-examples'
import './App.css'

const resources = [
  { name: 'React', label: 'Build with components', description: 'Turn your ideas into interactive interfaces with React.', href: 'https://react.dev/learn', icon: '01' },
  { name: 'TypeScript', label: 'Create with confidence', description: 'Catch mistakes early with types that grow with your app.', href: 'https://www.typescriptlang.org/docs/', icon: '02' },
  { name: 'Vite', label: 'Keep your momentum', description: 'Enjoy fast feedback while you develop and build for production.', href: 'https://vite.dev/guide/', icon: '03' },
]

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Launchpad home"><span className="brand-mark" aria-hidden="true">✳</span> Launchpad</a>
        <a className="nav-link" href="#resources">Explore the toolkit <span aria-hidden="true">↗</span></a>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> A fresh start for your next idea</p>
            <h1 id="hero-title">Small beginnings.<br /><span>Endless possibilities.</span></h1>
            <p className="hero-description">A little structure, a lot of potential. Your new space to experiment, create, and build something that matters.</p>
            <a className="primary-link" href="#resources">Start exploring <span aria-hidden="true">↗</span></a>
            <p className="stack-note">Powered by React · TypeScript · Vite</p>
          </div>
          <div className="demo-card">
            <div className="card-heading"><span className="eyebrow">THE PLAYGROUND</span><span className="live-label">Live demo</span></div>
            <div className="orbit" aria-hidden="true"><span>✳</span></div>
            <h2>Make your first move.</h2>
            <p>Every great idea starts with a little interaction.</p>
            <button type="button" onClick={() => setCount((value) => value + 1)}>Give it a click <span aria-hidden="true">+</span></button>
            <p className="counter" role="status">{count} {count === 1 ? 'click' : 'clicks'} and counting</p>
          </div>
        </section>
        <section className="resources" id="resources" aria-labelledby="resources-title">
          <div className="section-heading"><h2 id="resources-title">Good tools. Great possibilities.</h2><p>Everything you need to find your flow.</p></div>
          <div className="resource-grid">{resources.map((resource) => (
            <a className="resource-card" href={resource.href} key={resource.name}>
              <div className="resource-top"><span>{resource.icon} / {resource.name}</span><span aria-hidden="true">↗</span></div>
              <h3>{resource.label}</h3><p>{resource.description}</p>
            </a>
          ))}</div>
        </section>
        <ComponentExamples />
      </main>
      <footer><span>Launchpad</span><span>Made for what comes next.</span></footer>
    </div>
  )
}

export default App
