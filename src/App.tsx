import { useRef, useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

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

const locationUrl = 'https://maps.app.goo.gl/ntxJLATtQRqstnyU7'

type MenuItem = { name: string; detail?: string; price?: string; prices?: string[] }
type MenuCategory = { name: string; note?: string; groups?: { name: string; items: MenuItem[] }[]; items?: MenuItem[] }

const menuCategories: MenuCategory[] = [
  { name: 'Sandos', groups: [
    { name: 'Veg', items: [
      { name: 'The Mezze Melt', detail: 'Falafel, hummus, roasted zucchini, peppers, pickled veggies and paprika on toasted sourdough.', price: '₹299/-' },
      { name: 'The Rustic Forager', detail: 'Peri-peri oyster mushrooms, sriracha mayo and creamy ranch on pillowy milk bread.', price: '₹309/-' },
      { name: 'The Classic Caprese', detail: 'Bocconcini, marinated tomatoes, pesto and balsamic drizzle on toasted sourdough.', price: '₹329/-' },
      { name: 'The 420', detail: 'BBQ cottage cheese, lettuce, ranch, pickled onions and jalapeños on soft milk bread.', price: '₹329/-' },
      { name: 'Thecha Riot 🌶️🌶️🌶️', detail: 'Fiery thecha cream, mozzarella and cheddar in soft toasted milk bread.', price: '₹349/-' },
    ] },
    { name: 'Non-Veg', items: [
      { name: 'Crispy Caesar', detail: 'Crispy fried chicken, mustard-infused Caesar dressing and crunchy lettuce on milk bread.', price: '₹319/-' },
      { name: 'Pepper on the Bright Side', detail: 'Lemon-pepper grilled chicken, cucumber-onion salad and ranch on toasted sourdough.', price: '₹349/-' },
      { name: 'Southern Flame', detail: 'Nashville fried chicken, ranch, cucumber pickles and jalapeños on milk bread.', price: '₹359/-' },
      { name: 'Fiery Thecha 🌶️🌶️🌶️', detail: 'Grilled chicken, fiery thecha cream, mozzarella and cheddar on toasted sourdough.', price: '₹369/-' },
      { name: 'Seoul Crust', detail: 'Korean fried chicken, sriracha mayo, jalapeños and ranch on soft milk bread.', price: '₹399/-' },
    ] },
  ] },
  { name: 'Side Bites', groups: [
    { name: 'Veg', items: [{ name: 'Peri Peri Sweet Potato Chips', price: '₹199/-' }, { name: 'Creamy Mushroom Green Chilli Crostinis', price: '₹199/-' }, { name: 'Jalapeño & Red Paprika Poppers', price: '₹249/-' }] },
    { name: 'Non-Veg', items: [{ name: 'Creamy Chicken - Green Chilli Crostinis', price: '₹229/-' }, { name: 'Chicken Popcorn - Peri Peri', price: '₹259/-' }, { name: 'Truffle Parmesan', price: '₹299/-' }, { name: 'Chicken Yakitori', price: '₹299/-' }] },
    { name: 'Dips', items: [{ name: 'Chilli Parsley Dip', price: '₹49/-' }, { name: 'Cheesy Dip', price: '₹49/-' }] },
  ] },
  { name: 'Baos', note: 'Soft, pillowy bao loaded with your choice of mushroom or chicken.', items: [
    { name: 'Honey Glazed', detail: 'Tossed in a sticky honey glaze.', prices: ['₹309/-', '₹359/-'] },
    { name: 'Chilli Basil', detail: 'Mushroom or chicken in a punchy chilli-basil sauce.', prices: ['₹329/-', '₹369/-'] },
  ] },
  { name: 'Open Toasts', items: [
    { name: 'Holy Guac', detail: 'Creamy guac, tangy salsa, feta, basil and cherry tomato.', price: '₹249/-' },
    { name: 'Toast Malone', detail: 'Guacamole, cheesy avocado cream, pickled cucumber, carrots and red paprika.', price: '₹259/-' },
    { name: 'Pesto Manifesto', detail: 'Pesto, earthy mushrooms, caramelised onions and fresh microgreens.', price: '₹269/-' },
    { name: 'Add-on: Scrambled Eggs', detail: 'Price to confirm.', price: '₹50/-' },
  ] },
  { name: 'Desserts', items: [{ name: 'TBD Classic Cookie', price: '₹109/-' }, { name: 'Butter Chocolate Chip Cake', price: '₹159/-' }, { name: 'Tiramisu', price: '₹209/-' }, { name: 'Classic Affogato', price: '₹219/-' }, { name: 'Nutella Hazelnut Affogato', price: '₹259/-' }] },
  { name: 'Classics', note: 'Hot coffee and cold coffee favourites. Spanish Latte (Iced) pricing should be confirmed.', groups: [
    { name: 'Hot', items: [{ name: 'Espresso', price: '₹159/-' }, { name: 'Macchiato', price: '₹149/-' }, { name: 'Americano', price: '₹159/-' }, { name: 'Cortado', price: '₹169/-' }, { name: 'Latte', price: '₹209/-' }, { name: 'Cappuccino', price: '₹189/-' }, { name: 'Flat White', price: '₹219/-' }, { name: 'Mocha', price: '₹189/-' }, { name: 'Hot Chocolate', price: '₹209/-' }, { name: 'Spanish Latte', price: '₹209/-' }] },
    { name: 'Cold', items: [{ name: 'Iced Espresso', prices: ['₹149/-', '—'] }, { name: 'Long Black', prices: ['₹159/-', '₹209/-'] }, { name: 'Iced Cappuccino', prices: ['₹199/-', '₹249/-'] }, { name: 'Sunrise Americano', prices: ['₹199/-', '₹249/-'] }, { name: 'Iced Latte', prices: ['₹209/-', '₹259/-'] }, { name: 'Iced Mocha', prices: ['₹219/-', '₹259/-'] }, { name: 'Iced Chocolate', prices: ['₹219/-', '—'] }, { name: 'Espresso Tonic', prices: ['₹239/-', '₹289/-'] }, { name: 'Cold Coffee', prices: ['₹239/-', '₹289/-'] }, { name: 'Spanish Latte (Iced)', prices: ['₹259/-', '₹289/-'] }] },
    { name: 'Add-ons', items: [{ name: 'Whipped Cream', price: '₹55/-' }, { name: 'Hazelnut', price: '₹65/-' }, { name: 'Vanilla', price: '₹65/-' }, { name: 'Caramel', price: '₹65/-' }, { name: 'Espresso Shot', price: '₹65/-' }] },
    { name: 'Milk Options', items: [{ name: 'Almond', price: '₹89/-' }, { name: 'Oats', price: '₹89/-' }, { name: 'Lactose Free', price: '₹89/-' }] },
  ] },
  { name: 'TBD Signatures', items: [
    { name: 'New York Latte', detail: 'Brown butter concoction paired with double-shot espresso.', price: '₹289/-' },
    { name: 'Fridge Cigg', detail: 'Diet Coke spiked with espresso and light vanilla cold foam.', price: '₹299/-' },
    { name: 'Caramel Silk', detail: 'Cold brew layered with caramel-vanilla cloud foam.', price: '₹309/-' },
    { name: 'The Mont Blanc', detail: 'Slow-steeped cold brew with vanilla cold foam and fresh orange.', price: '₹319/-' },
    { name: 'Coconut Cloud Espresso', detail: 'Espresso balanced on fresh coconut water.', price: '₹319/-' },
  ] },
  { name: 'Matcha', items: [{ name: 'Matcha Latte', price: '₹269/-' }, { name: 'Matcha Latte (Iced)', price: '₹279/-' }, { name: 'Strawberry Matcha', price: '₹309/-' }, { name: 'Coconut Cloud Matcha', price: '₹339/-' }] },
  { name: 'Manual Brews', items: [{ name: 'French Press', price: '₹209/-' }, { name: 'AeroPress', price: '₹209/-' }, { name: 'Pourover', price: '₹209/-' }, { name: 'Cold Brew', price: '₹199/-' }, { name: 'Iced Pourover', price: '₹219/-' }, { name: 'Vietnamese Style Brew', price: '₹239/-' }] },
  { name: 'Mocktails', items: [{ name: 'Ocean Escape', detail: 'Curaçao, fresh lime and light sweetness for a mint escape.', price: '₹199/-' }, { name: 'Elderberry Bloom', detail: 'Tart raspberry and floral elderflower.', price: '₹199/-' }, { name: 'Jamun Jolt', detail: 'A tangy, chatpata jamun mocktail.', price: '₹199/-' }, { name: 'Mother Mary', detail: 'Virgin mojito with mint and basil.', price: '₹199/-' }, { name: 'Mango Tango', detail: 'Mango and mint blended together.', price: '₹199/-' }, { name: 'Summer Strike', detail: 'Watermelon and cool mint.', price: '₹229/-' }] },
  { name: 'Shakes', items: [{ name: 'French Vanilla', price: '₹199/-' }, { name: 'Salted Caramel', price: '₹219/-' }, { name: 'Cookies & Cream', price: '₹269/-' }, { name: 'Lotus Biscoff', price: '₹279/-' }, { name: 'Nutella Hazelnut', price: '₹299/-' }] },
  { name: 'Smoothies', items: [{ name: 'Captain Peanut', detail: 'Peanut butter, oats, banana and cinnamon.', price: '₹309/-' }, { name: 'Coco de pina', detail: 'Banana, pineapple, coconut and honey.', price: '₹319/-' }, { name: 'Silk Route', detail: 'Avocado and agave smoothie.', price: '₹349/-' }, { name: 'Blueberry Cheesecake', detail: 'A berry dessert-inspired smoothie.', price: '₹399/-' }] },
  { name: 'Teas', groups: [{ name: 'Hot', items: [{ name: 'Black Tea', price: '₹109/-' }, { name: 'Blue Pea Tea', price: '₹149/-' }, { name: 'Hibiscus Tea', price: '₹149/-' }] }, { name: 'Iced', items: [{ name: 'Lemon Iced Tea', price: '₹159/-' }, { name: 'Peach Iced Tea', price: '₹179/-' }, { name: 'Hibiscus Iced Tea', price: '₹179/-' }, { name: 'Blue Pea Iced Tea', price: '₹189/-' }] }] },
]

const menuCategoryOrder = ['TBD Signatures', 'Sandos', 'Baos', 'Open Toasts', 'Side Bites', 'Desserts', 'Classics', 'Manual Brews', 'Matcha', 'Teas', 'Mocktails', 'Shakes', 'Smoothies']
const orderedMenuCategories = menuCategoryOrder.map((name) => menuCategories.find((category) => category.name === name)).filter((category): category is MenuCategory => Boolean(category))

function Media({ src, alt, type = 'image', className = '' }: { src: string; alt: string; type?: string; className?: string }) {
  if (type === 'video') {
    return <video className={className} src={src} autoPlay muted loop playsInline preload="metadata" aria-label={alt} />
  }
  return <img className={className} src={src} alt={alt} loading="lazy" />
}

function MenuPage({ src, alt, label, number, delay = 0 }: { src: string; alt: string; label: string; number: string; delay?: number }) {
  const reducedMotion = useReducedMotion()
  const pageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-16, 16])
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4, 4]), { stiffness: 180, damping: 22 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !pageRef.current) return
    const bounds = pageRef.current.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const resetPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div ref={pageRef} className="menu-page" style={{ rotateX, rotateY }} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} initial={{ opacity: 0, transform: reducedMotion ? 'none' : 'translateY(28px) scale(.97)' }} whileInView={{ opacity: 1, transform: 'translateY(0) scale(1)' }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: .95, delay, ease: [0.23, 1, 0.32, 1] }}>
      <div className="menu-page-label"><span>{number}</span><span>{label}</span></div>
      <div className="menu-page-frame"><motion.img style={{ y: imageY }} src={src} alt={alt} loading="lazy" /></div>
    </motion.div>
  )
}

function MenuCategoryNav({ categories, selectedCategory, onSelect }: { categories: MenuCategory[]; selectedCategory: string; onSelect: (category: MenuCategory) => void }) {
  const navRef = useRef<HTMLElement>(null)

  const scrollCategories = (direction: number) => {
    navRef.current?.scrollBy({ left: direction * 180, behavior: 'smooth' })
  }

  return (
    <div className="menu-category-nav">
      <button className="menu-nav-arrow" type="button" aria-label="Show previous menu categories" onClick={() => scrollCategories(-1)}>←</button>
      <nav ref={navRef} className="menu-filters" aria-label="Menu categories">
        {categories.map((category) => <button className={selectedCategory === category.name ? 'is-active' : ''} type="button" key={category.name} onClick={() => onSelect(category)}>{category.name}</button>)}
      </nav>
      <button className="menu-nav-arrow" type="button" aria-label="Show more menu categories" onClick={() => scrollCategories(1)}>→</button>
    </div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const [selectedCategory, setSelectedCategory] = useState(menuCategoryOrder[0])
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
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

  const activeCategory = orderedMenuCategories.find((category) => category.name === selectedCategory)
  const activeGroups = activeCategory?.groups ?? []

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
        <div className="section-heading"><p className="eyebrow">From behind the bar</p><h2>Good things<br /><em>inside.</em></h2></div>
        <div className="menu-content">
          <div className="menu-nav-panel">
            <MenuCategoryNav categories={orderedMenuCategories} selectedCategory={selectedCategory} onSelect={(category) => { setSelectedCategory(category.name); setSelectedGroup(category.groups?.[0]?.name ?? null) }} />
            {activeGroups.length > 0 && <nav className="menu-subfilters" aria-label={`${selectedCategory} subcategories`}>{activeGroups.map((group) => <button className={selectedGroup === group.name ? 'is-active' : ''} type="button" key={group.name} onClick={() => setSelectedGroup(group.name)}>{group.name}</button>)}</nav>}
          </div>
          <div className="menu-list">
          {orderedMenuCategories.filter((category) => category.name === selectedCategory).map((category, categoryIndex) => (
            <div className="menu-category" key={category.name}>
              <div className="menu-category-heading"><h3>{category.name}</h3>{category.note && <p>{category.note}</p>}</div>
              {(category.groups ?? [{ name: '', items: category.items ?? [] }]).filter((group) => !selectedGroup || group.name === selectedGroup).map((group) => (
                <div className="menu-group" key={`${category.name}-${group.name}`}>
                  {group.name && <h4>{group.name}</h4>}
                  {group.items.map((item, itemIndex) => (
                    <motion.article className="menu-row" key={`${category.name}-${group.name}-${item.name}`} {...reveal} transition={{ ...reveal.transition, delay: (categoryIndex + itemIndex) * 0.04 }}>
                      <div className="menu-name"><h3>{item.name}</h3>{item.detail && <p>{item.detail}</p>}</div>
                      <div className="menu-price">{item.prices ? item.prices.map((price) => <span key={price}>{price}</span>) : item.price}</div>
                    </motion.article>
                  ))}
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="menu-pages" aria-label="Full cafe menu">
        <MenuPage number="01" label="Food" src="/media/first-part-menu.webp" alt="The Brew Door food menu including sandos, sides, baos, open toasts, and desserts" />
        <MenuPage number="02" label="Drinks" src="/media/second-part-menu.jpg" alt="The Brew Door drinks menu including coffee, mocktails, signatures, shakes, teas, and smoothies" delay={.12} />
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
