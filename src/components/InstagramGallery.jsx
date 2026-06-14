import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

const galleryImages = [
  {
    id: 1,
    src: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ee277c7b-7765-4b8a-bbc6-3393ea7c0631/AIR+MAX+270.png',
    alt: 'Nike Air Max 270',
    likes: '2.4K',
  },
  {
    id: 2,
    src: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/24d390b5-d2d2-443f-b545-59535c5b0cd6/W+NIKE+AIR+MAX+1.png',
    alt: 'Nike Air Max 1 Women',
    likes: '1.8K',
  },
  {
    id: 3,
    src: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5de54772-b44b-4170-8ae6-214a0b131afc/W+AF1+SHADOW.png',
    alt: 'Air Force 1 Shadow',
    likes: '3.1K',
  },
  {
    id: 4,
    src: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fe8beaa0-a4f9-41a4-9119-5fb41c4bb44a/AIR+VAPORMAX+2023+FK.png',
    alt: 'VaporMax 2023',
    likes: '4.2K',
  },
  {
    id: 5,
    src: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e94db489-0651-4f85-bc85-6584b7e1260d/AIR+MAX+PLUS+DRIFT.png',
    alt: 'Air Max Plus Drift',
    likes: '1.5K',
  },
  {
    id: 6,
    src: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fekcgtpf5kfhqftwjn3m/NIKE+AIR+MAX+270+%28PS%29.png',
    alt: 'Nike Air Max 270 Kids',
    likes: '2.9K',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

const InstagramGallery = () => {
  return (
    <section className='py-20 bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-300'>
      <div className='container'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='flex flex-col items-center text-center mb-12'
        >
          <div className='flex items-center gap-2 mb-3'>
            <Instagram size={20} className='text-[#138695]' />
            <span className='text-[#138695] font-semibold uppercase tracking-widest text-sm'>
              @nikeshoes
            </span>
          </div>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white'>
            #JustDoIt Gallery
          </h2>
          <p className='text-gray-500 dark:text-gray-400 mt-3 max-w-lg'>
            Real people, real style. Follow us on Instagram and share your look with <span className='text-[#138695] font-semibold'>#JustDoIt</span>
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3'
        >
          {galleryImages.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className='group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] cursor-pointer'
            >
              <img
                src={item.src}
                alt={item.alt}
                className='w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500'
              />

              {/* Hover overlay */}
              <div className='absolute inset-0 bg-[#138695]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2'>
                <Instagram size={24} className='text-white' />
                <span className='text-white font-bold text-sm'>❤ {item.likes}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-center mt-10'
        >
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 border-2 border-[#138695] text-[#138695] font-semibold px-8 py-3 rounded-full hover:bg-[#138695] hover:text-white transition-colors duration-300'
          >
            <Instagram size={18} />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default InstagramGallery
