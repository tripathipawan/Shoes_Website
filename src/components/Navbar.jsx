import { useState } from 'react'
import Logo from '../assets/logo2.png'
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Heart } from 'lucide-react';
import { HiMenuAlt1, HiMenuAlt3, } from "react-icons/hi";
import ResponsiveMenu from './ResponsiveMenu';
import SearchOverlay from './SearchOverlay';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

// eslint-disable-next-line react-refresh/only-export-components
export const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "Mens",
    link: "/mens",
  },
  {
    id: 3,
    title: "Womens",
    link: "/womens",
  },
  {
    id: 4,
    title: "Kids",
    link: "/kids",
  },
  {
    id: 5,
    title: "Contact",
    link: "/contact",
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { getTotalCartItems, wishlist } = useContext(ShopContext)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <>
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />

      <div className='text-white py-8'>
        <div className='container flex justify-between items-center'>
          {/* logo section */}
          <div>
            <img src={Logo} alt="" className='max-w-[100px] invert' />
          </div>
          {/* menu section */}
          <div className='hidden md:block'>
            <ul className='flex items-center gap-4 relative z-40'>
              {NavbarMenu.map((item, index) => (
                <li key={index}>
                  <Link to={item.link} className='inline-block text-base font-semibold py-2 px-3 uppercase hover:text-white/80 transition-colors duration-200'>
                    {item.title}
                  </Link>
                </li>
              ))}
              {/* Search */}
              <button
                onClick={() => setShowSearch(true)}
                aria-label='Search'
                className='text-white hover:text-white/80 transition-colors'
              >
                <Search size={20} />
              </button>
              {/* Wishlist */}
              <Link to='/wishlist' aria-label='Wishlist'>
                <div className='relative'>
                  <Heart size={20} className='text-white' />
                  {wishlist.length > 0 && (
                    <div className='bg-pink-500 w-4 h-4 absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white text-[10px] font-bold'>
                      {wishlist.length}
                    </div>
                  )}
                </div>
              </Link>
              {/* Cart */}
              <Link to='/cart'>
                <div className='relative'>
                  <ShoppingCart size={20} />
                  <div className='bg-white/20 w-5 h-5 absolute -top-3 -right-2 flex items-center justify-center rounded-full text-white text-xs font-bold'>
                    {getTotalCartItems()}
                  </div>
                </div>
              </Link>
            </ul>
          </div>
          <div className='flex gap-5 md:hidden z-50'>
            <button onClick={() => setShowSearch(true)} aria-label='Search'><Search size={20} /></button>
            <Link to='/wishlist' aria-label='Wishlist'>
              <div className='relative'>
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <div className='bg-pink-500 w-4 h-4 absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white text-[10px] font-bold'>
                    {wishlist.length}
                  </div>
                )}
              </div>
            </Link>
            <Link to={'/cart'}><div className='relative'><ShoppingCart /><div className='bg-white/20 w-5 h-5 absolute -top-2 right-1 flex items-center justify-center rounded-full text-white text-xs font-bold'>{getTotalCartItems()}</div></div></Link>
            {/* mobile hamburger menu */}
            {
              showMenu ? (
                <HiMenuAlt1 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden z-50' size={30} />
              ) : (
                <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden z-50' size={30} />
              )
            }
          </div>
        </div>
        <div>
          <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
      </div>
    </>
  )
}

export default Navbar
