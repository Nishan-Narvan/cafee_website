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
  processPour: '/media/process-pour.mp4',
  peopleVibing: '/media/people-vibing.mp4',
  montBlanc: '/media/brew-door-09.mp4',
  icedMocha: '/media/brew-door-13.mp4',
}

const locationUrl = 'https://l.instagram.com/?u=https%3A%2F%2Fmaps.app.goo.gl%2FR2wbMWMEQzP4GgTQ6%3Fg_st%3Dic%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAafK-d8FswoVE-mb2cFdLEnfXHw8bCHeoz2_jlnuxwD1yaWb3ZwW3WRkXfDqMw_aem_yuxLHAHSv6-sN5uzkWs0uw&e=AUAvWlLf7M0muz5r5NzPHulXRDhfwhKU0L_7pSpqf_w9Vd6aMB3CndAHezB3CcMPClgt5ENyXtx_QYDTpZYooR77BkjUIbhFS3mroRj8IsxLLR6iVa_xYz8FKTBuDM0TgXwb4m8'

const menuItems = [
  { number: '01', name: 'Mont Blanc', detail: 'Not your usual coffee.', media: media.montBlanc, type: 'video' },
  { number: '02', name: 'Iced Mocha Latte', detail: 'One sip, and you’ll know why.', media: media.icedMocha, type: 'video' },
  { number: '03', name: 'Good sips. Good food.', detail: 'Immaculate vibes.', media: media.peopleVibing, type: 'video' },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

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
        <a className="nav-cta" href="#visit">Come in <Arrow /></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-video"><Media src={media.pour} alt="Coffee being poured at The Brew Door" type="video" /></div>
        <div className="hero-overlay" />
        <motion.div className="hero-topline" {...reveal}><span className="hero-mark">Good coffee, good energy</span><span>Come in · stay awhile</span></motion.div>
        <motion.div className="hero-title" initial={{ opacity: 0, transform: reduceMotion ? 'none' : 'translateY(26px)' }} animate={{ opacity: 1, transform: 'translateY(0)' }} transition={{ duration: 0.9, delay: 0.25, ease: easing }}>
          <p className="eyebrow">Coffee · food · good company</p>
          <h1>The<br /><em>brew</em><br />door.</h1>
        </motion.div>
        <motion.div className="hero-bottom" {...reveal}><p>Come for the coffee.<br />Stay for the energy.</p><a className="round-link" href="#menu">↓<span>Explore</span></a><span className="hero-index">01 / 04</span></motion.div>
      </section>

      <section className="manifesto">
        <motion.p className="eyebrow" {...reveal}>A place to pause</motion.p>
        <motion.h2 {...reveal}>The slow way<br /><em>tastes better.</em></motion.h2>
        <motion.p className="manifesto-copy" {...reveal}>Good coffee has a way of making the ordinary feel like a little more. Take your time. We’ll keep the door open.</motion.p>
      </section>

      <section className="feature" id="menu">
        <div className="feature-label"><span>01</span><p>Signature pours</p></div>
        <div className="feature-media"><Media src={media.montBlanc} alt="Mont Blanc coffee at The Brew Door" type="video" /></div>
        <div className="feature-copy"><p className="eyebrow">Not your usual coffee</p><h2>Mont<br /><em>Blanc.</em></h2><p>For the curious ones. A signature sip from the door, made to be remembered.</p><a className="text-link" href="#crew">Meet the crew <Arrow /></a></div>
      </section>

      <section className="process-section">
        <motion.div className="process-intro" {...reveal}><p className="eyebrow">Behind every good cup</p><h2>The slow way<br /><em>tastes better.</em></h2><p>From the first pour to the final sip, good things take a little time.</p></motion.div>
        <div className="process-grid">
          <motion.figure className="process-card process-card-large" {...reveal}><Media src={media.processSlow} alt="The Brew Door coffee-making process" type="video" /><figcaption><span>01</span><strong>Take your time.</strong></figcaption></motion.figure>
          <motion.figure className="process-card process-card-small" {...reveal} transition={{ ...reveal.transition, delay: .12 }}><Media src={media.processPour} alt="A coffee being prepared at The Brew Door" type="video" /><figcaption><span>02</span><strong>Made with intention.</strong></figcaption></motion.figure>
        </div>
      </section>

      <section className="menu-section">
        <div className="section-heading"><div><p className="eyebrow">From behind the bar</p><h2>Good things<br /><em>inside.</em></h2></div><span className="section-count">03 / 03</span></div>
        <div className="menu-list">
          {menuItems.map((item, index) => (
            <motion.article className="menu-row" key={item.name} {...reveal} transition={{ ...reveal.transition, delay: index * 0.1 }}>
              <span>{item.number}</span><div className="menu-thumb"><Media src={item.media} alt={item.name} type={item.type} /></div><div className="menu-name"><h3>{item.name}</h3><p>{item.detail}</p></div><Arrow />
            </motion.article>
          ))}
        </div>
      </section>

      <section className="crew section-rule" id="crew">
        <div className="crew-heading"><p className="eyebrow">Introducing</p><h2>The crew’s<br /><em>energy.</em></h2><p>Zero chill about coffee,<br />endless chill about everything else.</p></div>
        <motion.a className="crew-intro" href="#crew-cards" {...reveal}><img src={media.crewIntro} alt="Meet the crew — Wolf, Bear and Tiger" /><span>Meet the crew <Arrow /></span></motion.a>
        <div className="crew-gallery" id="crew-cards">
          <article className="crew-card"><div className="crew-card-inner"><div className="crew-face"><Media src={media.wolf} alt="The Wolf crew illustration" /></div><div className="crew-person"><Media src={media.wolfPerson} alt="The Wolf crew member" /></div></div><h3>Wolf <span>01</span></h3></article>
          <article className="crew-card"><div className="crew-card-inner"><div className="crew-face"><Media src={media.tiger} alt="The Tiger crew illustration" /></div><div className="crew-person"><Media src={media.tigerPerson} alt="The Tiger crew member" /></div></div><h3>Tiger <span>02</span></h3></article>
          <article className="crew-card"><div className="crew-card-inner"><div className="crew-face"><Media src={media.bear} alt="The Bear crew illustration" /></div><div className="crew-person"><Media src={media.bearPerson} alt="The Bear crew member" /></div></div><h3>Bear <span>03</span></h3></article>
        </div>
        <div className="crew-names"><span>Wolf</span><i>·</i><span>Bear</span><i>·</i><span>Tiger</span></div>
      </section>

      <section className="people-section">
        <div className="people-copy"><p className="eyebrow">The feeling after the first sip</p><h2>Loved by<br /><em>good people.</em></h2><p>Come for the coffee. Stay for the people, the playlists, and the kind of energy you want to take home.</p></div>
        <div className="people-video"><Media src={media.peopleVibing} alt="People enjoying the atmosphere at The Brew Door" type="video" /><span>Good sips. Good food. Immaculate vibes.</span></div>
      </section>

      <section className="visit" id="visit">
        <div className="visit-copy"><p className="eyebrow">Find the door</p><h2>See you<br /><em>there.</em></h2><p>Good coffee is better in person. Follow the pin, bring your people, and come find your new favourite corner.</p><a className="button button-light" href={locationUrl} target="_blank" rel="noreferrer">Open in maps <Arrow /></a></div>
        <a className="map" href={locationUrl} target="_blank" rel="noreferrer" aria-label="Open The Brew Door location in Google Maps"><iframe title="The Brew Door location map" src="https://www.google.com/maps?q=The%20Brew%20Door&output=embed" loading="lazy" /><div className="map-shield"><span>Open<br />in maps ↗</span></div></a>
      </section>

      <footer><a className="brand-logo" href="#top"><img src={media.logo} alt="The Brew Door" /></a><p>Good sips. Good food. Immaculate vibes.</p><div><a href="#menu">Menu ↗</a><a href="#visit">Visit ↗</a></div><small>Come in · stay awhile</small></footer>
    </main>
  )
}

export default App
