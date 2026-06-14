import { motion } from 'framer-motion'
import { Star, Zap, Award, Globe, Users, Truck } from 'lucide-react'

const items = [
  { icon: Star, text: '4.9 Average Rating' },
  { icon: Users, text: '5M+ Happy Customers' },
  { icon: Globe, text: 'Ships to 150+ Countries' },
  { icon: Award, text: '100% Authentic Nike' },
  { icon: Truck, text: 'Free Shipping Over $50' },
  { icon: Zap, text: 'Same-Day Dispatch' },
  { icon: Star, text: 'Award Winning Store' },
  { icon: Users, text: 'Trusted Since 1990' },
]

// Duplicate for seamless loop
const marqueeItems = [...items, ...items]

const StatsMarquee = () => {
  return (
    <section className='py-6 bg-[#138695] overflow-hidden'>
      <div className='flex'>
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className='flex items-center gap-0 whitespace-nowrap will-change-transform'
        >
          {marqueeItems.map((item, i) => {
            const Icon = item.icon
            return (
              <span
                key={i}
                className='inline-flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-widest px-10'
              >
                <Icon size={16} className='text-white/80 flex-shrink-0' />
                {item.text}
                <span className='text-white/40 ml-8'>•</span>
              </span>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsMarquee
