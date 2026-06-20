import Navbar from '../components/Navbar'
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
import SEO from '../components/SEO'

const Home = () => (
  <>
    <SEO
      title='Nike Shoes — Just Do It'
      description='Shop the latest Nike sneakers — Air Max, Jordan, Air Force 1 and more. Free shipping on orders over $100. 100% authentic products.'
      canonical='/'
    />

    {/* GEO: Organization + WebSite JSON-LD — Sitelinks Search Box eligibility */}
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'NikeStore',
          url: 'https://nikestore.vercel.app',
          logo: {
            '@type': 'ImageObject',
            url: 'https://nikestore.vercel.app/logo1.png',
            width: 512,
            height: 512,
          },
          description: 'Shop authentic Nike shoes — Air Max, Jordan, and more. Free shipping on orders over $100.',
          foundingYear: 1990,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-63960-96432',
            contactType: 'customer service',
            availableLanguage: 'English',
          },
          sameAs: [
            'https://www.facebook.com',
            'https://www.instagram.com',
            'https://twitter.com',
          ],
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: '40',
            highPrice: '200',
            offerCount: '44',
          },
        }),
      }}
    />

    {/* Home uses its own Navbar (transparent-on-scroll), not the Layout Navbar */}
    <Navbar />

    <main id='main-content' className='bg-white dark:bg-[#0a0a0a] transition-colors duration-300'>
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
    </main>
  </>
)

export default Home
