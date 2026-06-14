import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import Navbar2 from './components/Navbar2'
import SingleProduct from './components/SingleProduct'
import NotFound from './Pages/NotFound'

const router = createBrowserRouter([
  {
    path:'/',
    element: <><Home/><Footer/></>
  },
  {
    path:'/mens',
    element: <div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300'><Navbar2/><ProductList category="men"/><Footer/></div>
  },
  {
    path:'/womens',
    element: <div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300'><Navbar2/><ProductList category="women"/><Footer/></div>
  },
  {
    path:'/kids',
    element: <div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300'><Navbar2/><ProductList category="kid"/><Footer/></div>
  },
  {
    path:'/contact',
    element: <div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300'><Navbar2/><Contact/><Footer/></div>
  },
  {
    path: "/products/:productId",
    element: <div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300'><Navbar2/><SingleProduct/><Footer/></div>
  },
  {
    path:'/cart',
    element: <div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300'><Navbar2/><Cart/><Footer/></div>
  },
  {
    path:'/wishlist',
    element: <div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300'><Navbar2/><Wishlist/><Footer/></div>
  },
  {
    path: '*',
    element: <div className='bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300'><Navbar2/><NotFound/></div>
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
