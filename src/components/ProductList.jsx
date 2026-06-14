/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import all_product from '../Utils/all_product'
import Item from './Item'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const ProductList = (props) => {
  const filtered = all_product.filter((product) => product.category === props.category)

  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8 bg-white dark:bg-[#0a0a0a] min-h-[60vh] transition-colors duration-300'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center font-serif capitalize'>
          {props.category === 'kid' ? 'Kids' : props.category}&rsquo;s Collection
        </h2>
        <p className='text-center mt-3 md:px-56 text-gray-500 dark:text-gray-400'>
          Browse our top Nike picks. Click any shoe to see full details and add it to your cart.
        </p>
        <p className='text-center mt-2 text-sm text-[#138695] font-semibold'>
          {filtered.length} styles found
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='show'
        className='mt-10 grid grid-cols-2 gap-x-6 gap-y-10 px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
      >
        {filtered.map((product) => (
          <motion.div key={product.id} variants={itemVariants} whileHover={{ scale: 1.03 }}>
            <Item product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ProductList
