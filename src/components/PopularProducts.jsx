import { useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { Heart, ShoppingCart, Star } from 'lucide-react'

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Men', value: 'men' },
  { label: 'Women', value: 'women' },
  { label: 'Kids', value: 'kid' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

const PopularProducts = () => {
  const { all_product, addToCart, toggleWishlist, isWishlisted } = useContext(ShopContext)
  const [activeTab, setActiveTab] = useState('all')
  const [hoveredId, setHoveredId] = useState(null)

  // Show a curated subset — first 8 unique products
  const POPULAR_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 23, 24, 25, 26]
  const baseProducts = all_product.filter((p) => POPULAR_IDS.includes(p.id))

  const filtered =
    activeTab === 'all'
      ? baseProducts.slice(0, 8)
      : baseProducts.filter((p) => p.category === activeTab).slice(0, 8)

  return (
    <section className='py-20 bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-300'>
      <div className='container'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-10'
        >
          <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>
            Top Picks
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2'>
            Best Sellers
          </h2>
          <p className='text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto'>
            Discover our most loved sneakers, chosen by thousands of happy customers.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='flex justify-center gap-2 mb-10'
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeTab === tab.value
                  ? 'bg-[#138695] text-white shadow-md scale-105'
                  : 'bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#2a2a2a] hover:border-[#138695]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial='hidden'
            animate='show'
            exit='exit'
            className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
          >
            {filtered.length === 0 ? (
              <motion.p
                variants={cardVariants}
                className='col-span-full text-center text-gray-400 py-16 text-lg'
              >
                No products found in this category.
              </motion.p>
            ) : (
              filtered.map((product) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                  onHoverStart={() => setHoveredId(product.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className='group bg-white dark:bg-[#151515] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#2a2a2a] shadow-sm hover:shadow-2xl transition-shadow duration-300'
                >
                  {/* Image with swap on hover */}
                  <div className='relative bg-gray-50 dark:bg-[#1a1a1a] h-52 md:h-60 overflow-hidden'>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                      className='absolute top-3 right-3 z-10 bg-white dark:bg-[#2a2a2a] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow'
                    >
                      <Heart
                        size={14}
                        className={isWishlisted(product.id) ? 'text-pink-500' : 'text-gray-600 dark:text-gray-300'}
                        fill={isWishlisted(product.id) ? '#ec4899' : 'none'}
                      />
                    </button>
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={hoveredId === product.id ? product.image1 : product.image}
                        alt={product.name}
                        className='h-full w-full object-contain p-4 transition-all duration-500 group-hover:scale-110'
                      />
                    </Link>
                  </div>

                  {/* Info */}
                  <div className='p-4'>
                    <div className='flex text-yellow-400 text-xs gap-0.5 mb-1'>
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} size={12} fill='#facc15' />
                      ))}
                      <Star size={12} fill='#d1d5db' />
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <h3 className='text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-[#138695] transition-colors leading-snug'>
                        {product.name}
                      </h3>
                    </Link>
                    <div className='flex items-center justify-between mt-3'>
                      <div>
                        <span className='text-[#138695] font-bold text-base'>${product.new_price}</span>
                        <span className='text-gray-400 text-xs line-through ml-2'>${product.old_price}</span>
                      </div>
                      <button
                        onClick={() => addToCart(product.id)}
                        className='bg-[#138695] text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-[#0f6a77] transition-colors duration-200 active:scale-95'
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart size={13} />
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PopularProducts
