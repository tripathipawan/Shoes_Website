import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Tag, ArrowRight } from 'lucide-react'

// Count down to a future date
const TARGET_DATE = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now

const useCountdown = (target) => {
  const calc = () => {
    const diff = Math.max(0, target - Date.now())
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / 1000 / 60) % 60),
      secs: Math.floor((diff / 1000) % 60),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return time
}

/* eslint-disable react/prop-types */
const TimeBlock = ({ value, label }) => (
  <div className='flex flex-col items-center'>
    <motion.div
      key={value}
      initial={{ scale: 1.3, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='bg-white/20 backdrop-blur-sm text-white font-bold text-xl sm:text-2xl md:text-4xl w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center border border-white/30'
    >
      {String(value).padStart(2, '0')}
    </motion.div>
    <span className='text-white/70 text-xs mt-1 uppercase tracking-wider'>{label}</span>
  </div>
)

const SpecialOffer = () => {
  const { days, hours, mins, secs } = useCountdown(TARGET_DATE)

  return (
    <section className='py-20 overflow-hidden'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='relative rounded-3xl overflow-hidden'
          style={{ background: 'linear-gradient(135deg, #138695 0%, #0f4c75 50%, #1b1b2f 100%)' }}
        >
          {/* Background decorations */}
          <div className='absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full' />
          <div className='absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full' />

          <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-14'>
            {/* Left content */}
            <div className='text-center md:text-left'>
              <div className='flex items-center gap-2 justify-center md:justify-start mb-4'>
                <Tag className='text-yellow-400' size={20} />
                <span className='text-yellow-400 font-bold uppercase tracking-widest text-sm'>
                  Limited Time Offer
                </span>
              </div>
              <h2 className='text-4xl md:text-6xl font-extrabold text-white leading-tight'>
                Up to{' '}
                <motion.span
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className='text-yellow-400'
                >
                  40% OFF
                </motion.span>
              </h2>
              <p className='text-white/80 mt-3 text-lg max-w-md'>
                Grab the best deals on Nike Air Max, Jordan, and more. Sale ends soon!
              </p>
              <Link to='/mens'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='mt-8 bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-yellow-300 transition-colors duration-200'
                >
                  Shop the Sale <ArrowRight size={18} />
                </motion.button>
              </Link>
            </div>

            {/* Right — countdown */}
            <div className='flex flex-col items-center gap-4'>
              <p className='text-white/70 uppercase tracking-widest text-sm font-semibold'>
                Offer ends in
              </p>
              <div className='flex items-center gap-2 sm:gap-3'>
                <TimeBlock value={days} label='Days' />
                <span className='text-white/60 text-2xl sm:text-3xl font-light mb-5'>:</span>
                <TimeBlock value={hours} label='Hours' />
                <span className='text-white/60 text-2xl sm:text-3xl font-light mb-5'>:</span>
                <TimeBlock value={mins} label='Mins' />
                <span className='text-white/60 text-2xl sm:text-3xl font-light mb-5'>:</span>
                <TimeBlock value={secs} label='Secs' />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SpecialOffer
