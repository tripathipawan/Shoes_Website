import { useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import EmptyCart from '../assets/EmptyCart.png'
import { Link } from 'react-router-dom'

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {
    getTotalCartItems,
    all_product,
    cartItems,
    deleteFromCart,
    increaseQty,
    decreaseQty,
    getTotalCartAmount,
  } = useContext(ShopContext)

  const cartProducts = all_product.filter((p) => cartItems[p.id] > 0)

  return (
    <div className='min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex items-center gap-3 mb-8'
        >
          <ShoppingBag size={28} className='text-[#138695]' />
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>
            Shopping Cart
          </h1>
          {getTotalCartItems() > 0 && (
            <span className='bg-[#138695] text-white text-sm font-bold px-3 py-1 rounded-full'>
              {getTotalCartItems()}
            </span>
          )}
        </motion.div>

        <AnimatePresence mode='wait'>
          {getTotalCartItems() === 0 ? (
            <motion.div
              key='empty'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col items-center justify-center py-16 gap-6 text-center'
            >
              <img src={EmptyCart} alt='Empty cart' className='w-64 md:w-80 opacity-80' />
              <p className='text-gray-500 dark:text-gray-400 text-lg'>Your cart is empty</p>
              <Link to='/mens'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center gap-2 bg-[#138695] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#0f6a77] transition-colors duration-200'
                >
                  Start Shopping <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key='cart'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className='flex flex-col lg:flex-row gap-8'
            >
              {/* Cart Items */}
              <div className='flex-1 space-y-4'>
                <AnimatePresence>
                  {cartProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className='flex items-center gap-4 bg-gray-50 dark:bg-[#151515] rounded-2xl p-4 border border-gray-100 dark:border-[#2a2a2a]'
                    >
                      {/* Product Image */}
                      <Link to={`/products/${product.id}`} className='flex-shrink-0'>
                        <div className='w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden'>
                          <img
                            src={product.image}
                            alt={product.name}
                            className='w-full h-full object-contain p-2 hover:scale-110 transition-transform duration-300'
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className='flex-1 min-w-0'>
                        <Link to={`/products/${product.id}`}>
                          <h3 className='font-semibold text-gray-800 dark:text-white text-sm md:text-base line-clamp-2 hover:text-[#138695] transition-colors'>
                            {product.name}
                          </h3>
                        </Link>
                        <p className='text-gray-400 text-xs capitalize mt-0.5'>{product.category}</p>
                        <div className='flex items-center gap-2 mt-2'>
                          <span className='text-[#138695] font-bold'>${product.new_price}</span>
                          <span className='text-gray-400 text-xs line-through'>${product.old_price}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className='flex items-center gap-2 flex-shrink-0'>
                        <button
                          onClick={() => decreaseQty(product.id)}
                          aria-label='Decrease quantity'
                          className='w-8 h-8 rounded-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] flex items-center justify-center hover:bg-[#138695] hover:border-[#138695] hover:text-white dark:hover:bg-[#138695] transition-colors duration-200'
                        >
                          <Minus size={13} />
                        </button>
                        <span className='w-8 text-center font-bold text-gray-800 dark:text-white text-sm'>
                          {cartItems[product.id]}
                        </span>
                        <button
                          onClick={() => increaseQty(product.id)}
                          aria-label='Increase quantity'
                          className='w-8 h-8 rounded-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] flex items-center justify-center hover:bg-[#138695] hover:border-[#138695] hover:text-white dark:hover:bg-[#138695] transition-colors duration-200'
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className='hidden sm:block text-right flex-shrink-0 min-w-[60px]'>
                        <p className='font-bold text-gray-800 dark:text-white'>
                          ${(product.new_price * cartItems[product.id]).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => deleteFromCart(product.id)}
                        aria-label={`Remove ${product.name} from cart`}
                        className='flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1'
                      >
                        <X size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='lg:w-96 space-y-4'
              >
                {/* Summary Card */}
                <div className='bg-gray-50 dark:bg-[#151515] rounded-2xl p-6 border border-gray-100 dark:border-[#2a2a2a]'>
                  <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-5'>
                    Order Summary
                  </h2>
                  <div className='space-y-3 text-sm'>
                    <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                      <span>Subtotal ({getTotalCartItems()} items)</span>
                      <span className='font-medium text-gray-800 dark:text-white'>${getTotalCartAmount()}</span>
                    </div>
                    <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                      <span>Shipping</span>
                      <span className='text-green-500 font-medium'>Free</span>
                    </div>
                    <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                      <span>Tax (est.)</span>
                      <span className='font-medium text-gray-800 dark:text-white'>
                        ${(parseFloat(getTotalCartAmount()) * 0.08).toFixed(2)}
                      </span>
                    </div>
                    <div className='border-t border-gray-200 dark:border-[#2a2a2a] pt-3 flex justify-between'>
                      <span className='font-bold text-gray-900 dark:text-white text-base'>Total</span>
                      <span className='font-bold text-[#138695] text-xl'>
                        ${(parseFloat(getTotalCartAmount()) * 1.08).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full mt-6 bg-[#138695] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0f6a77] transition-colors duration-200 text-base'
                  >
                    Proceed to Checkout <ArrowRight size={18} />
                  </motion.button>

                  <Link to='/mens'>
                    <button className='w-full mt-3 text-[#138695] font-semibold py-3 rounded-xl border border-[#138695]/30 hover:bg-[#138695]/5 transition-colors duration-200 text-sm'>
                      Continue Shopping
                    </button>
                  </Link>
                </div>

                {/* Promo code */}
                <div className='bg-gray-50 dark:bg-[#151515] rounded-2xl p-6 border border-gray-100 dark:border-[#2a2a2a]'>
                  <h3 className='font-semibold text-gray-800 dark:text-white text-sm mb-3'>
                    Promo Code
                  </h3>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      placeholder='Enter promo code'
                      className='flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#0a0a0a] text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#138695] transition-all'
                    />
                    <button className='px-4 py-3 bg-gray-800 dark:bg-[#2a2a2a] text-white text-sm font-semibold rounded-xl hover:bg-[#138695] transition-colors duration-200 whitespace-nowrap'>
                      Apply
                    </button>
                  </div>
                </div>

                {/* Trust badges */}
                <div className='flex justify-around py-4'>
                  {['Free Returns', '100% Authentic', 'Secure Pay'].map((badge) => (
                    <div key={badge} className='text-center'>
                      <p className='text-xs text-gray-400 dark:text-gray-500'>{badge}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Cart
