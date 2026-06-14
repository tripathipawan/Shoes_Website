import { motion } from 'framer-motion'
import { Truck, RotateCcw, ShieldCheck, CreditCard } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free delivery on all orders over $50. Fast and reliable shipping to your door.',
    color: '#138695',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns. Not happy? Send it back, no questions asked.',
    color: '#e85d8a',
  },
  {
    icon: ShieldCheck,
    title: '100% Authentic',
    description: 'Every product is certified genuine. We partner directly with Nike.',
    color: '#f59e0b',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Your payment information is always encrypted and completely safe.',
    color: '#8b5cf6',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const WhyChooseUs = () => {
  return (
    <section className='py-20 bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-300'>
      <div className='container'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-14'
        >
          <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>
            Our Promise
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2'>
            Why Choose Us
          </h2>
          <p className='text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto'>
            We go beyond just selling shoes — we deliver an experience you can trust.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ scale: 1.04, y: -4 }}
                className='bg-white dark:bg-[#151515] rounded-2xl p-8 text-center border border-gray-100 dark:border-[#2a2a2a] shadow-sm hover:shadow-xl transition-shadow duration-300 group'
              >
                {/* Animated icon circle */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                  transition={{ duration: 0.5 }}
                  className='w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center'
                  style={{ backgroundColor: `${feature.color}18` }}
                >
                  <Icon
                    size={28}
                    style={{ color: feature.color }}
                    strokeWidth={1.5}
                  />
                </motion.div>
                <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-500 dark:text-gray-400 text-sm leading-relaxed'>
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
