import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    label: 'Men',
    link: '/mens',
    image:
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ee277c7b-7765-4b8a-bbc6-3393ea7c0631/AIR+MAX+270.png',
    description: 'Performance meets style',
    count: '120+ Styles',
    accent: '#138695',
  },
  {
    label: 'Women',
    link: '/womens',
    image:
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/24d390b5-d2d2-443f-b545-59535c5b0cd6/W+NIKE+AIR+MAX+1.png',
    description: 'Designed for her',
    count: '90+ Styles',
    accent: '#e85d8a',
  },
  {
    label: 'Kids',
    link: '/kids',
    image:
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fekcgtpf5kfhqftwjn3m/NIKE+AIR+MAX+270+%28PS%29.png',
    description: 'Built for play',
    count: '50+ Styles',
    accent: '#f59e0b',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const ShopByCategory = () => {
  return (
    <section className='py-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300'>
      <div className='container'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-14'
        >
          <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>
            Browse By
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2'>
            Shop by Category
          </h2>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-3 gap-6'
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.label}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className='group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg'
            >
              <Link to={cat.link}>
                {/* Background */}
                <div className='h-80 md:h-96 bg-gray-100 dark:bg-[#1a1a1a] relative overflow-hidden'>
                  {/* Gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 group-hover:from-black/80 transition-all duration-500' />

                  {/* Colored accent circle */}
                  <div
                    className='absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700'
                    style={{ backgroundColor: cat.accent }}
                  />

                  {/* Product image */}
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className='h-full w-full object-contain p-8 group-hover:scale-110 transition-transform duration-700'
                  />

                  {/* Content overlay */}
                  <div className='absolute bottom-0 left-0 right-0 z-20 p-6'>
                    <p className='text-white/70 text-sm mb-1'>{cat.count}</p>
                    <h3 className='text-white text-3xl font-bold'>{cat.label}</h3>
                    <p className='text-white/80 text-sm mt-1'>{cat.description}</p>
                    <div className='flex items-center gap-2 mt-3 text-white font-semibold text-sm translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
                      Shop Now <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ShopByCategory
