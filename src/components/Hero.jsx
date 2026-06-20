import { useState } from 'react';
import Shoe1 from '../assets/Shoes1.png';
import Shoe2 from '../assets/Shoes2.png';
import Shoe3 from '../assets/Shoes3.png';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { Link } from 'react-router-dom';

const SlideRight = (delay) => ({
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay, ease: easeInOut },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.2, ease: easeInOut },
  },
})

// BUG-06 fixed: old_price added to each shoe
const ShoesData = [
  {
    id: 1,
    image: Shoe1,
    title: 'Jordan Luka 3 PF',
    subtitle:
      'Engineered for elite on-court performance, the Jordan Luka 3 PF delivers explosive cushioning and lockdown support for every drive.',
    price: '$40',
    old_price: '$65',
    modal: 'Sports',
    bgColor: '#138695',
    link: '/mens',
  },
  {
    id: 2,
    image: Shoe2,
    title: 'Nike G.T. Cut 3 EP',
    subtitle:
      'Built for speed and precision, the G.T. Cut 3 EP features full-length Air Zoom Turbo units for unstoppable court agility.',
    price: '$100',
    old_price: '$140',
    modal: 'Running',
    bgColor: '#727272',
    link: '/mens',
  },
  {
    id: 3,
    image: Shoe3,
    title: 'Nike G.T. Cut Academy EP',
    subtitle:
      'A refined version of the G.T. Cut line, crafted for players who demand court-feel responsiveness and dynamic stability.',
    price: '$100',
    old_price: '$130',
    modal: 'Sports',
    bgColor: '#698869',
    link: '/mens',
  },
]

const Hero = () => {
  const [activeData, setActiveData] = useState(ShoesData[0])

  return (
    <motion.section
      initial={{ backgroundColor: activeData.bgColor }}
      animate={{ backgroundColor: activeData.bgColor }}
      transition={{ duration: 0.8 }}
      className='bg-brandDark text-white pt-20'
      aria-label='Featured shoes hero'
    >
      <div className='container grid grid-cols-1 md:grid-cols-2 min-h-[605px]'>
        {/* Text info */}
        <div className='flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px] text-white order-2 md:order-1'>
          <div className='space-y-5 text-center md:text-left'>
            <AnimatePresence mode='wait'>
              <motion.h1
                key={activeData.id + '-h1'}
                variants={SlideRight(0.2)}
                initial='hidden'
                animate='show'
                exit='exit'
                className='text-3xl lg:text-6xl xl:text-7xl font-bold font-handwriting text-shadow'
              >
                {activeData.title}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              <motion.p
                key={activeData.id + '-p'}
                variants={SlideRight(0.4)}
                initial='hidden'
                animate='show'
                exit='exit'
                className='text-sm leading-loose text-white/80'
              >
                {activeData.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* BUG-05 fixed: Button links to category */}
            <AnimatePresence mode='wait'>
              <Link to={activeData.link} key={activeData.id + '-btn'}>
                <motion.button
                  variants={SlideRight(0.6)}
                  initial='hidden'
                  animate='show'
                  exit='exit'
                  style={{ color: activeData.bgColor }}
                  className='px-6 py-3 bg-white inline-block font-semibold rounded-md hover:scale-105 transition-transform'
                  aria-label={`Shop ${activeData.title}`}
                >
                  Shop Now
                </motion.button>
              </Link>
            </AnimatePresence>

            {/* Separator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='flex items-center justify-center md:justify-start gap-4 !mt-10'
            >
              <div className='w-20 h-[1px] bg-white' />
              <p className='text-sm'>TOP RECOMMENDATION</p>
              <div className='w-20 h-[1px] bg-white' />
            </motion.div>

            {/* Image switcher */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='grid grid-cols-3 gap-10'
              role='tablist'
              aria-label='Choose shoe style'
            >
              {ShoesData.map((data) => (
                <button
                  key={data.id}
                  role='tab'
                  aria-selected={activeData.id === data.id}
                  aria-label={`Select ${data.title}`}
                  onClick={() => setActiveData(data)}
                  className='cursor-pointer space-y-3 hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md'
                >
                  <div className='flex justify-center'>
                    <img
                      src={data.image}
                      alt={data.title}
                      width={80}
                      height={80}
                      loading='lazy'
                      className={`w-[80px] img-shadow ${
                        activeData.id === data.id ? 'opacity-100 scale-110' : 'opacity-50'
                      }`}
                    />
                  </div>
                  {/* BUG-06 fixed: show old_price with strikethrough, price as current */}
                  <div className='text-center !mt-6 space-y-1'>
                    <p className='text-base line-through opacity-50'>{data.old_price}</p>
                    <p className='text-xl font-bold'>{data.price}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Hero image */}
        <div className='flex flex-col justify-end items-center relative order-1 md:order-2'>
          <AnimatePresence mode='wait'>
            <motion.img
              key={activeData.id + '-img'}
              // BUG-02 fixed: was oapcity
              initial={{ opacity: 0, x: 100, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: -35 }}
              exit={{ opacity: 0, x: -100, transition: { duration: 0.4 } }}
              transition={{ duration: 0.8, ease: easeInOut }}
              src={activeData.image}
              alt={activeData.title}
              width={600}
              height={600}
              fetchPriority='high'
              loading='eager'
              className='w-[220px] sm:w-[280px] md:w-[360px] lg:w-[480px] xl:w-[600px] img-shadow lg:absolute lg:top-[10%] z-10'
            />
          </AnimatePresence>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeData.id + '-modal'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              aria-hidden='true'
              className='text-white/5 text-[70px] sm:text-[120px] md:text-[200px] lg:text-[280px] xl:text-[300px] font-extrabold absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hidden sm:block select-none pointer-events-none'
            >
              {activeData.modal}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}

export default Hero
