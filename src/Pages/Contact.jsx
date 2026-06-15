import {Mail, MapPin, Phone} from 'lucide-react'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <div className='bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300'>
      <div className='max-w-7xl mx-auto items-center flex flex-col py-8 px-4 md:px-8 min-h-screen'>
        <motion.h2 
        initial={{opacity:0, scale:0.5}}
        whileInView={{opacity:1, scale:1}}
        transition={{duration:1, delay:0.2}}
        className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center'>Get in touch</motion.h2>
        <motion.p 
        initial={{opacity:0, scale:0.5}}
        whileInView={{opacity:1, scale:1}}
        transition={{duration:1.5, delay:0.4}}
        className='text-gray-600 dark:text-gray-300 text-center max-w-xl mb-12'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium maiores aut dolores quo asperiores iste, id consequatur dolorum deleniti quod!</motion.p>
        <div className='grid md:grid-flow-col gap-10'>
          {/* contact form */}
          <motion.div 
            initial={{opacity:0, scale:0.5}}
            whileInView={{opacity:1, scale:1}}
            transition={{duration:1.5, delay:0.4}}
          className='bg-white dark:bg-[#151515] shadow-xl rounded-lg p-8 md:p-12 max-w-xl md:w-[400px] border border-gray-200 dark:border-[#2a2a2a]'>
            <form className='flex flex-col space-y-6'>
              <div>
                <label htmlFor="name" className='block text-sm font-medium text-gray-900 dark:text-white'>Full Name</label>
                <input type="text" id='name' 
                className='mt-1 p-3 block w-full text-gray-900 dark:text-white border-2 border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] rounded-md shadow-sm sm:text-sm focus:border-[#138695] focus:outline-none transition-colors'
                placeholder='John Doe'
                />          
              </div>
              <div>
                <label htmlFor="email" className='block text-sm font-medium text-gray-900 dark:text-white'>Email Address</label>
                <input type="email" id='email' 
                className='mt-1 p-3 block w-full text-gray-900 dark:text-white border-2 border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] rounded-md shadow-sm sm:text-sm focus:border-[#138695] focus:outline-none transition-colors'
                placeholder='John.doe@example.com'
                />          
              </div>
              <div>
                <label htmlFor="message" className='block text-sm font-medium text-gray-900 dark:text-white'>Message</label>
                <textarea rows='4' id='message' 
                className='mt-1 p-3 block w-full text-gray-900 dark:text-white border-2 border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] rounded-md shadow-sm sm:text-sm focus:border-[#138695] focus:outline-none transition-colors'
                placeholder='Your message here...'
                />          
              </div>
              <button type='submit' className='bg-[#138695] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#0f6d7a] transition-colors duration-200 font-semibold'>Send Message</button>
            </form>
          </motion.div>
          {/* location and map */}
          <motion.div 
          initial={{opacity:0, scale:0.5}}
          whileInView={{opacity:1, scale:1}}
          transition={{duration:1.5, delay:0.4}}
          className='bg-white dark:bg-[#151515] shadow-xl rounded-lg p-8 md:p-12 max-w-3xl w-full flex flex-col items-center md:flex-row gap-7 space-y-6 md:space-y-0 md:space-x-8 border border-gray-200 dark:border-[#2a2a2a]'>
            <div className='flex-1'>
              <h3 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>Our Location</h3>
              <div className='text-gray-700 dark:text-gray-300 flex gap-2 items-start mb-4'>
                <MapPin className='text-[#138695] mt-1 flex-shrink-0' size={20} />
                <p>
                  06 Udham singh Nager, <br />
                  Khatima city, Uttarakhand State 262308
                </p>
              </div>
              <div className='text-gray-700 dark:text-gray-300 flex gap-2 items-center mb-4'>
                <Phone className='text-[#138695] flex-shrink-0' size={20} />
                <p>
                  (+91) 63960-96432
                </p>
              </div>
              <div className='text-gray-700 dark:text-gray-300 flex gap-2 items-center'>
                <Mail className='text-[#138695] flex-shrink-0' size={20} />
                <p>
                  contact@Nike.com
                </p>
              </div>
            </div>
            <div className='w-full md:w-auto'>
              {/* Responsive Google Map */}
              <div className='relative w-full h-64 md:w-[400px] lg:w-[500px] bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden'>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13972.93884708523!2d80.03578930409178!3d28.891372608386618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0525c71e927d1%3A0x9437f020df1ca8f3!2sBaguliya%2C%20Uttarakhand%20262308!5e0!3m2!1sen!2sin!4v1751166332966!5m2!1sen!2sin" 
                  className='absolute top-0 left-0 w-full h-full rounded-lg border-0'
                  allowFullScreen={true}
                  aria-hidden='false'
                  tabIndex={0}
                  loading='lazy'
                  title='Nike Store Location'
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
