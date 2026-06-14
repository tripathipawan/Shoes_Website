import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

const DarkMode = () => {
  const [theme, setTheme] = React.useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })

  const element = document.documentElement

  React.useEffect(() => {
    if (theme === 'dark') {
      element.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      element.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className='relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] overflow-hidden cursor-pointer'
    >
      <AnimatePresence mode='wait' initial={false}>
        {isDark ? (
          <motion.span
            key='moon'
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='absolute text-yellow-400'
          >
            <Moon size={18} />
          </motion.span>
        ) : (
          <motion.span
            key='sun'
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='absolute text-gray-700'
          >
            <Sun size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default DarkMode
