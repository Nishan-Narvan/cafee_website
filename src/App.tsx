import { motion, useReducedMotion } from 'motion/react'

const media = {
  logo: '/media/logo.jpg',
  pour: '/media/brew-door-01.mp4',
  crewIntro: '/media/crew-intro.jpg',
  wolf: '/media/wolf-character.jpg',
  bear: '/media/bear-character.jpg',
  tiger: '/media/tiger-character.jpg',
  wolfPerson: '/media/wolf-person.jpg',
  bearPerson: '/media/bear-person.jpg',
  tigerPerson: '/media/tiger-person.jpg',
  processSlow: '/media/process-slow.mp4',
  processPour: '/media/iced-latte.mp4',
  peopleVibing: '/media/people-vibing.mp4',
  montBlanc: '/media/brew-door-09.mp4',
  icedMocha: '/media/brew-door-13.mp4',
}

const locationUrl = 'https://l.instagram.com/?u=https%3A%2F%2Fmaps.app.goo.gl%2FR2wbMWMEQzP4GgTQ6%3Fg_st%3Dic%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAafK-d8FswoVE-mb2cFdLEnfXHw8bCHeoz2_jlnuxwD1yaWb3ZwW3WRkXfDqMw_aem_yuxLHAHSv6-sN5uzkWs0uw&e=AUAvWlLf7M0muz5r5NzPHulXRDhfwhKU0L_7pSpqf_w9Vd6aMB3CndAHezB3CcMPClgt5ENyXtx_QYDTpZYooR77BkjUIbhFS3mroRj8IsxLLR6iVa_xYz8FKTBuDM0TgXwb4m8'

const menuItems = [
  { name: 'Mont Blanc', detail: 'A signature coffee with a little theatre.' },
  { name: 'Iced Latte', detail: 'Cold, smooth, and made for slow afternoons.' },
  { name: 'Cortado', detail: 'Short, balanced, and quietly intense.' },
  { name: 'House Toast', detail: 'Golden sourdough, seasonal toppings.' },
  { name: 'Something Sweet', detail: 'A small finish for a very good day.' },
]

function Media({ src, alt, type = 'image', className = '' }: { src: string; alt: string; type?: string; className?: string }) {
  if (type === 'video') {
    return <video className={className} src={src} autoPlay muted loop playsInline preload="metadata" aria-label={alt} />
  }
  return <img className={className} src={src} alt={alt} loading="lazy" />
}

function App() {
  const reduceMotion = useReducedMotion()
  const easing = [0.23, 1, 0.32, 1] as const

  const reveal = {
    initial: { opacity: 0, transform: reduceMotion ? 'none' : 'translateY(20px)' },
    whileInView: { opacity: 1, transform: 'translateY(0)' },
    viewport: { once: true, margin: '-12% 0px' },
    transition: { duration: 0.7, ease: easing },
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand-logo" href="#top" aria-label="The Brew Door home"><img src={media.logo} alt="The Brew Door" /></a>
        <a className="nav-cta" href="#visit">Come in</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-video"><Media src={media.pour} alt="Coffee being poured at The Brew Door" type="video" /></div>
        <div className="hero-overlay" />
        <motion.div className="hero-title" initial={{ opacity: 0, transform: reduceMotion ? 'none' : 'translateY(26px)' }} animate={{ opacity: 1, transform: 'translateY(0)' }} transition={{ duration: 0.9, delay: 0.25, ease: easing }}>
          <h1>The<br /><em>brew</em><br />door.</h1>
          <p className="eyebrow">Great coffee. Immaculate vibes.</p>
        </motion.div>
        <motion.div className="hero-bottom" {...reveal}><a className="round-link scroll-button" href="#menu">See what’s brewing</a></motion.div>
      </section>

      <section className="manifesto">
        <motion.p className="eyebrow" {...reveal}>A place to pause</motion.p>
        <motion.h2 {...reveal}>The slow way<br /><em>tastes better.</em></motion.h2>
        <motion.p className="manifesto-copy" {...reveal}>Good coffee has a way of making the ordinary feel like a little more. Take your time. We’ll keep the door open.</motion.p>
      </section>

      <section className="feature" id="menu">
        <div className="feature-media"><Media src={media.montBlanc} alt="Mont Blanc coffee at The Brew Door" type="video" /></div>
        <div className="feature-copy"><p className="eyebrow">Our best</p><h2>Mont<br /><em>Blanc.</em></h2><p>A signature sip from the door, made to be remembered.</p><a className="text-link coffee-link" href="#crew">Meet the crew</a></div>
      </section>

      <section className="process-section">
        <motion.div className="process-intro" {...reveal}><p className="eyebrow">Behind every good cup</p><h2>Care in<br /><em>every pour.</em></h2><p>There is beauty in the in-between: the measured grind, the quiet pour, the first warm sip. Good coffee is a small ritual, made slowly enough to feel.</p></motion.div>
        <div className="process-grid">
          <motion.figure className="process-card process-card-large" {...reveal}><Media src={media.processSlow} alt="The Brew Door coffee-making process" type="video" /></motion.figure>
          <motion.figure className="process-card process-card-small" {...reveal} transition={{ ...reveal.transition, delay: .12 }}><Media src={media.processPour} alt="Iced latte being prepared at The Brew Door" type="video" /></motion.figure>
        </div>
      </section>

      <section className="menu-section">
        <div className="section-heading"><div><p className="eyebrow">From behind the bar</p><h2>Good things<br /><em>inside.</em></h2><div className="menu-vibe"><Media src={media.peopleVibing} alt="People enjoying The Brew Door" type="video" /></div></div></div>
        <div className="menu-list">
          {menuItems.map((item, index) => (
            <motion.article className="menu-row" key={item.name} {...reveal} transition={{ ...reveal.transition, delay: index * 0.1 }}>
            <div className="menu-name"><h3>{item.name}</h3><p>{item.detail}</p></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="crew section-rule" id="crew">
        <div className="crew-heading"><p className="eyebrow">Introducing</p><h2>The crew’s<br /><em>energy.</em></h2><p>Zero chill about coffee,<br />endless chill about everything else.</p></div>
        <div className="crew-gallery" id="crew-cards">
          <article className="crew-card"><div className="crew-card-inner"><div className="crew-face"><Media src={media.wolf} alt="The Wolf crew illustration" /></div><div className="crew-person"><Media src={media.wolfPerson} alt="The Wolf crew member" /></div></div><h3>Wolf</h3></article>
          <article className="crew-card"><div className="crew-card-inner"><div className="crew-face"><Media src={media.bear} alt="The Bear crew illustration" /></div><div className="crew-person"><Media src={media.bearPerson} alt="The Bear crew member" /></div></div><h3>Bear</h3></article>
          <article className="crew-card"><div className="crew-card-inner"><div className="crew-face"><Media src={media.tiger} alt="The Tiger crew illustration" /></div><div className="crew-person"><Media src={media.tigerPerson} alt="The Tiger crew member" /></div></div><h3>Tiger</h3></article>
        </div>
      </section>

      <section className="people-section">
        <div className="people-copy"><p className="eyebrow">The feeling after the first sip</p><h2>Loved by<br /><em>good people.</em></h2><p>Great coffee. Immaculate vibes.</p></div>
        <div className="people-video"><Media src={media.peopleVibing} alt="People enjoying the atmosphere at The Brew Door" type="video" /><p>Good energy, on repeat.</p></div>
      </section>

      <section className="visit" id="visit">
        <div className="visit-copy"><p className="eyebrow">Find the door</p><h2>See you<br /><em>there.</em></h2><p>Good coffee is better in person.</p><a className="button button-light loading-button" href={locationUrl} target="_blank" rel="noreferrer">See you there</a></div>
        <a className="map" href={locationUrl} target="_blank" rel="noreferrer" aria-label="Open The Brew Door location in Google Maps"><iframe title="The Brew Door location map" src="https://www.google.com/maps?q=The%20Brew%20Door&output=embed" loading="lazy" /><div className="map-shield"><img src={media.logo} alt="" /><span>Open maps</span></div></a>
      </section>

      <footer><a className="brand-logo" href="#top"><img src={media.logo} alt="The Brew Door" /></a><div className="footer-column"><h4>Menu</h4><a href="#menu">What’s brewing</a><a href="#menu">Our best</a></div><div className="footer-column"><h4>Location</h4><a href={locationUrl} target="_blank" rel="noreferrer">Find the door</a><a href="#visit">Open map</a></div><div className="footer-column"><h4>Instagram</h4><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">@thebrewdoor</a><a href="#crew">Meet the crew</a></div><small>© The Brew Door</small></footer>
    </main>
  )
}

export default App
