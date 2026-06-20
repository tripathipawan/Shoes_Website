import { useState, useEffect, useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Alex R.',
    role: 'Marathon Runner',
    rating: 5,
    text: 'The Air Max 270 changed my running game completely. Insane cushioning, perfect fit right out of the box. Worth every penny.',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 2,
    name: 'Sarah M.',
    role: 'Fitness Enthusiast',
    rating: 5,
    text: "I bought the women's Air Max 1 and I absolutely love them. Stylish, comfy, and they get compliments everywhere I go.",
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'Jordan K.',
    role: 'Basketball Player',
    rating: 4,
    text: 'Ordered two pairs and both arrived quickly and in perfect condition. The quality is exactly what you expect from Nike.',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 4,
    name: 'Priya S.',
    role: 'Fashion Blogger',
    rating: 5,
    text: "Love the curation here. I found the limited colorway I'd been searching for. Packaging was clean too. Will definitely order again!",
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 5,
    name: 'Marcus T.',
    role: 'Gym Trainer',
    rating: 5,
    text: "Great store, fast shipping, and the shoes are 100% authentic. I've ordered 3 times and the experience just keeps getting better.",
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 6,
    name: 'Chloe W.',
    role: 'Sneaker Collector',
    rating: 4,
    text: 'The Air VaporMax is legitimately the most comfortable shoe I own. Light as air and looks futuristic. No regrets!',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const reduced = useReducedMotion()
  const carouselId = useId()
  const total = reviews.length

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const VISIBLE = isMobile ? 1 : 3
  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  // Auto-scroll — disabled when user prefers reduced motion
  useEffect(() => {
    if (isPaused || reduced) return
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, current, reduced])

  const visible = Array.from({ length: VISIBLE }, (_, i) => reviews[(current + i) % total])

  return (
    <section
      className='py-20 bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-300 overflow-hidden'
      aria-labelledby='testimonials-heading'
    >
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
            What They Say
          </span>
          <h2 id='testimonials-heading' className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2'>
            Customer Reviews
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className='relative'
          aria-label='Customer reviews carousel'
        >
          {/* Live region so screen readers announce slide changes */}
          <div aria-live='polite' aria-atomic='true' className='sr-only'>
            Review {current + 1} of {total}: {visible[0]?.name} — {visible[0]?.text}
          </div>

          <div
            className='grid grid-cols-1 md:grid-cols-3 gap-6'
            role='list'
            id={carouselId}
          >
            {visible.map((review, idx) => (
              <motion.article
                key={review.id + '-' + current}
                role='listitem'
                initial={{ opacity: 0, x: reduced ? 0 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className='bg-white dark:bg-[#151515] rounded-2xl p-7 border border-gray-100 dark:border-[#2a2a2a] shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4 min-h-[280px]'
              >
                {/* Stars */}
                <div
                  className='flex gap-1'
                  role='img'
                  aria-label={`Rating: ${review.rating} out of 5 stars`}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? '#facc15' : '#e5e7eb'}
                      className={i < review.rating ? 'text-yellow-400' : 'text-gray-200'}
                      aria-hidden='true'
                    />
                  ))}
                </div>

                {/* Review text */}
                <blockquote className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1'>
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Author */}
                <footer className='flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-[#2a2a2a]'>
                  <img
                    src={review.avatar}
                    alt={`${review.name}, ${review.role}`}
                    width={40}
                    height={40}
                    loading='lazy'
                    decoding='async'
                    className='w-10 h-10 rounded-full object-cover ring-2 ring-[#138695]/30'
                  />
                  <div>
                    <p className='font-semibold text-gray-900 dark:text-white text-sm'>
                      {review.name}
                    </p>
                    <p className='text-xs text-gray-400'>{review.role}</p>
                  </div>
                </footer>
              </motion.article>
            ))}
          </div>

          {/* Navigation */}
          <div className='flex justify-center gap-4 mt-8' role='group' aria-label='Carousel navigation'>
            <button
              onClick={prev}
              className='bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-300 p-3 rounded-full hover:bg-[#138695] hover:text-white hover:border-[#138695] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695]'
              aria-label='Previous review'
              aria-controls={carouselId}
            >
              <ChevronLeft size={20} aria-hidden='true' />
            </button>

            {/* Dot indicators */}
            <div className='flex items-center gap-2' role='tablist' aria-label='Select review'>
              {reviews.map((_, i) => (
                <button
                  key={i}
                  role='tab'
                  aria-selected={i === current}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695] ${
                    i === current
                      ? 'bg-[#138695] w-6 h-2'
                      : 'bg-gray-300 dark:bg-gray-600 w-2 h-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className='bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] text-gray-600 dark:text-gray-300 p-3 rounded-full hover:bg-[#138695] hover:text-white hover:border-[#138695] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695]'
              aria-label='Next review'
              aria-controls={carouselId}
            >
              <ChevronRight size={20} aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
