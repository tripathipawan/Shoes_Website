import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NavbarMenu } from './Navbar'
import { X } from 'lucide-react'

// eslint-disable-next-line react/prop-types
const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
  return (
    <AnimatePresence>
      {showMenu && (
        <>
          {/* Backdrop */}
          <motion.div
            key='backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowMenu(false)}
            className='fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden'
          />

          {/* Drawer */}
          <motion.div
            key='drawer'
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='fixed bottom-0 top-0 left-0 z-30 flex h-screen w-[75%] max-w-xs flex-col justify-between bg-white dark:bg-[#0d0d0d] px-8 pb-6 pt-10 text-black dark:text-white shadow-2xl rounded-r-2xl md:hidden'
          >
            {/* Close button */}
            <button
              onClick={() => setShowMenu(false)}
              className='absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors'
              aria-label='Close menu'
            >
              <X size={24} />
            </button>

            <div>
              {/* FEAT-08: Replace fake user info with brand message */}
              <div className='flex items-center justify-start gap-3 mb-10'>
                <div className='w-12 h-12 bg-[#138695]/10 rounded-full flex items-center justify-center flex-shrink-0' aria-hidden='true'>
                  <span className='text-2xl'>👟</span>
                </div>
                <div>
                  <p className='font-bold text-lg text-gray-900 dark:text-white'>Step Into Style</p>
                  <p className='text-xs text-gray-400'>Nike Exclusive Collection</p>
                </div>
              </div>

              {/* Nav links */}
              <nav>
                <ul className='space-y-1'>
                  {NavbarMenu.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07 }}
                    >
                      <Link
                        to={item.link}
                        onClick={() => setShowMenu(false)}
                        className='flex items-center gap-3 text-base font-semibold py-3 px-3 rounded-xl uppercase hover:bg-[#138695]/10 hover:text-[#138695] transition-colors duration-200'
                      >
                        {item.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            <p className='text-gray-400 text-xs'>Built with ❤️ for sneaker lovers</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ResponsiveMenu
