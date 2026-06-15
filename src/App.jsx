import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'
import Checkout from './Pages/Checkout'
import OrderSuccess from './Pages/OrderSuccess'
import About from './Pages/About'
import FAQ from './Pages/FAQ'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import SingleProduct from './components/SingleProduct'
import NotFound from './Pages/NotFound'

const router = createBrowserRouter([
  {
    path:'/',
    element: <><Home/><Footer/></>
  },
  {
    path:'/mens',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><ProductList category="men"/><Footer/></div></>
  },
  {
    path:'/womens',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><ProductList category="women"/><Footer/></div></>
  },
  {
    path:'/kids',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><ProductList category="kid"/><Footer/></div></>
  },
  {
    path:'/contact',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><Contact/><Footer/></div></>
  },
  {
    path: "/products/:productId",
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><SingleProduct/><Footer/></div></>
  },
  {
    path:'/cart',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><Cart/><Footer/></div></>
  },
  {
    path:'/wishlist',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><Wishlist/><Footer/></div></>
  },
  {
    path:'/checkout',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><Checkout/><Footer/></div></>
  },
  {
    path:'/order-success',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><OrderSuccess/><Footer/></div></>
  },
  {
    path:'/about',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><About/><Footer/></div></>
  },
  {
    path:'/faq',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><FAQ/><Footer/></div></>
  },
  {
    path: '*',
    element: <><Navbar /><div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 pt-20'><NotFound/></div></>
  },
])

const App = () => {
  return (
    <main className='overflow-x-hidden'>
      <RouterProvider router={router}/>
    </main>
  )
}

export default App
