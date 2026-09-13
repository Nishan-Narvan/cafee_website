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
  { name: 'Espresso', detail: 'Short, rich, and intensely aromatic.' },
  { name: 'Cappuccino', detail: 'Velvety milk, soft foam, and a deep finish.' },
  { name: 'Latte', detail: 'Smooth espresso with beautifully steamed milk.' },
  { name: 'Americano', detail: 'Espresso lengthened with hot water, clean and bright.' },
  { name: 'Mont Blanc', detail: 'A signature coffee with a little theatre.' },
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
    transition: { duration: 1.05, ease: easing },
  }

  const headingReveal = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-18% 0px' },
    transition: { duration: 1.3, ease: easing },
  }

  const dropReveal = {
    initial: { opacity: 0, transform: reduceMotion ? 'none' : 'translateY(-20px)' },
    whileInView: { opacity: 1, transform: 'translateY(0)' },
    viewport: { once: true, margin: '-12% 0px' },
    transition: { duration: 1.05, ease: easing },
  }

  const heroCtaReveal = {
    initial: { opacity: 0, transform: reduceMotion ? 'none' : 'translateY(10px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
    transition: { duration: reduceMotion ? 0.01 : 1.4, delay: reduceMotion ? 0 : 1, ease: easing },
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand-logo" href="#top" aria-label="The Brew Door home"><img src={media.logo} alt="The Brew Door" /></a>
        <a className="nav-cta" href="#visit"><svg className="nav-pin" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z" /><circle cx="12" cy="9" r="2.2" /></svg><span>Come in</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-video"><Media src={media.pour} alt="Coffee being poured at The Brew Door" type="video" /></div>
        <div className="hero-overlay" />
        <motion.div className="hero-title" initial={{ opacity: 0, transform: reduceMotion ? 'none' : 'translateY(26px)' }} animate={{ opacity: 1, transform: 'translateY(0)' }} transition={{ duration: 0.9, delay: 0.25, ease: easing }}>
          <h1>The<br /><em>brew</em><br />door.</h1>
          <p className="eyebrow">Great coffee. Immaculate vibes.</p>
        </motion.div>
        <motion.div className="hero-bottom" {...heroCtaReveal}><a className="round-link scroll-button" href="#menu"><span>See what’s brewing</span><span className="scroll-arrow" aria-hidden="true">↓</span></a></motion.div>
      </section>

      <section className="manifesto">
        <motion.p className="eyebrow" {...reveal}>A place to pause</motion.p>
        <motion.h2 {...headingReveal}>The slow way<br /><em>tastes better.</em></motion.h2>
        <motion.p className="manifesto-copy" {...reveal}>Good coffee has a way of making the ordinary feel like a little more. Take your time. We’ll keep the door open.</motion.p>
      </section>

      <section className="process-section">
        <motion.div className="process-intro" {...reveal}><p className="eyebrow">Behind every good cup</p><motion.h2 {...headingReveal}>Care in<br /><em>every pour.</em></motion.h2><p>There is beauty in the in-between: the measured grind, the quiet pour, the first warm sip. Good coffee is a small ritual, made slowly enough to feel.</p></motion.div>
        <div className="process-grid">
          <motion.figure className="process-card process-card-large" {...reveal}><Media src={media.processSlow} alt="The Brew Door coffee-making process" type="video" /></motion.figure>
          <motion.figure className="process-card process-card-small" {...reveal} transition={{ ...reveal.transition, delay: .12 }}><Media src={media.processPour} alt="Iced latte being prepared at The Brew Door" type="video" /></motion.figure>
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading"><div><p className="eyebrow">From behind the bar</p><h2>Good things<br /><em>inside.</em></h2></div></div>
        <div className="menu-list">
          {menuItems.map((item, index) => (
            <motion.article className="menu-row" key={item.name} {...reveal} transition={{ ...reveal.transition, delay: index * 0.1 }}>
            <div className="menu-name"><h3>{item.name}</h3><p>{item.detail}</p></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="feature">
        <div className="feature-media"><Media src={media.montBlanc} alt="Mont Blanc coffee at The Brew Door" type="video" /></div>
        <motion.div className="feature-copy" {...reveal}><p className="eyebrow">Our best</p><h2>Mont<br /><em>Blanc.</em></h2><p>A signature sip from the door, made to be remembered.</p><p className="feature-quote">“Coffee first. Everything else, slowly.”</p></motion.div>
      </section>

      <section className="crew section-rule" id="crew">
        <motion.div className="crew-heading" {...reveal}><p className="eyebrow">Introducing</p><h2>The crew’s<br /><em>energy.</em></h2></motion.div>
        <div className="crew-gallery" id="crew-cards">
          <motion.article className="crew-card" {...reveal}><div className="crew-card-inner"><div className="crew-face"><Media src={media.wolf} alt="The Wolf crew illustration" /></div><div className="crew-person"><Media src={media.wolfPerson} alt="The Wolf crew member" /></div></div><h3>Wolf</h3></motion.article>
          <motion.article className="crew-card" {...reveal} transition={{ ...reveal.transition, delay: .1 }}><div className="crew-card-inner"><div className="crew-face"><Media src={media.bear} alt="The Bear crew illustration" /></div><div className="crew-person"><Media src={media.bearPerson} alt="The Bear crew member" /></div></div><h3>Bear</h3></motion.article>
          <motion.article className="crew-card" {...reveal} transition={{ ...reveal.transition, delay: .2 }}><div className="crew-card-inner"><div className="crew-face"><Media src={media.tiger} alt="The Tiger crew illustration" /></div><div className="crew-person"><Media src={media.tigerPerson} alt="The Tiger crew member" /></div></div><h3>Tiger</h3></motion.article>
        </div>
      </section>

      <section className="people-section">
      <div className="people-copy"><motion.p className="eyebrow" {...dropReveal}>The feeling after the first sip</motion.p><motion.h2 {...dropReveal} transition={{ ...dropReveal.transition, delay: .1 }}>Made for<br /><em>good moments.</em></motion.h2><motion.p {...dropReveal} transition={{ ...dropReveal.transition, delay: .2 }}>Great coffee. Immaculate vibes.</motion.p></div>
      <motion.div className="people-video" {...reveal} transition={{ ...reveal.transition, delay: .12 }}><Media src={media.peopleVibing} alt="People enjoying the atmosphere at The Brew Door" type="video" /><p>Good energy, on repeat.</p></motion.div>
      </section>

      <section className="visit" id="visit">
        <div className="visit-copy"><p className="eyebrow">Find the door</p><h2>See you<br /><em>there.</em></h2><a className="button button-light loading-button" href={locationUrl} target="_blank" rel="noreferrer"><span>See you there</span><span className="button-arrow" aria-hidden="true">→</span></a></div>
        <a className="map" href={locationUrl} target="_blank" rel="noreferrer" aria-label="Open The Brew Door location in Google Maps"><iframe title="The Brew Door location map" src="https://www.google.com/maps?q=The%20Brew%20Door&output=embed" loading="lazy" /><div className="map-shield"><img src={media.logo} alt="" /><span>Open maps</span></div></a>
      </section>

      <motion.footer {...reveal}>
        <div className="footer-brand"><a className="brand-logo" href="#top"><img src={media.logo} alt="The Brew Door" /></a><p>Support your local caffeine dealer…</p></div>
        <div className="footer-links">
          <a className="footer-action" href="#menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg><span>Menu</span></a>
          <a className="footer-action" href={locationUrl} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z" /><circle cx="12" cy="9" r="2.2" /></svg><span>Find the door</span></a>
          <a className="footer-action" href="https://www.instagram.com/thebrewdoor/" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.7" r=".8" fill="currentColor" stroke="none" /></svg><span>Instagram</span></a>
          <a className="footer-action footer-action-phone" href="tel:7206350355"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5 9 3l2 5-2 1.7a15 15 0 0 0 5.3 5.3L16 13l5 2-.5 2.4A3 3 0 0 1 17.6 20C10.1 19.2 4.8 13.9 4 6.4A3 3 0 0 1 6.6 3.5Z" /></svg><span>Phone / WhatsApp</span><small className="footer-phone-number">7206350355</small></a>
        </div>
        <small>© The Brew Door</small>
      </motion.footer>
    </main>
  )
}

export default App
