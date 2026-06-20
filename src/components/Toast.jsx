import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Check } from 'lucide-react'

const Toast = () => {
  const { toast } = useContext(ShopContext)
  return (
    <div
      className='fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none'
      role='status'
      aria-live='polite'
      aria-atomic='true'
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.message}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className='flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-3 rounded-full shadow-2xl text-sm font-medium'
          >
            <Check size={16} className='text-[#138695] flex-shrink-0' />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Toast
