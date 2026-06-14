import Hero from '../components/Hero'
import StatsMarquee from '../components/StatsMarquee'
import NewArrivals from '../components/NewArrivals'
import PopularProducts from '../components/PopularProducts'
import ShopByCategory from '../components/ShopByCategory'
import SpecialOffer from '../components/SpecialOffer'
import WhyChooseUs from '../components/WhyChooseUs'
import AboutStats from '../components/AboutStats'
import Testimonials from '../components/Testimonials'
import InstagramGallery from '../components/InstagramGallery'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div className='bg-white dark:bg-[#0a0a0a] transition-colors duration-300'>
      <Hero />
      <StatsMarquee />
      <NewArrivals />
      <ShopByCategory />
      <PopularProducts />
      <SpecialOffer />
      <WhyChooseUs />
      <AboutStats />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </div>
  )
}

export default Home
