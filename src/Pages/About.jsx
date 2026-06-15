import { motion } from 'framer-motion'
import { Award, Users, Target, Heart, Shield } from 'lucide-react'
import AboutStats from '../components/AboutStats'

const values = [
  {
    icon: Target,
    title: 'Innovation',
    description: 'We push the boundaries of athletic footwear with cutting-edge technology and design.'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Our love for sports and athletes drives everything we create and every decision we make.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We build connections through sport, bringing people together across the globe.'
  },
  {
    icon: Shield,
    title: 'Sustainability',
    description: 'Committed to protecting our planet for future generations of athletes.'
  }
]

const milestones = [
  { year: '1964', title: 'Founded', description: 'Our journey began with a simple mission: make athletes better' },
  { year: '1972', title: 'First Innovation', description: 'Launched our revolutionary waffle sole technology' },
  { year: '1987', title: 'Air Technology', description: 'Introduced visible Air cushioning that changed the game' },
  { year: '2000s', title: 'Digital Era', description: 'Pioneered digital fitness tracking and connected experiences' },
  { year: 'Today', title: 'Global Leader', description: 'Serving athletes of all levels in 190+ countries worldwide' }
]

const About = () => {
  return (
    <div className='bg-white dark:bg-[#0a0a0a] transition-colors duration-300'>
      {/* Hero Section */}
      <section className='relative h-[60vh] flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#138695] to-[#0f6d7a] opacity-90'></div>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='relative z-10 text-center text-white container'
        >
          <h1 className='text-5xl md:text-7xl font-bold mb-6'>Our Story</h1>
          <p className='text-xl md:text-2xl max-w-3xl mx-auto font-light'>
            Bringing inspiration and innovation to every athlete in the world
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className='container py-20'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>Our Mission</span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-6'>
              If You Have a Body, You Are an Athlete
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4'>
              Since our founding, we&apos;ve been driven by a singular vision: to bring inspiration and innovation to every athlete in the world. And if you have a body, you&apos;re an athlete.
            </p>
            <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
              We create products, services, and experiences for today&apos;s athlete while solving problems for the next generation. Our commitment to innovation has never wavered, and we continue to push the boundaries of what&apos;s possible.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='relative h-[400px] rounded-2xl overflow-hidden'
          >
            <img
              src='https://images.unsplash.com/photo-1556906781-9cba4a4a2a0a?w=800&auto=format&fit=crop'
              alt='Athletes'
              className='w-full h-full object-cover'
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <AboutStats />

      {/* Values Section */}
      <section className='bg-gray-50 dark:bg-[#0f0f0f] py-20 transition-colors duration-300'>
        <div className='container'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-14'
          >
            <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>
              What We Stand For
            </span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2'>
              Our Core Values
            </h2>
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
                <div className='w-14 h-14 bg-[#138695]/10 rounded-full flex items-center justify-center mb-6'>
                  <value.icon className='text-[#138695]' size={28} />
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                  {value.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className='container py-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-14'
        >
          <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>
            Our Journey
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2'>
            Milestones That Matter
          </h2>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className='relative pl-8 pb-12 border-l-2 border-gray-300 dark:border-[#2a2a2a] last:border-transparent'
            >
              <div className='absolute left-[-9px] top-0 w-4 h-4 bg-[#138695] rounded-full'></div>
              <div className='bg-white dark:bg-[#151515] rounded-lg p-6 border border-gray-200 dark:border-[#2a2a2a]'>
                <span className='text-2xl font-bold text-[#138695]'>{milestone.year}</span>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mt-2 mb-2'>
                  {milestone.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300'>
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-[#138695] py-20'>
        <div className='container text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Award size={48} className='text-white mx-auto mb-6' />
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
              Join the Movement
            </h2>
            <p className='text-xl text-white/90 max-w-2xl mx-auto mb-8'>
              Be part of a global community of athletes pushing boundaries and achieving greatness every day.
            </p>
            <button className='bg-white text-[#138695] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors'>
              Explore Our Products
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
