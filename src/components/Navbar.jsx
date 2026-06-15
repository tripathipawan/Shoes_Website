import { useContext, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Logo from '../assets/logo2.png';
import DarkMode from './DarkMode';
import { ShoppingCart, Search, Heart } from 'lucide-react';
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from './ResponsiveMenu';
import SearchOverlay from './SearchOverlay';
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
    title: "About",
    link: "/about",
  },
  {
    id: 6,
    title: "FAQ",
    link: "/faq",
  },
  {
    id: 7,
    title: "Contact",
    link: "/contact",
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getTotalCartItems, wishlist } = useContext(ShopContext)
  const location = useLocation()
  
  const isHomePage = location.pathname === '/'
  const toggleMenu = () => setShowMenu(!showMenu)

  // Scroll listener for transparent → solid transition on home page
  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true)
      return
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    handleScroll() // Check initial scroll position
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  // Determine navbar styles based on page and scroll state
  const isTransparent = isHomePage && !scrolled
  
  const navbarClasses = isTransparent
    ? 'bg-transparent text-white'
    : 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md text-black dark:text-white border-b border-gray-100 dark:border-[#1a1a1a]'
  
  const linkClasses = isTransparent
    ? 'text-white hover:text-white/80'
    : 'text-gray-900 dark:text-gray-200 hover:text-[#138695] dark:hover:text-[#138695]'
  
  const iconClasses = isTransparent
    ? 'text-white hover:text-white/80'
    : 'text-gray-600 dark:text-gray-300 hover:text-[#138695]'

  return (
    <>
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />

      <nav className={`fixed top-0 left-0 w-full z-50 py-3 transition-all duration-300 ${navbarClasses}`}>
        <div className='container flex justify-between items-center'>
          {/* Logo */}
          <Link to='/' className={isTransparent ? '' : 'dark:bg-gray-100 rounded px-1'}>
            <img 
              src={Logo} 
              alt='Nike' 
              className={`max-w-[90px] ${isTransparent ? 'invert' : ''}`}
            />
          </Link>

          {/* Desktop menu */}
          <div className='hidden md:block'>
            <ul className='flex items-center gap-4 relative z-40'>
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className={`inline-block text-base font-semibold py-2 px-3 uppercase transition-colors duration-200 ${linkClasses}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}

              {/* Search */}
              <button
                onClick={() => setShowSearch(true)}
                aria-label='Open search'
                className={`transition-colors duration-200 ${iconClasses}`}
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link to='/wishlist' aria-label='Wishlist'>
                <div className={`relative transition-colors duration-200 ${iconClasses}`}>
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
                <div className={`relative transition-colors duration-200 ${iconClasses}`}>
                  <ShoppingCart size={20} />
                  <div className={`w-5 h-5 absolute -top-3 -right-2 flex items-center justify-center rounded-full text-white text-xs font-bold ${isTransparent ? 'bg-white/20' : 'bg-[#138695]'}`}>
                    {getTotalCartItems()}
                  </div>
                </div>
              </Link>

              {/* Dark mode */}
              <DarkMode />
            </ul>
          </div>

          {/* Mobile icons */}
          <div className='flex items-center gap-4 md:hidden z-50'>
            {/* Search */}
            <button
              onClick={() => setShowSearch(true)}
              aria-label='Open search'
              className={iconClasses}
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link to='/wishlist' aria-label='Wishlist'>
              <div className='relative'>
                <Heart size={20} className={iconClasses} />
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
                <ShoppingCart size={20} className={iconClasses} />
                <div className={`w-5 h-5 absolute -top-2 right-1 flex items-center justify-center rounded-full text-white text-xs font-bold ${isTransparent ? 'bg-white/20' : 'bg-[#138695]'}`}>
                  {getTotalCartItems()}
                </div>
              </div>
            </Link>

            {/* Dark mode */}
            <DarkMode />

            {/* Hamburger */}
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className={`cursor-pointer transition-all z-50 ${iconClasses}`} size={28} />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className={`cursor-pointer transition-all z-50 ${iconClasses}`} size={28} />
            )}
          </div>
        </div>

        <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </nav>
    </>
  )
}

export default Navbar
