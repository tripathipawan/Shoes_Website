/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ShoppingCart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const { all_product, addToCart } = useContext(ShopContext)

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const results = query.trim().length >= 2
    ? all_product
        .filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
    : []

  const popular = all_product.slice(0, 5)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key='backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm'
          />

          {/* Panel */}
          <motion.div
            key='panel'
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className='fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#111] shadow-2xl rounded-b-3xl max-h-[85vh] overflow-hidden flex flex-col'
          >
            {/* Search Input */}
            <div className='flex items-center gap-4 px-6 py-5 border-b border-gray-100 dark:border-[#2a2a2a]'>
              <Search size={22} className='text-[#138695] flex-shrink-0' />
              <input
                ref={inputRef}
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for shoes, styles, categories...'
                className='flex-1 text-lg bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400'
                aria-label='Search products'
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors'
                  aria-label='Clear search'
                >
                  <X size={20} />
                </button>
              )}
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors ml-2'
                aria-label='Close search'
              >
                <X size={24} />
              </button>
            </div>

            {/* Results / Suggestions */}
            <div className='overflow-y-auto flex-1 px-6 py-5'>
              {query.trim().length >= 2 ? (
                <>
                  <p className='text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4'>
                    {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                  </p>
                  {results.length === 0 ? (
                    <div className='text-center py-12 text-gray-500 dark:text-gray-400'>
                      <p className='text-lg font-medium'>No results found</p>
                      <p className='text-sm mt-1'>Try a different search term</p>
                    </div>
                  ) : (
                    <div className='space-y-3'>
                      {results.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className='flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] group transition-colors duration-150'
                        >
                          <Link
                            to={`/products/${product.id}`}
                            onClick={onClose}
                            className='flex items-center gap-4 flex-1 min-w-0'
                          >
                            <div className='w-16 h-16 bg-gray-100 dark:bg-[#222] rounded-xl flex-shrink-0 overflow-hidden'>
                              <img
                                src={product.image}
                                alt={product.name}
                                className='w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300'
                              />
                            </div>
                            <div className='min-w-0'>
                              <p className='font-semibold text-gray-800 dark:text-white text-sm line-clamp-1'>
                                {product.name}
                              </p>
                              <p className='text-xs text-gray-400 capitalize mt-0.5'>{product.category}</p>
                              <p className='text-[#138695] font-bold text-sm mt-1'>${product.new_price}</p>
                            </div>
                          </Link>
                          <button
                            onClick={() => addToCart(product.id)}
                            aria-label={`Add ${product.name} to cart`}
                            className='flex-shrink-0 bg-[#138695] text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[#0f6a77] transition-all duration-200'
                          >
                            <ShoppingCart size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className='text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4'>
                    Popular Now
                  </p>
                  <div className='space-y-3'>
                    {popular.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        onClick={onClose}
                        className='flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] group transition-colors duration-150'
                      >
                        <div className='w-14 h-14 bg-gray-100 dark:bg-[#222] rounded-xl flex-shrink-0 overflow-hidden'>
                          <img
                            src={product.image}
                            alt={product.name}
                            className='w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300'
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='font-semibold text-gray-800 dark:text-white text-sm line-clamp-1'>
                            {product.name}
                          </p>
                          <p className='text-[#138695] font-bold text-sm mt-0.5'>${product.new_price}</p>
                        </div>
                        <ArrowRight size={16} className='text-gray-400 group-hover:text-[#138695] transition-colors' />
                      </Link>
                    ))}
                  </div>

                  {/* Quick category links */}
                  <div className='mt-6 pt-5 border-t border-gray-100 dark:border-[#2a2a2a]'>
                    <p className='text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3'>
                      Browse by Category
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {['Men', 'Women', 'Kids'].map((cat) => (
                        <Link
                          key={cat}
                          to={`/${cat.toLowerCase()}s`}
                          onClick={onClose}
                          className='px-4 py-2 bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-[#138695] hover:text-white transition-colors duration-200'
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SearchOverlay
