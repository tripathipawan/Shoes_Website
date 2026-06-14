import { useContext, useState } from 'react';
import Logo from '../assets/logo2.png';
import DarkMode from './DarkMode';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Heart } from 'lucide-react';
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from './ResponsiveMenu';
import { NavbarMenu } from './Navbar';
import { ShopContext } from '../context/ShopContext';
import SearchOverlay from './SearchOverlay';

const Navbar2 = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const toggleMenu = () => setShowMenu(!showMenu)
  const { getTotalCartItems, wishlist } = useContext(ShopContext)

  return (
    <>
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />

      <div className='text-black py-3 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-[#1a1a1a] sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-[#0a0a0a]/90 transition-colors duration-300'>
        <div className='container flex justify-between items-center'>
          {/* Logo */}
          <div className='dark:bg-gray-100 rounded px-1'>
            <img src={Logo} alt='Nike' className='max-w-[90px]' />
          </div>

          {/* Desktop menu */}
          <div className='hidden md:block'>
            <ul className='flex items-center gap-4 relative z-40 dark:text-gray-200'>
              {NavbarMenu.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className='inline-block text-base font-semibold py-2 px-3 uppercase hover:text-[#138695] transition-colors duration-200'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}

              {/* Search */}
              <button
                onClick={() => setShowSearch(true)}
                aria-label='Open search'
                className='text-gray-600 dark:text-gray-300 hover:text-[#138695] transition-colors duration-200'
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link to='/wishlist' aria-label='Wishlist'>
                <div className='relative text-gray-600 dark:text-gray-300 hover:text-[#138695] transition-colors duration-200'>
                  <Heart size={20} />
                  {wishlist.length > 0 && (
                    <div className='bg-pink-500 w-4 h-4 absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white text-[10px] font-bold'>
                      {wishlist.length}
                    </div>
                  )}
                </div>
              </Link>

              {/* Cart */}
              <Link to='/cart'>
                <div className='relative dark:text-gray-200 hover:text-[#138695] transition-colors duration-200'>
                  <ShoppingCart size={20} />
                  <div className='bg-[#138695] w-5 h-5 absolute -top-3 -right-2 flex items-center justify-center rounded-full text-white text-xs font-bold'>
                    {getTotalCartItems()}
                  </div>
                </div>
              </Link>

              {/* Dark mode */}
              <DarkMode />
            </ul>
          </div>

          {/* Mobile icons */}
          <div className='flex items-center gap-4 md:hidden z-50 dark:text-gray-200'>
            {/* Search */}
            <button
              onClick={() => setShowSearch(true)}
              aria-label='Open search'
              className='text-gray-700 dark:text-gray-300'
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link to='/wishlist' aria-label='Wishlist'>
              <div className='relative'>
                <Heart size={20} className='text-gray-700 dark:text-gray-300' />
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
                <ShoppingCart size={20} className='text-gray-700 dark:text-gray-300' />
                <div className='bg-[#138695] z-40 w-5 h-5 absolute -top-2 right-1 flex items-center justify-center rounded-full text-white text-xs font-bold'>
                  {getTotalCartItems()}
                </div>
              </div>
            </Link>

            {/* Dark mode */}
            <DarkMode />

            {/* Hamburger */}
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className='cursor-pointer transition-all z-50' size={28} />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all z-50' size={28} />
            )}
          </div>
        </div>

        <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </>
  )
}

export default Navbar2
