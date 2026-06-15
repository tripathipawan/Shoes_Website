import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Shoe1 from '../assets/Shoes1.png'

const stats = [
  { value: 30, suffix: '+', label: 'Years of Excellence' },
  { value: 5, suffix: 'M+', label: 'Products Sold' },
  { value: 150, suffix: '+', label: 'Countries' },
  { value: 98, suffix: '%', label: 'Happy Customers' },
]

// Animated counter hook
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

/* eslint-disable react/prop-types */
const StatItem = ({ value, suffix, label }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useCounter(value, 2000, inView)

  return (
    <div ref={ref} className='text-center'>
      <p className='text-4xl md:text-5xl font-extrabold text-[#138695]'>
        {count}
        {suffix}
      </p>
      <p className='text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium uppercase tracking-wide'>
        {label}
      </p>
    </div>
  )
}

const AboutStats = () => {
  return (
    <section className='py-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 overflow-hidden'>
      <div className='container'>
        <div className='flex flex-col md:flex-row items-center gap-12 md:gap-20'>
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='flex-1 relative'
          >
            <div className='relative w-full aspect-square max-w-md mx-auto'>
              {/* Background circle */}
              <div className='absolute inset-8 bg-[#138695]/10 dark:bg-[#138695]/20 rounded-full' />
              {/* Floating shoe */}
              <motion.img
                src={Shoe1}
                alt='Nike Sneaker'
                animate={{ y: [0, -16, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className='relative z-10 w-full h-full object-contain drop-shadow-2xl'
              />
              {/* Decorative ring */}
              <div className='absolute inset-0 border-2 border-dashed border-[#138695]/30 rounded-full animate-spin'
                style={{ animationDuration: '20s' }}
              />
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='flex-1'
          >
            <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>
              Our Story
            </span>
            <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 leading-tight'>
              Just Do It.{' '}
              <span className='text-[#138695]'>Always Have.</span>
            </h2>
            <p className='text-gray-500 dark:text-gray-400 mt-5 text-base leading-relaxed'>
              Born from the track and built for the streets, Nike has been pushing the boundaries of athletic footwear for over three decades. Every sneaker we carry is a testament to innovation, comfort, and relentless performance.
            </p>
            <p className='text-gray-500 dark:text-gray-400 mt-3 text-base leading-relaxed'>
              From the iconic Air Max to the timeless Air Force 1, we curate the best of Nike&rsquo;s catalog so you can always find your perfect pair.
            </p>

            {/* Stats Grid */}
            <div className='grid grid-cols-2 gap-8 mt-10 border-t border-gray-100 dark:border-[#2a2a2a] pt-8'>
              {stats.map((s) => (
                <StatItem key={s.label} {...s} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutStats
