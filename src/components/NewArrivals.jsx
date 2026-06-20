import { useContext } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { Heart, ShoppingCart, ArrowRight } from 'lucide-react'


const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Latest 8 products (highest IDs among unique ones)
const NEW_IDS = [10, 21, 27, 30, 31, 32, 35, 36]

const NewArrivals = () => {
  const { all_product, addToCart, toggleWishlist, isWishlisted } = useContext(ShopContext)
  const newProducts = all_product.filter((p) => NEW_IDS.includes(p.id))

  return (
    <section className='py-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300'>
      <div className='container'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='flex items-end justify-between mb-12'
        >
          <div>
            <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>
              Just Dropped
            </span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2'>
              New Arrivals
            </h2>
          </div>
          <Link
            to='/mens'
            className='hidden md:flex items-center gap-2 text-[#138695] font-semibold hover:gap-4 transition-all duration-300'
          >
            View All <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'
        >
          {newProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className='group bg-gray-50 dark:bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#333] shadow-sm hover:shadow-xl transition-shadow duration-300'
            >
              {/* Badge */}
              <div className='relative'>
                <div className='absolute top-3 left-3 z-10 bg-[#138695] text-white text-xs font-bold px-2 py-1 rounded-full'>
                  NEW
                </div>
                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  className='absolute top-3 right-3 z-10 bg-white dark:bg-[#2a2a2a] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110'
                >
                  <Heart
                    size={16}
                    className={isWishlisted(product.id) ? 'text-pink-500 fill-pink-500' : 'text-gray-600 dark:text-gray-300'}
                    fill={isWishlisted(product.id) ? '#ec4899' : 'none'}
                  />
                </button>
                <Link to={`/products/${product.id}`}>
                  {/* Lighter dark bg for transparent shoe PNGs */}
                  <div className='bg-gray-100 dark:bg-[#2a2a2a] h-52 md:h-64 flex items-center justify-center overflow-hidden'>
                    <img
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      loading='lazy'
                      decoding='async'
                      className='h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-500'
                    />
                  </div>
                </Link>
              </div>

              {/* Info */}
              <div className='p-4 bg-gray-50 dark:bg-[#1e1e1e]'>
                <Link to={`/products/${product.id}`}>
                  <h3 className='text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-1 hover:text-[#138695] transition-colors'>
                    {product.name}
                  </h3>
                </Link>
                <div className='flex items-center justify-between mt-2'>
                  <div className='flex items-center gap-2'>
                    <span className='text-[#138695] font-bold'>${product.new_price}</span>
                    <span className='text-gray-400 text-xs line-through'>${product.old_price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className='bg-[#138695] text-white p-2 rounded-full hover:bg-[#0f6a77] transition-colors duration-200 hover:scale-110 active:scale-95'
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All */}
        <div className='mt-8 text-center md:hidden'>
          <Link
            to='/mens'
            className='inline-flex items-center gap-2 text-[#138695] font-semibold border border-[#138695] px-6 py-3 rounded-full hover:bg-[#138695] hover:text-white transition-colors duration-300'
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
