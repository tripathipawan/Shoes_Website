import {Mail, MapPin, Phone} from 'lucide-react'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <div className='dark:bg-[#00042b] bg-[#a1e1ff]'>
      <div className='max-w-7xl mx-auto items-center flex flex-col py-8 px-4 md:px-8 min-h-screen'>
        <motion.h2 
        initial={{opacity:0, scale:0.5}}
        whileInView={{opacity:1, scale:1}}
        transition={{duration:1, delay:0.2}}
        className='text-3xl md:text-4xl font-bold text-[#032121] mb-4 text-center dark:text-[#6cf3ff]'>Get in touch</motion.h2>
        <motion.p 
        initial={{opacity:0, scale:0.5}}
        whileInView={{opacity:1, scale:1}}
        transition={{duration:1.5, delay:0.4}}
        className='text-black dark:text-[#6cf3ff] text-center max-w-xl mb-12'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium maiores aut dolores quo asperiores iste, id consequatur dolorum deleniti quod!</motion.p>
        <div className='grid md:grid-flow-col gap-10'>
          {/* contact form */}
          <motion.div 
            initial={{opacity:0, scale:0.5}}
            whileInView={{opacity:1, scale:1}}
            transition={{duration:1.5, delay:0.4}}
          className='bg-[#007d89] shadow-xl shadow-[#132525] rounded-lg p-8 md:p-12 max-w-xl md:w-[400px]'>
            <form className='flex flex-col space-y-6'>
              <div>
                <label htmlFor="name" className='blcok text-sm font-medium text-[#fff]'>Full Name</label>
                <input type="text" id='name' 
                className='mt-1 p-3 block w-full text-white border-2 border-[#33CCCC] bg-gray-900 rounded-md shadow-sm sm:text-sm'
                placeholder='John Doe'
                />          
              </div>
              <div>
                <label htmlFor="name" className='blcok text-sm font-medium text-[#fff]'>Email Address</label>
                <input type="email" id='email' 
                className='mt-1 p-3 block w-full text-white border-2 border-[#33CCCC] bg-gray-900 rounded-md shadow-sm sm:text-sm'
                placeholder='John.doe@example.com'
                />          
              </div>
              <div>
                <label htmlFor="name" className='blcok text-sm font-medium text-[#fff]'>Message</label>
                <textarea rows='4' id='message' 
                className='mt-1 p-3 block w-full text-white border-2 border-[#33CCCC] bg-gray-900 rounded-md shadow-sm sm:text-sm'
                placeholder='Your message here...'
                />          
              </div>
              <button className='bg-[#a1e1ff] text-black py-2 px-4 rounded-md shadow-md hover:bg-black hover:text-[#a1e1ff]'>Send Message</button>
            </form>
          </motion.div>
          {/* location and map */}
          <motion.div 
          initial={{opacity:0, scale:0.5}}
          whileInView={{opacity:1, scale:1}}
          transition={{duration:1.5, delay:0.4}}
          className='bg-[#007d89] shadow-xl shadow-[#132525] rounded-lg p-8 md:p-12 max-w-3xl w-full flex flex-col items-center md:flex-row gap-7 space-y-6 md:space-y-0 md:space-x-8'>
            <div className='flex-1'>
              <h3 className='text-2xll font-semibold mb-4 text-white'>Our Location</h3>
              <div className='text-white flex gap-2 items-center'>
                <MapPin fill='#33CCCC' className='text-gray-950' />
                <p>
                  06 Udham singh Nager, <br />
                  Khatima city, Uttarakhand State 262308
                </p>
              </div>
              <div className='text-gray-950 flex gap-2 items-center'>
                <Phone fill='#33CCCC' className='text-gray-950' />
                <p className='text-white mt-4'>
                  phone: (+91) 63960-96432
                </p>
              </div>
              <div className='text-gray-950 flex gap-2 items-center'>
                <Mail fill='#33CCCC' className='text-gray-900' />
                <p className='text-white'>
                  Email: contact@Nike.com
                </p>
              </div>
            </div>
            <div>
              {/* placeholder for google map */}
              <div className='w-full h-64 bg-gray-300 rounded-lg'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13972.93884708523!2d80.03578930409178!3d28.891372608386618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0525c71e927d1%3A0x9437f020df1ca8f3!2sBaguliya%2C%20Uttarakhand%20262308!5e0!3m2!1sen!2sin!4v1751166332966!5m2!1sen!2sin" className='w-full h-full rounded-lg'
                width="600" 
                height="450" 
                allowFullScreen=""
                aria-hidden='false'
                tabIndex='0'
                loading='lazy'></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
