import { useContext, useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Logo from '../assets/logo2.png';
import DarkMode from './DarkMode';
import { ShoppingCart, Search, Heart } from 'lucide-react';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import ResponsiveMenu from './ResponsiveMenu';
import SearchOverlay from './SearchOverlay';
import { ShopContext } from '../context/ShopContext';

// eslint-disable-next-line react-refresh/only-export-components
export const NavbarMenu = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'Mens', link: '/mens' },
  { id: 3, title: 'Womens', link: '/womens' },
  { id: 4, title: 'Kids', link: '/kids' },
  { id: 5, title: 'About', link: '/about' },
  { id: 6, title: 'FAQ', link: '/faq' },
  { id: 7, title: 'Contact', link: '/contact' },
]

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getTotalCartItems, wishlist } = useContext(ShopContext)
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  // Performance: throttled scroll handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    if (!isHomePage) { setScrolled(true); return }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage, handleScroll])

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

  const cartCount = getTotalCartItems()
  const wishlistCount = wishlist.length

  return (
    <>
      {/* Skip navigation — critical for accessibility */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#138695] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold'
      >
        Skip to main content
      </a>

      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />

      <nav
        className={`fixed top-0 left-0 w-full z-50 py-3 transition-all duration-300 ${navbarClasses}`}
        aria-label='Main navigation'
      >
        <div className='container flex justify-between items-center'>
          {/* Logo */}
          <Link
            to='/'
            aria-label='NikeStore home'
            className={isTransparent ? '' : 'dark:bg-gray-100 rounded px-1'}
          >
            <img
              src={Logo}
              alt='NikeStore logo'
              width={90}
              height={32}
              className={`max-w-[90px] ${isTransparent ? 'invert' : ''}`}
            />
          </Link>

          {/* Desktop menu */}
          <div className='hidden md:block'>
            <ul className='flex items-center gap-4 relative z-40' role='list'>
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    aria-current={location.pathname === item.link ? 'page' : undefined}
                    className={`inline-block text-base font-semibold py-2 px-3 uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695] rounded ${linkClasses}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}

              <li>
                <button
                  onClick={() => setShowSearch(true)}
                  aria-label='Open search'
                  className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#138695] ${iconClasses}`}
                >
                  <Search size={20} aria-hidden='true' />
                </button>
              </li>

              <li>
                <Link to='/wishlist' aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}>
                  <div className={`relative transition-colors duration-200 p-2 rounded-lg ${iconClasses}`}>
                    <Heart size={20} aria-hidden='true' />
                    {wishlistCount > 0 && (
                      <span className='bg-pink-500 w-4 h-4 absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white text-[10px] font-bold' aria-hidden='true'>
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                </Link>
              </li>

              <li>
                <Link to='/cart' aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}>
                  <div className={`relative transition-colors duration-200 p-2 rounded-lg ${iconClasses}`}>
                    <ShoppingCart size={20} aria-hidden='true' />
                    <span className={`w-5 h-5 absolute -top-2 -right-1 flex items-center justify-center rounded-full text-white text-xs font-bold ${isTransparent ? 'bg-white/30' : 'bg-[#138695]'}`} aria-hidden='true'>
                      {cartCount}
                    </span>
                  </div>
                </Link>
              </li>

              <li><DarkMode /></li>
            </ul>
          </div>

          {/* Mobile icons */}
          <div className='flex items-center gap-3 md:hidden z-50'>
            <button
              onClick={() => setShowSearch(true)}
              aria-label='Open search'
              className={`p-2 ${iconClasses}`}
            >
              <Search size={20} aria-hidden='true' />
            </button>

            <Link to='/wishlist' aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}>
              <div className='relative p-2'>
                <Heart size={20} className={iconClasses} aria-hidden='true' />
                {wishlistCount > 0 && (
                  <span className='bg-pink-500 w-4 h-4 absolute top-0 right-0 flex items-center justify-center rounded-full text-white text-[10px] font-bold' aria-hidden='true'>
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            <Link to='/cart' aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}>
              <div className='relative p-2'>
                <ShoppingCart size={20} className={iconClasses} aria-hidden='true' />
                <span className={`w-5 h-5 absolute top-0 right-0 flex items-center justify-center rounded-full text-white text-xs font-bold ${isTransparent ? 'bg-white/30' : 'bg-[#138695]'}`} aria-hidden='true'>
                  {cartCount}
                </span>
              </div>
            </Link>

            <DarkMode />

            <button
              onClick={() => setShowMenu(!showMenu)}
              aria-label={showMenu ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={showMenu}
              aria-controls='mobile-menu'
              className={`p-1 ${iconClasses}`}
            >
              {showMenu
                ? <HiMenuAlt1 size={28} aria-hidden='true' />
                : <HiMenuAlt3 size={28} aria-hidden='true' />
              }
            </button>
          </div>
        </div>

        <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </nav>
    </>
  )
}

export default Navbar
