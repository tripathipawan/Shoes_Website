import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Shoe1 from '../assets/Shoes1.png'
import SEO from '../components/SEO'

const NotFound = () => (
  <>
    <SEO title='404 — Page Not Found' description='The page you are looking for does not exist.' noIndex={true} />
    <div className='min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col items-center justify-center px-4 text-center transition-colors duration-300'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
        className='relative select-none'
      >
        <p className='text-[180px] md:text-[240px] font-extrabold text-gray-100 dark:text-[#1a1a1a] leading-none' aria-hidden='true'>
          404
        </p>
        <motion.img
          src={Shoe1}
          alt='Lost shoe floating in the air'
          width={288}
          height={288}
          animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-72 drop-shadow-2xl'
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3'>
          Oops! Page Not Found
        </h1>
        <p className='text-gray-500 dark:text-gray-400 max-w-md mb-8'>
          Looks like this page ran off without its shoes. Head back home and find your perfect pair.
        </p>
        <Link to='/'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='inline-flex items-center gap-2 bg-[#138695] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#0f6a77] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#138695] focus:ring-offset-2'
          >
            <ArrowLeft size={18} aria-hidden='true' />
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  </>
)

export default NotFound
