import { useState } from 'react'
import { Mail, MapPin, Phone, CheckCircle, Clock, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Full name is required'
    if (!formData.email.trim()) e.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Please enter a valid email'
    if (!formData.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    if (errors[e.target.id]) setErrors({ ...errors, [e.target.id]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) { setErrors(v); return }
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setErrors({})
  }

  return (
    <>
      <SEO
        title='Contact Us'
        description='Get in touch with NikeStore. Reach out for support, questions, or feedback about your order.'
        canonical='/contact'
      />

      <div className='bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300'>

        {/* ── Page Header ── */}
        <div className='py-12 px-4 text-center'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base sm:text-lg'
          >
            Have a question about your order, sizing, or our products? We&apos;re here to help.
            Send us a message and we&apos;ll respond within 24 hours.
          </motion.p>
        </div>

        {/* ── Quick Info Cards ── */}
        <div className='max-w-6xl mx-auto px-4 mb-10'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {[
              { icon: Clock, title: 'Response Time', desc: 'Within 24 hours', color: 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' },
              { icon: Phone, title: 'Call Us', desc: '(+91) 63960-96432', color: 'bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400' },
              { icon: Mail, title: 'Email Us', desc: 'contact@nikestore.com', color: 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className='bg-white dark:bg-[#151515] rounded-xl p-5 border border-gray-200 dark:border-[#2a2a2a] flex items-center gap-4'
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                  <card.icon size={22} aria-hidden='true' />
                </div>
                <div>
                  <p className='font-semibold text-gray-900 dark:text-white text-sm'>{card.title}</p>
                  <p className='text-gray-500 dark:text-gray-400 text-xs mt-0.5'>{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Main Content: Form + Location ── */}
        <div className='max-w-6xl mx-auto px-4 pb-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

            {/* ── Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-white dark:bg-[#151515] rounded-2xl shadow-sm border border-gray-200 dark:border-[#2a2a2a] p-6 sm:p-8'
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 bg-[#138695]/10 rounded-xl flex items-center justify-center'>
                  <MessageSquare size={20} className='text-[#138695]' aria-hidden='true' />
                </div>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white'>Send a Message</h2>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='flex flex-col items-center justify-center py-12 gap-4 text-center'
                  role='status'
                  aria-live='polite'
                >
                  <div className='w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center'>
                    <CheckCircle size={32} className='text-green-500' aria-hidden='true' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white'>Message Sent!</h3>
                  <p className='text-gray-500 dark:text-gray-400 text-sm max-w-xs'>
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className='mt-2 text-[#138695] font-semibold text-sm hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695] rounded'
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className='space-y-5'>
                  {/* Name */}
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'>
                      Full Name <span className='text-red-500' aria-hidden='true'>*</span>
                    </label>
                    <input
                      type='text'
                      id='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-required='true'
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      placeholder='John Doe'
                      autoComplete='name'
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#138695]/20 ${
                        errors.name
                          ? 'border-red-400 dark:border-red-600'
                          : 'border-gray-200 dark:border-[#2a2a2a] focus:border-[#138695]'
                      }`}
                    />
                    {errors.name && (
                      <p id='name-error' role='alert' className='mt-1.5 text-xs text-red-500'>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'>
                      Email Address <span className='text-red-500' aria-hidden='true'>*</span>
                    </label>
                    <input
                      type='email'
                      id='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required='true'
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder='john.doe@example.com'
                      autoComplete='email'
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#138695]/20 ${
                        errors.email
                          ? 'border-red-400 dark:border-red-600'
                          : 'border-gray-200 dark:border-[#2a2a2a] focus:border-[#138695]'
                      }`}
                    />
                    {errors.email && (
                      <p id='email-error' role='alert' className='mt-1.5 text-xs text-red-500'>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor='message' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'>
                      Message <span className='text-red-500' aria-hidden='true'>*</span>
                    </label>
                    <textarea
                      id='message'
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-required='true'
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      placeholder='Your message here...'
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#138695]/20 resize-none ${
                        errors.message
                          ? 'border-red-400 dark:border-red-600'
                          : 'border-gray-200 dark:border-[#2a2a2a] focus:border-[#138695]'
                      }`}
                    />
                    {errors.message && (
                      <p id='message-error' role='alert' className='mt-1.5 text-xs text-red-500'>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type='submit'
                    className='w-full bg-[#138695] text-white py-3.5 rounded-xl font-semibold hover:bg-[#0f6d7a] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#138695] focus:ring-offset-2'
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* ── Location & Map ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='flex flex-col gap-6'
            >
              {/* Info card */}
              <div className='bg-white dark:bg-[#151515] rounded-2xl shadow-sm border border-gray-200 dark:border-[#2a2a2a] p-6 sm:p-8'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>Our Location</h2>
                <address className='not-italic space-y-5'>
                  <div className='flex gap-3 items-start'>
                    <div className='w-10 h-10 bg-[#138695]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <MapPin size={18} className='text-[#138695]' aria-hidden='true' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900 dark:text-white text-sm mb-0.5'>Address</p>
                      <p className='text-gray-500 dark:text-gray-400 text-sm leading-relaxed'>
                        06 Udham Singh Nager,<br />
                        Khatima City, Uttarakhand 262308
                      </p>
                    </div>
                  </div>

                  <div className='flex gap-3 items-center'>
                    <div className='w-10 h-10 bg-[#138695]/10 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <Phone size={18} className='text-[#138695]' aria-hidden='true' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900 dark:text-white text-sm mb-0.5'>Phone</p>
                      <a
                        href='tel:+916396096432'
                        className='text-gray-500 dark:text-gray-400 text-sm hover:text-[#138695] transition-colors'
                      >
                        (+91) 63960-96432
                      </a>
                    </div>
                  </div>

                  <div className='flex gap-3 items-center'>
                    <div className='w-10 h-10 bg-[#138695]/10 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <Mail size={18} className='text-[#138695]' aria-hidden='true' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900 dark:text-white text-sm mb-0.5'>Email</p>
                      <a
                        href='mailto:contact@nikestore.com'
                        className='text-gray-500 dark:text-gray-400 text-sm hover:text-[#138695] transition-colors break-all'
                      >
                        contact@nikestore.com
                      </a>
                    </div>
                  </div>

                  <div className='flex gap-3 items-center'>
                    <div className='w-10 h-10 bg-[#138695]/10 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <Clock size={18} className='text-[#138695]' aria-hidden='true' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900 dark:text-white text-sm mb-0.5'>Business Hours</p>
                      <p className='text-gray-500 dark:text-gray-400 text-sm'>
                        Mon – Sat: 9:00 AM – 6:00 PM
                      </p>
                    </div>
                  </div>
                </address>
              </div>

              {/* Map — fully responsive with aspect-ratio trick */}
              <div className='bg-white dark:bg-[#151515] rounded-2xl shadow-sm border border-gray-200 dark:border-[#2a2a2a] overflow-hidden'>
                <div className='relative w-full' style={{ paddingBottom: '56.25%' /* 16:9 */ }}>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13972.93884708523!2d80.03578930409178!3d28.891372608386618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0525c71e927d1%3A0x9437f020df1ca8f3!2sBaguliya%2C%20Uttarakhand%20262308!5e0!3m2!1sen!2sin!4v1751166332966!5m2!1sen!2sin'
                    className='absolute inset-0 w-full h-full border-0'
                    allowFullScreen={true}
                    loading='lazy'
                    title='NikeStore location on Google Maps'
                    tabIndex={0}
                    aria-label='Google Maps showing NikeStore location in Khatima, Uttarakhand'
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
