import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo2.png'

const footerLinks = {
  Shop: [
    { label: 'Men', to: '/mens' },
    { label: 'Women', to: '/womens' },
    { label: 'Kids', to: '/kids' },
    { label: 'Sale', to: '/mens' },
  ],
  Help: [
    { label: 'FAQ', to: '/faq' },
    { label: 'Shipping & Returns', to: '/faq' },
    { label: 'Size Guide', to: '/faq' },
    { label: 'Track Order', to: '#' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '#' },
    { label: 'Contact', to: '/contact' },
    { label: 'Press', to: '#' },
  ],
}

const socialLinks = [
  { Icon: FaFacebook, label: 'Facebook', href: '#' },
  { Icon: FaSquareXTwitter, label: 'X / Twitter', href: '#' },
  { Icon: FaInstagram, label: 'Instagram', href: '#' },
  { Icon: FaYoutube, label: 'YouTube', href: '#' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const Footer = () => {
  return (
    <footer className='bg-gray-900 dark:bg-[#050505] text-gray-300 transition-colors duration-300' role='contentinfo' aria-label='Site footer'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8'
      >
        {/* Brand column */}
        <motion.div variants={itemVariants} className='col-span-1 sm:col-span-2 md:col-span-2 pr-8'>
          <div className='bg-gray-700 dark:bg-gray-800 rounded-lg inline-block p-2 mb-4'>
          <img src={Logo} alt='NikeStore' width={80} height={28} loading='lazy' className='max-w-[80px]' />
          </div>
          <p className='text-sm text-gray-400 leading-relaxed mb-6'>
            Discover the latest collection of Nike shoes, blending style and performance to keep you ahead in the game.
          </p>
          {/* Social icons */}
          <div className='flex gap-4'>
            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className='w-9 h-9 bg-gray-800 dark:bg-[#1a1a1a] hover:bg-[#138695] text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-colors duration-200'
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <motion.div key={title} variants={itemVariants}>
            <h3 className='text-white font-bold text-sm uppercase tracking-wider mb-5'>
              {title}
            </h3>
            <ul className='space-y-3'>
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className='text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <div className='border-t border-gray-800 dark:border-[#1a1a1a]'>
        <div className='max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500'>
          <p>&copy; {new Date().getFullYear()} Nike Shoes. All rights reserved.</p>
          <div className='flex gap-4'>
            <Link to='#' className='hover:text-gray-300 transition-colors'>Privacy</Link>
            <Link to='#' className='hover:text-gray-300 transition-colors'>Terms</Link>
            <Link to='#' className='hover:text-gray-300 transition-colors'>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
