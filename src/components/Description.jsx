import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = [
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'reviews',
    label: 'Reviews (122)',
  },
  {
    id: 'shipping',
    label: 'Shipping & Returns',
  },
]

const DescriptionContent = () => (
  <div className='space-y-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed'>
    <p>
      Designed for athletes who demand both performance and style, this Nike sneaker combines cutting-edge cushioning technology with premium materials. The breathable upper keeps your feet cool during intense workouts, while the responsive midsole delivers energy return with every stride.
    </p>
    <p>
      The durable rubber outsole provides excellent traction on a variety of surfaces, from the gym floor to urban streets. Whether you&rsquo;re training hard or keeping it casual, these shoes rise to every occasion.
    </p>
    <h3 className='font-semibold text-gray-800 dark:text-white mt-4'>Key Features</h3>
    <ul className='list-disc list-inside space-y-1 text-gray-500 dark:text-gray-400'>
      <li>Air cushioning for maximum comfort</li>
      <li>Breathable mesh upper for ventilation</li>
      <li>Reinforced toe box for durability</li>
      <li>Padded collar and tongue for a secure fit</li>
      <li>Rubber outsole for traction</li>
    </ul>
  </div>
)

const ReviewsContent = () => (
  <div className='space-y-5'>
    {[
      { name: 'Alex R.', rating: 5, text: 'Amazing shoes! Incredibly comfortable from the first wear. Great fit and love the style.', date: 'March 12, 2025' },
      { name: 'Sarah M.', rating: 5, text: 'Perfect for my morning runs. Light, supportive, and looks great with casual outfits too.', date: 'February 28, 2025' },
      { name: 'Jordan K.', rating: 4, text: 'Quality is excellent. Fits true to size. Delivery was fast. Highly recommend!', date: 'January 15, 2025' },
    ].map((review, i) => (
      <article key={i} className='bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-4 border border-gray-100 dark:border-[#2a2a2a]'>
        <div className='flex items-center justify-between mb-2'>
          <p className='font-semibold text-gray-800 dark:text-white text-sm'>{review.name}</p>
          <time className='text-xs text-gray-400'>{review.date}</time>
        </div>
        <div
          className='flex gap-0.5 mb-2'
          role='img'
          aria-label={`Rating: ${review.rating} out of 5 stars`}
        >
          {[...Array(5)].map((_, j) => (
            <span key={j} className={`text-sm ${j < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} aria-hidden='true'>★</span>
          ))}
        </div>
        <p className='text-gray-600 dark:text-gray-300 text-sm'>{review.text}</p>
      </article>
    ))}
  </div>
)

const ShippingContent = () => (
  <div className='space-y-4 text-sm text-gray-600 dark:text-gray-300'>
    <section>
      <h3 className='font-semibold text-gray-800 dark:text-white mb-2'>Shipping</h3>
      <ul className='space-y-1 text-gray-500 dark:text-gray-400'>
        <li>• Free standard shipping on orders over $50</li>
        <li>• Standard delivery: 5–7 business days</li>
        <li>• Express delivery: 2–3 business days ($9.99)</li>
        <li>• Same-day dispatch on orders placed before 2 PM</li>
      </ul>
    </section>
    <section>
      <h3 className='font-semibold text-gray-800 dark:text-white mb-2'>Returns</h3>
      <ul className='space-y-1 text-gray-500 dark:text-gray-400'>
        <li>• 30-day hassle-free returns</li>
        <li>• Items must be unworn and in original packaging</li>
        <li>• Free return shipping on all orders</li>
        <li>• Refunds processed within 3–5 business days</li>
      </ul>
    </section>
  </div>
)

const tabContent = {
  description: <DescriptionContent />,
  reviews: <ReviewsContent />,
  shipping: <ShippingContent />,
}

const Description = () => {
  const [activeTab, setActiveTab] = useState('description')
  const panelId = useId()

  return (
    <div className='mt-16 px-4 md:px-0'>
      {/* Tab list */}
      <div
        className='flex border-b border-gray-200 dark:border-[#2a2a2a] overflow-x-auto'
        role='tablist'
        aria-label='Product information tabs'
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role='tab'
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`${panelId}-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={`relative flex-shrink-0 px-6 py-4 font-semibold text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#138695] ${
              activeTab === tab.id
                ? 'text-[#138695]'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId='tab-underline'
                className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#138695]'
                aria-hidden='true'
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          id={`${panelId}-${activeTab}`}
          role='tabpanel'
          aria-labelledby={`tab-${activeTab}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className='py-8'
        >
          {tabContent[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Description
