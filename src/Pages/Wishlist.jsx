import { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.25 } },
}

const Wishlist = () => {
  const { all_product, wishlist, toggleWishlist, addToCart } = useContext(ShopContext)
  const wishlistedProducts = all_product.filter((p) => wishlist.includes(p.id))

  return (
    <>
      <SEO title='My Wishlist' description='Your saved Nike shoes wishlist.' canonical='/wishlist' noIndex={true} />
      <div className='min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300 py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-10'
        >
          <div className='flex items-center gap-3 mb-2'>
            <Heart size={28} className='text-[#138695]' fill='#138695' />
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>
              My Wishlist
            </h1>
          </div>
          <p className='text-gray-500 dark:text-gray-400'>
            {wishlistedProducts.length} item{wishlistedProducts.length !== 1 ? 's' : ''} saved
          </p>
        </motion.div>

        <AnimatePresence mode='wait'>
          {wishlistedProducts.length === 0 ? (
            <motion.div
              key='empty'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col items-center justify-center py-24 gap-6 text-center'
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className='w-24 h-24 bg-[#138695]/10 rounded-full flex items-center justify-center'
              >
                <Heart size={40} className='text-[#138695]' />
              </motion.div>
              <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
                Your wishlist is empty
              </h2>
              <p className='text-gray-500 dark:text-gray-400 max-w-sm'>
                Start adding your favorite Nike shoes to your wishlist so you never lose track of them.
              </p>
              <Link to='/mens'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center gap-2 bg-[#138695] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#0f6a77] transition-colors duration-200'
                >
                  Explore Shoes <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key='grid'
              variants={containerVariants}
              initial='hidden'
              animate='show'
              className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'
            >
              <AnimatePresence>
                {wishlistedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    layout
                    exit={cardVariants.exit}
                    whileHover={{ scale: 1.02 }}
                    className='group bg-gray-50 dark:bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#333] shadow-sm hover:shadow-xl transition-shadow duration-300'
                  >
                    {/* Image */}
                    <div className='relative bg-gray-100 dark:bg-[#2a2a2a] h-48 sm:h-56'>
                      {/* Remove from wishlist */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        aria-label='Remove from wishlist'
                        className='absolute top-3 right-3 z-10 bg-white dark:bg-[#2a2a2a] p-2 rounded-full shadow hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 group/btn'
                      >
                        <Trash2 size={15} className='text-red-500 group-hover/btn:scale-110 transition-transform' />
                      </button>
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          width={224}
                          height={224}
                          loading='lazy'
                          decoding='async'
                          className='h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-500'
                        />
                      </Link>
                    </div>

                    {/* Info */}
                    <div className='p-4'>
                      <Link to={`/products/${product.id}`}>
                        <h3 className='text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-[#138695] transition-colors leading-snug mb-2'>
                          {product.name}
                        </h3>
                      </Link>
                      <div className='flex items-center justify-between'>
                        <div>
                          <span className='text-[#138695] font-bold'>${product.new_price}</span>
                          <span className='text-gray-400 text-xs line-through ml-2'>${product.old_price}</span>
                        </div>
                        <button
                          onClick={() => addToCart(product.id)}
                          aria-label={`Add ${product.name} to cart`}
                          className='bg-[#138695] text-white p-2 rounded-lg hover:bg-[#0f6a77] transition-colors duration-200 active:scale-95'
                        >
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  )
}

export default Wishlist
