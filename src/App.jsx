import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Toast from './components/Toast'
import BackToTop from './components/BackToTop'

// PROMPT 2: Code splitting — all pages are lazy-loaded
const Home = lazy(() => import('./Pages/Home'))
const Contact = lazy(() => import('./Pages/Contact'))
const Cart = lazy(() => import('./Pages/Cart'))
const Wishlist = lazy(() => import('./Pages/Wishlist'))
const Checkout = lazy(() => import('./Pages/Checkout'))
const OrderSuccess = lazy(() => import('./Pages/OrderSuccess'))
const About = lazy(() => import('./Pages/About'))
const FAQ = lazy(() => import('./Pages/FAQ'))
const ProductList = lazy(() => import('./components/ProductList'))
const SingleProduct = lazy(() => import('./components/SingleProduct'))
const NotFound = lazy(() => import('./Pages/NotFound'))

// Lightweight spinner/skeleton fallback
const PageLoader = () => (
  <div className='min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]'>
    <div className='flex flex-col items-center gap-4'>
      <div className='w-10 h-10 border-4 border-[#138695] border-t-transparent rounded-full animate-spin' />
      <p className='text-gray-400 text-sm'>Loading...</p>
    </div>
  </div>
)

// Shared layout wrapper — keeps Navbar + Footer + ScrollToTop DRY
/* eslint-disable react/prop-types */
const Layout = ({ children, className = '' }) => (
  <>
    <Navbar />
    <ScrollToTop />
    <div
      id='main-content'
      className={`bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20 ${className}`}
    >
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </div>
    <Footer />
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Suspense fallback={<PageLoader />}>
          <Home />
        </Suspense>
        <Footer />
      </>
    ),
  },
  {
    path: '/mens',
    element: <Layout><ProductList category='men' /></Layout>,
  },
  {
    path: '/womens',
    element: <Layout><ProductList category='women' /></Layout>,
  },
  {
    path: '/kids',
    element: <Layout><ProductList category='kid' /></Layout>,
  },
  {
    path: '/contact',
    element: <Layout><Contact /></Layout>,
  },
  {
    path: '/products/:productId',
    element: <Layout><SingleProduct /></Layout>,
  },
  {
    path: '/cart',
    element: <Layout><Cart /></Layout>,
  },
  {
    path: '/wishlist',
    element: <Layout><Wishlist /></Layout>,
  },
  {
    path: '/checkout',
    element: <Layout><Checkout /></Layout>,
  },
  {
    path: '/order-success',
    element: <Layout><OrderSuccess /></Layout>,
  },
  {
    path: '/about',
    element: <Layout><About /></Layout>,
  },
  {
    path: '/faq',
    element: <Layout><FAQ /></Layout>,
  },
  {
    path: '*',
    element: (
      <>
        <Navbar />
        <ScrollToTop />
        <div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'>
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        </div>
      </>
    ),
  },
])

const App = () => (
  <HelmetProvider>
    <main className='overflow-x-hidden'>
      {/* Global UI: Toast and BackToTop live outside the router */}
      <Toast />
      <BackToTop />
      <RouterProvider router={router} />
    </main>
  </HelmetProvider>
)

export default App
