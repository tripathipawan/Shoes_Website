import { useContext } from 'react'
import { motion } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'
import Item from './Item'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* eslint-disable react/prop-types */
const RelatedProducts = ({ currentProduct }) => {
  const { all_product } = useContext(ShopContext)

  const related = all_product
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4)

  if (related.length === 0) return null

  const categoryPath = currentProduct.category === 'kid' ? '/kids' : `/${currentProduct.category}s`

  return (
    <section className='mt-20 pb-20' aria-labelledby='related-heading'>
      <div className='flex items-center justify-between mb-8'>
        <h2 id='related-heading' className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white'>
          You May Also Like
        </h2>
        <Link
          to={categoryPath}
          className='hidden md:flex items-center gap-2 text-[#138695] font-semibold text-sm hover:gap-4 transition-all duration-300'
          aria-label={`View all ${currentProduct.category} shoes`}
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>
      <motion.div
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'
      >
        {related.map((product) => (
          <motion.div
            key={product.id}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            <Item product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default RelatedProducts
