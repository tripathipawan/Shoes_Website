/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import all_product from '../Utils/all_product'
import Item from './Item'
import SkeletonCard from './SkeletonCard'
import SEO from './SEO'
import { CURRENCY } from '../Utils/constants'

const PRODUCTS_PER_PAGE = 8

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const PRICE_FILTERS = [
  { label: 'All', value: 'all' },
  { label: `Under ${CURRENCY}50`, value: 'under50' },
  { label: `${CURRENCY}50–${CURRENCY}100`, value: '50to100' },
  { label: `Over ${CURRENCY}100`, value: 'over100' },
]

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Name: A – Z', value: 'name-az' },
]

const categoryLabel = (cat) => {
  if (cat === 'kid') return "Kids'"
  return `${cat.charAt(0).toUpperCase() + cat.slice(1)}'s`
}

const categoryDescription = {
  men: "Shop the latest men's Nike shoes — Air Max, Jordan, and more. Engineered for performance, built for the streets.",
  women: "Discover Nike women's shoes — from Air Max to Air Force 1. Style meets comfort in every step.",
  kid: "Nike kids' shoes built for play, learning, and growing. Durable, comfortable, and seriously cool.",
}

/* ─── Pagination component ─────────────────────────────── */
const Pagination = ({ current, total, onChange }) => {
  if (total <= 1) return null

  // Build page numbers with ellipsis
  const getPages = () => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    const pages = []
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '…', total)
    } else if (current >= total - 3) {
      pages.push(1, '…', total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '…', current - 1, current, current + 1, '…', total)
    }
    return pages
  }

  return (
    <nav
      className='flex items-center justify-center gap-1.5 mt-12 flex-wrap'
      aria-label='Pagination'
    >
      {/* Prev */}
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        aria-label='Previous page'
        className='w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#151515] text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#138695] hover:text-white hover:border-[#138695] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695]'
      >
        <ChevronLeft size={16} aria-hidden='true' />
      </button>

      {/* Pages */}
      {getPages().map((page, i) =>
        page === '…' ? (
          <span
            key={`ellipsis-${i}`}
            className='w-10 h-10 flex items-center justify-center text-gray-400 text-sm select-none'
            aria-hidden='true'
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onChange(page)}
            aria-label={`Page ${page}`}
            aria-current={current === page ? 'page' : undefined}
            className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695] ${
              current === page
                ? 'bg-[#138695] text-white border-[#138695] shadow-md'
                : 'bg-white dark:bg-[#151515] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-[#2a2a2a] hover:bg-[#138695]/10 hover:border-[#138695]/50'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        aria-label='Next page'
        className='w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#151515] text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#138695] hover:text-white hover:border-[#138695] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695]'
      >
        <ChevronRight size={16} aria-hidden='true' />
      </button>
    </nav>
  )
}

/* ─── Main ProductList ──────────────────────────────────── */
const ProductList = ({ category }) => {
  const [sortBy, setSortBy] = useState('default')
  const [priceFilter, setPriceFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  // Reset to page 1 whenever filter/sort/category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [priceFilter, sortBy, category])

  // Skeleton loader on category switch
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [category])

  // Scroll to top of product grid on page change
  const scrollToGrid = () => {
    const el = document.getElementById('product-grid-top')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    scrollToGrid()
  }

  const allFiltered = useMemo(() => {
    let products = all_product.filter((p) => p.category === category)

    if (priceFilter === 'under50') products = products.filter(p => p.new_price < 50)
    else if (priceFilter === '50to100') products = products.filter(p => p.new_price >= 50 && p.new_price <= 100)
    else if (priceFilter === 'over100') products = products.filter(p => p.new_price > 100)

    if (sortBy === 'price-asc') products = [...products].sort((a, b) => a.new_price - b.new_price)
    else if (sortBy === 'price-desc') products = [...products].sort((a, b) => b.new_price - a.new_price)
    else if (sortBy === 'name-az') products = [...products].sort((a, b) => a.name.localeCompare(b.name))

    return products
  }, [category, sortBy, priceFilter])

  const totalPages = Math.ceil(allFiltered.length / PRODUCTS_PER_PAGE)
  const paginated = allFiltered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const label = categoryLabel(category)
  const seoDesc = categoryDescription[category] || `Browse our ${label} shoe collection at NikeStore.`
  const allCategoryCount = all_product.filter((p) => p.category === category).length

  return (
    <>
      <SEO
        title={`${label} Shoes Collection`}
        description={seoDesc}
        canonical={`/${category === 'kid' ? 'kids' : category + 's'}`}
      />

      <div className='bg-white dark:bg-[#0a0a0a] min-h-[60vh] transition-colors duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16'>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center mb-8'
          >
            <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white capitalize'>
              {label} Collection
            </h1>
            <p className='mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-2'>
              {seoDesc}
            </p>
            <p className='mt-2 text-sm text-[#138695] font-semibold'>
              {loading ? allCategoryCount : allFiltered.length} styles found
            </p>
          </motion.div>

          {/* ── Filter & Sort Bar ── */}
          <motion.div
            id='product-grid-top'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8'
          >
            {/* Price filters */}
            <div
              className='flex flex-wrap gap-2'
              role='group'
              aria-label='Filter by price'
            >
              {PRICE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setPriceFilter(f.value)}
                  aria-pressed={priceFilter === f.value}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695] ${
                    priceFilter === f.value
                      ? 'bg-[#138695] text-white border-[#138695]'
                      : 'bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-[#2a2a2a] hover:border-[#138695]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort + per-page info */}
            <div className='flex items-center gap-3 self-end sm:self-auto'>
              {!loading && allFiltered.length > 0 && (
                <p className='text-xs text-gray-400 whitespace-nowrap hidden sm:block'>
                  Page {currentPage} of {totalPages}
                </p>
              )}
              <div className='relative'>
                <label htmlFor='sort-select' className='sr-only'>Sort products</label>
                <select
                  id='sort-select'
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='appearance-none bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-lg px-3 py-2 pr-7 focus:outline-none focus:border-[#138695] focus:ring-2 focus:ring-[#138695]/20 cursor-pointer'
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={13} className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' aria-hidden='true' />
              </div>
            </div>
          </motion.div>

          {/* ── Skeleton / Empty / Grid ── */}
          {loading ? (
            <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
              {Array(PRODUCTS_PER_PAGE).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : allFiltered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center py-20'
            >
              <p className='text-lg font-medium text-gray-500 dark:text-gray-400'>
                No products found for this filter.
              </p>
              <button
                onClick={() => setPriceFilter('all')}
                className='mt-4 text-[#138695] underline text-sm hover:text-[#0f6a77] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695] rounded'
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`${priceFilter}-${sortBy}-${currentPage}`}
                  variants={containerVariants}
                  initial='hidden'
                  animate='show'
                  exit={{ opacity: 0 }}
                  className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6'
                >
                  {paginated.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Item product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* ── Pagination ── */}
              <Pagination
                current={currentPage}
                total={totalPages}
                onChange={handlePageChange}
              />

              {/* Page summary on mobile */}
              {totalPages > 1 && (
                <p className='text-center text-xs text-gray-400 mt-3 sm:hidden'>
                  Page {currentPage} of {totalPages} · {allFiltered.length} products
                </p>
              )}
            </>
          )}

        </div>
      </div>
    </>
  )
}

export default ProductList
