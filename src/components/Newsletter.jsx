import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className='py-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='max-w-2xl mx-auto text-center'
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className='w-16 h-16 bg-[#138695]/10 rounded-2xl flex items-center justify-center mx-auto mb-6'
          >
            <Mail size={28} className='text-[#138695]' />
          </motion.div>

          <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>
            Stay in the Loop
          </span>
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-3'>
            Join the Nike Club
          </h2>
          <p className='text-gray-500 dark:text-gray-400 mb-8'>
            Be the first to hear about new drops, exclusive deals, and style inspiration. No spam, ever.
          </p>

          <AnimatePresence mode='wait'>
            {submitted ? (
              <motion.div
                key='success'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className='flex flex-col items-center gap-3 py-6'
              >
                <CheckCircle size={48} className='text-green-500' />
                <p className='text-green-600 dark:text-green-400 font-semibold text-lg'>
                  You&rsquo;re in! Check your inbox soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className='text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline mt-1'
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key='form'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className='flex flex-col sm:flex-row gap-3'
              >
                <div className='flex-1 relative'>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder='Enter your email address'
                    className='w-full h-14 px-5 rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#151515] text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#138695] transition-all duration-200'
                    aria-label='Email address'
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type='submit'
                  className='h-14 px-8 bg-[#138695] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#0f6a77] transition-colors duration-200 whitespace-nowrap'
                >
                  Subscribe <ArrowRight size={18} />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-red-500 text-sm mt-2'
            >
              {error}
            </motion.p>
          )}

          <p className='text-gray-400 text-xs mt-4'>
            By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
