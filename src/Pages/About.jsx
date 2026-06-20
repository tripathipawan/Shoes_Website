import { motion } from 'framer-motion'
import { Award, Users, Target, Heart, Shield } from 'lucide-react'
import AboutStats from '../components/AboutStats'
import SEO from '../components/SEO'
import Shoe1 from '../assets/Shoes1.png'
import Shoe2 from '../assets/Shoes2.png'
import Shoe3 from '../assets/Shoes3.png'

const values = [
  { icon: Target, title: 'Innovation', description: 'We push the boundaries of athletic footwear with cutting-edge technology and design.' },
  { icon: Heart, title: 'Passion', description: 'Our love for sports and athletes drives everything we create and every decision we make.' },
  { icon: Users, title: 'Community', description: 'We build connections through sport, bringing people together across the globe.' },
  { icon: Shield, title: 'Sustainability', description: 'Committed to protecting our planet for future generations of athletes.' },
]

const milestones = [
  { year: '1964', title: 'Founded', description: 'Our journey began with a simple mission: make athletes better' },
  { year: '1972', title: 'First Innovation', description: 'Launched our revolutionary waffle sole technology' },
  { year: '1987', title: 'Air Technology', description: 'Introduced visible Air cushioning that changed the game' },
  { year: '2000s', title: 'Digital Era', description: 'Pioneered digital fitness tracking and connected experiences' },
  { year: 'Today', title: 'Global Leader', description: 'Serving athletes of all levels in 190+ countries worldwide' },
]

// GEO: concise extractable summary paragraph for AI engines
const BRAND_SUMMARY = `NikeStore is an authorized Nike footwear retailer offering authentic sneakers across Men's, Women's, and Kids' categories. We carry iconic lines including Air Max, Air Jordan, Air Force 1, and VaporMax. Free shipping on orders over $100, with 30-day hassle-free returns.`

const About = () => (
  <>
    <SEO
      title="About Us — Brand Story"
      description="Learn about NikeStore's mission, values, and journey. Bringing inspiration and innovation to every athlete in the world."
      canonical="/about"
    />
    {/* Organization JSON-LD */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About NikeStore',
          description: BRAND_SUMMARY,
          url: 'https://nikestore.vercel.app/about',
        }),
      }}
    />
    <div className='bg-white dark:bg-[#0a0a0a] transition-colors duration-300'>
      {/* Hero */}
      <section className='relative h-[60vh] flex items-center justify-center overflow-hidden' aria-labelledby='about-hero-heading'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#138695] to-[#0f6d7a] opacity-90' aria-hidden='true' />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='relative z-10 text-center text-white container'
        >
          <h1 id='about-hero-heading' className='text-5xl md:text-7xl font-bold mb-6'>Our Story</h1>
          <p className='text-xl md:text-2xl max-w-3xl mx-auto font-light'>
            Bringing inspiration and innovation to every athlete in the world
          </p>
        </motion.div>
      </section>

      {/* GEO summary — extractable paragraph */}
      <section className='container py-12' aria-label='Brand summary'>
        <p className='text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed'>
          {BRAND_SUMMARY}
        </p>
      </section>

      {/* Mission */}
      <section className='container py-20' aria-labelledby='mission-heading'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>Our Mission</span>
            <h2 id='mission-heading' className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-6'>
              If You Have a Body, You Are an Athlete
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4'>
              Since our founding, we&apos;ve been driven by a singular vision: to bring inspiration and innovation to every athlete in the world. And if you have a body, you&apos;re an athlete.
            </p>
            <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
              We create products, services, and experiences for today&apos;s athlete while solving problems for the next generation.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className='relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#138695]/20 to-[#0f6d7a]/10 dark:from-[#138695]/10 dark:to-[#0a0a0a] border border-gray-100 dark:border-[#2a2a2a]'>
            {/* Decorative shoe collage — uses local assets, no external dependency */}
            <div className='absolute inset-0 flex items-center justify-center gap-4 p-6'>
              <motion.img
                src={Shoe1}
                alt='Jordan Luka sneaker'
                width={160}
                height={160}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className='w-36 md:w-44 object-contain drop-shadow-2xl'
              />
              <div className='flex flex-col gap-4'>
                <motion.img
                  src={Shoe2}
                  alt='Nike G.T. Cut sneaker'
                  width={120}
                  height={120}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                  className='w-28 md:w-32 object-contain drop-shadow-xl'
                />
                <motion.img
                  src={Shoe3}
                  alt='Nike G.T. Cut Academy sneaker'
                  width={120}
                  height={120}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 1 }}
                  className='w-28 md:w-32 object-contain drop-shadow-xl'
                />
              </div>
            </div>
            {/* Brand tag */}
            <div className='absolute bottom-4 left-4 right-4 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3'>
              <p className='text-gray-700 dark:text-gray-300 text-sm font-semibold text-center'>
                🏆 Over 30 years of performance innovation
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <AboutStats />

      {/* Values */}
      <section className='bg-gray-50 dark:bg-[#0f0f0f] py-20 transition-colors duration-300' aria-labelledby='values-heading'>
        <div className='container'>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className='text-center mb-14'>
            <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>What We Stand For</span>
            <h2 id='values-heading' className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2'>Our Core Values</h2>
          </motion.div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className='bg-white dark:bg-[#151515] rounded-xl p-8 border border-gray-200 dark:border-[#2a2a2a] hover:shadow-xl transition-shadow duration-300'
              >
                <div className='w-14 h-14 bg-[#138695]/10 rounded-full flex items-center justify-center mb-6' aria-hidden='true'>
                  <value.icon className='text-[#138695]' size={28} />
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>{value.title}</h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className='container py-20' aria-labelledby='timeline-heading'>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className='text-center mb-14'>
          <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>Our Journey</span>
          <h2 id='timeline-heading' className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2'>Milestones That Matter</h2>
        </motion.div>
        <ol className='max-w-4xl mx-auto' aria-label='Company milestones'>
          {milestones.map((milestone, idx) => (
            <motion.li
              key={milestone.year}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className='relative pl-8 pb-12 border-l-2 border-gray-300 dark:border-[#2a2a2a] last:border-transparent'
            >
              <div className='absolute left-[-9px] top-0 w-4 h-4 bg-[#138695] rounded-full' aria-hidden='true' />
              <div className='bg-white dark:bg-[#151515] rounded-lg p-6 border border-gray-200 dark:border-[#2a2a2a]'>
                <span className='text-2xl font-bold text-[#138695]'>{milestone.year}</span>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mt-2 mb-2'>{milestone.title}</h3>
                <p className='text-gray-600 dark:text-gray-300'>{milestone.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className='bg-[#138695] py-20' aria-labelledby='cta-heading'>
        <div className='container text-center'>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Award size={48} className='text-white mx-auto mb-6' aria-hidden='true' />
            <h2 id='cta-heading' className='text-4xl md:text-5xl font-bold text-white mb-6'>Join the Movement</h2>
            <p className='text-xl text-white/90 max-w-2xl mx-auto mb-8'>
              Be part of a global community of athletes pushing boundaries and achieving greatness every day.
            </p>
            <a
              href='/mens'
              className='inline-block bg-white text-[#138695] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#138695]'
            >
              Explore Our Products
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  </>
)

export default About
