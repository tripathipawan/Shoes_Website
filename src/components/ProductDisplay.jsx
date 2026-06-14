/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'
import { Star, Heart, ShoppingCart, Share2, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12']

const ProductDisplay = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useContext(ShopContext)
  const [mainImage, setMainImage] = useState(product.image)
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizeError, setSizeError] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const thumbnails = [product.image, product.image1, product.image2, product.image3]
  const wishlisted = isWishlisted(product.id)
  const discount = Math.round(((product.old_price - product.new_price) / product.old_price) * 100)

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    addToCart(product.id)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-12 px-4 md:px-0'>
      {/* Image Gallery */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='flex gap-4'
      >
        {/* Thumbnails */}
        <div className='flex flex-col gap-3'>
          {thumbnails.map((img, i) => (
            <button
              key={i}
              onClick={() => setMainImage(img)}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                mainImage === img
                  ? 'border-[#138695] scale-105'
                  : 'border-gray-200 dark:border-[#2a2a2a] hover:border-[#138695]/50'
              } bg-gray-50 dark:bg-[#1a1a1a]`}
            >
              <img src={img} alt={`View ${i + 1}`} className='w-full h-full object-contain p-2' />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className='flex-1 relative bg-gray-50 dark:bg-[#151515] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#2a2a2a]'>
          {discount > 0 && (
            <div className='absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
              -{discount}%
            </div>
          )}
          <AnimatePresence mode='wait'>
            <motion.img
              key={mainImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={mainImage}
              alt={product.name}
              className='w-full h-80 md:h-[460px] object-contain p-6'
            />
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Product Info */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col gap-5'
      >
        {/* Category tag */}
        <span className='text-[#138695] font-semibold uppercase tracking-widest text-xs'>
          {product.category}&rsquo;s shoes
        </span>

        {/* Name */}
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight'>
          {product.name}
        </h1>

        {/* Rating */}
        <div className='flex items-center gap-2'>
          <div className='flex gap-0.5'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < 4 ? '#138695' : '#d1d5db'}
                className={i < 4 ? 'text-[#138695]' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className='text-gray-500 dark:text-gray-400 text-sm font-medium'>4.0 (122 reviews)</span>
        </div>

        {/* Price */}
        <div className='flex items-end gap-3'>
          <span className='text-4xl font-extrabold text-[#138695]'>${product.new_price}</span>
          <span className='text-xl text-gray-400 line-through mb-0.5'>${product.old_price}</span>
          {discount > 0 && (
            <span className='text-green-500 font-semibold text-sm mb-0.5'>Save {discount}%</span>
          )}
        </div>

        {/* Description */}
        <p className='text-gray-500 dark:text-gray-400 text-sm leading-relaxed'>
          Experience the perfect blend of comfort and performance. Engineered for athletes and style-conscious individuals, these shoes feature premium materials and iconic Nike design.
        </p>

        {/* Size Selection */}
        <div>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='font-semibold text-gray-800 dark:text-gray-200'>Select Size</h3>
            <button className='text-[#138695] text-xs font-medium hover:underline'>Size Guide</button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size)
                  setSizeError(false)
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                  selectedSize === size
                    ? 'border-[#138695] bg-[#138695] text-white'
                    : sizeError
                    ? 'border-red-300 bg-red-50 dark:bg-red-900/10 text-gray-700 dark:text-gray-300 hover:border-[#138695]'
                    : 'border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:border-[#138695]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {sizeError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-red-500 text-xs mt-2'
            >
              Please select a size before adding to cart
            </motion.p>
          )}
        </div>

        {/* Actions */}
        <div className='flex gap-3 pt-2'>
          <Link to='/cart' className='flex-1'>
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                addedToCart
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-[#138695] hover:bg-[#0f6a77]'
              }`}
            >
              <AnimatePresence mode='wait'>
                {addedToCart ? (
                  <motion.span
                    key='added'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className='flex items-center gap-2'
                  >
                    <Check size={18} /> Added to Cart
                  </motion.span>
                ) : (
                  <motion.span
                    key='add'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='flex items-center gap-2'
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </Link>

          <motion.button
            onClick={() => toggleWishlist(product.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              wishlisted
                ? 'border-pink-400 bg-pink-50 dark:bg-pink-900/20 text-pink-500'
                : 'border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 hover:border-pink-400 hover:text-pink-500'
            }`}
          >
            <Heart size={20} fill={wishlisted ? '#ec4899' : 'none'} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label='Share product'
            className='p-4 rounded-xl border-2 border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 hover:border-[#138695] hover:text-[#138695] transition-all duration-200'
          >
            <Share2 size={20} />
          </motion.button>
        </div>

        {/* Meta info */}
        <div className='pt-4 border-t border-gray-100 dark:border-[#2a2a2a] space-y-2 text-sm'>
          <p className='text-gray-500 dark:text-gray-400'>
            <span className='font-semibold text-gray-700 dark:text-gray-300'>Category: </span>
            Sports, Gym, Running
          </p>
          <p className='text-gray-500 dark:text-gray-400'>
            <span className='font-semibold text-gray-700 dark:text-gray-300'>Tags: </span>
            Nike, Modern, Latest
          </p>
          <p className='text-gray-500 dark:text-gray-400'>
            <span className='font-semibold text-gray-700 dark:text-gray-300'>Availability: </span>
            <span className='text-green-500 font-medium'>In Stock</span>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductDisplay
