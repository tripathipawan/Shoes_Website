import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

const DarkMode = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })

  // Apply dark class to <html> — keep inside useEffect, not render body
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className='relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695]'
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
            aria-hidden='true'
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
            aria-hidden='true'
          >
            <Sun size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default DarkMode
