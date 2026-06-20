import { useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import EmptyCart from '../assets/EmptyCart.png'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { CURRENCY } from '../Utils/constants'

const Cart = () => {
  const {
    getTotalCartItems,
    all_product,
    cartItems,
    deleteFromCart,
    increaseQty,
    decreaseQty,
    getTotalCartAmount,
    discount,
    promoError,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  } = useContext(ShopContext)

  const [promoInput, setPromoInput] = useState('')
  const cartProducts = all_product.filter((p) => cartItems[p.id] > 0)

  const subtotal = parseFloat(getTotalCartAmount())
  const tax = (subtotal * 0.08).toFixed(2)
  const total = (subtotal + parseFloat(tax)).toFixed(2)

  return (
    <>
      <SEO
        title='Shopping Cart'
        description='Review your selected Nike shoes and proceed to checkout.'
        canonical='/cart'
        noIndex={true}
      />
      <div className='min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300'>
        <div className='max-w-7xl mx-auto px-4 py-12'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-center gap-3 mb-8'
          >
            <ShoppingBag size={28} className='text-[#138695]' aria-hidden='true' />
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>
              Shopping Cart
            </h1>
            {getTotalCartItems() > 0 && (
              <span
                className='bg-[#138695] text-white text-sm font-bold px-3 py-1 rounded-full'
                aria-label={`${getTotalCartItems()} items in cart`}
              >
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
                <img src={EmptyCart} alt='Empty shopping cart' width={320} height={320} className='w-64 md:w-80 opacity-80' />
                <p className='text-gray-500 dark:text-gray-400 text-lg'>Your cart is empty</p>
                <Link to='/mens'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center gap-2 bg-[#138695] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#0f6a77] transition-colors duration-200'
                  >
                    Start Shopping <ArrowRight size={18} aria-hidden='true' />
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
                <div className='flex-1 space-y-4' role='list' aria-label='Cart items'>
                  <AnimatePresence>
                    {cartProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                        role='listitem'
                        className='flex items-center gap-4 bg-gray-50 dark:bg-[#151515] rounded-2xl p-4 border border-gray-100 dark:border-[#2a2a2a]'
                      >
                        <Link to={`/products/${product.id}`} className='flex-shrink-0' aria-label={`View ${product.name}`}>
                          <div className='w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-[#2a2a2a] rounded-xl overflow-hidden'>
                            <img
                              src={product.image}
                              alt={product.name}
                              width={96}
                              height={96}
                              loading='lazy'
                              decoding='async'
                              className='w-full h-full object-contain p-2 hover:scale-110 transition-transform duration-300'
                            />
                          </div>
                        </Link>

                        <div className='flex-1 min-w-0'>
                          <Link to={`/products/${product.id}`}>
                            <h2 className='font-semibold text-gray-800 dark:text-white text-sm md:text-base line-clamp-2 hover:text-[#138695] transition-colors'>
                              {product.name}
                            </h2>
                          </Link>
                          <p className='text-gray-400 text-xs capitalize mt-0.5'>{product.category}</p>
                          <div className='flex items-center gap-2 mt-2'>
                            <span className='text-[#138695] font-bold'>{CURRENCY}{product.new_price}</span>
                            <span className='text-gray-400 text-xs line-through'>{CURRENCY}{product.old_price}</span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className='flex items-center gap-2 flex-shrink-0' role='group' aria-label={`Quantity for ${product.name}`}>
                          <button
                            onClick={() => decreaseQty(product.id)}
                            aria-label={`Decrease quantity of ${product.name}`}
                            className='w-8 h-8 rounded-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] flex items-center justify-center hover:bg-[#138695] hover:border-[#138695] hover:text-white dark:hover:bg-[#138695] transition-colors duration-200'
                          >
                            <Minus size={13} aria-hidden='true' />
                          </button>
                          <span className='w-8 text-center font-bold text-gray-800 dark:text-white text-sm' aria-label={`Quantity: ${cartItems[product.id]}`}>
                            {cartItems[product.id]}
                          </span>
                          <button
                            onClick={() => increaseQty(product.id)}
                            aria-label={`Increase quantity of ${product.name}`}
                            className='w-8 h-8 rounded-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] flex items-center justify-center hover:bg-[#138695] hover:border-[#138695] hover:text-white dark:hover:bg-[#138695] transition-colors duration-200'
                          >
                            <Plus size={13} aria-hidden='true' />
                          </button>
                        </div>

                        <div className='hidden sm:block text-right flex-shrink-0 min-w-[60px]'>
                          <p className='font-bold text-gray-800 dark:text-white'>
                            {CURRENCY}{(product.new_price * cartItems[product.id]).toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() => deleteFromCart(product.id)}
                          aria-label={`Remove ${product.name} from cart`}
                          className='flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1'
                        >
                          <X size={18} aria-hidden='true' />
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
                        <span className='font-medium text-gray-800 dark:text-white'>{CURRENCY}{getTotalCartAmount()}</span>
                      </div>
                      {discount > 0 && (
                        <div className='flex justify-between text-green-600 dark:text-green-400'>
                          <span>Discount ({discount}%)</span>
                          <span className='font-medium'>-{CURRENCY}{(parseFloat(getTotalCartAmount()) * discount / (100 - discount)).toFixed(2)}</span>
                        </div>
                      )}
                      <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                        <span>Shipping</span>
                        <span className='text-green-500 font-medium'>Free</span>
                      </div>
                      <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                        <span>Tax (8%)</span>
                        <span className='font-medium text-gray-800 dark:text-white'>{CURRENCY}{tax}</span>
                      </div>
                      <div className='border-t border-gray-200 dark:border-[#2a2a2a] pt-3 flex justify-between'>
                        <span className='font-bold text-gray-900 dark:text-white text-base'>Total</span>
                        <span className='font-bold text-[#138695] text-xl'>{CURRENCY}{total}</span>
                      </div>
                    </div>

                    <Link to='/checkout'>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full mt-6 bg-[#138695] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0f6a77] transition-colors duration-200 text-base'
                      >
                        Proceed to Checkout <ArrowRight size={18} aria-hidden='true' />
                      </motion.button>
                    </Link>

                    <Link to='/mens'>
                      <button className='w-full mt-3 text-[#138695] font-semibold py-3 rounded-xl border border-[#138695]/30 hover:bg-[#138695]/5 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#138695]'>
                        Continue Shopping
                      </button>
                    </Link>
                  </div>

                  {/* FEAT-06: Functional Promo Code */}
                  <div className='bg-gray-50 dark:bg-[#151515] rounded-2xl p-6 border border-gray-100 dark:border-[#2a2a2a]'>
                    <h3 className='font-semibold text-gray-800 dark:text-white text-sm mb-3'>
                      Promo Code
                    </h3>
                    {appliedPromo ? (
                      <div className='flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3'>
                        <span className='text-green-600 dark:text-green-400 font-semibold text-sm'>
                          ✓ {appliedPromo} — {discount}% off applied!
                        </span>
                        <button
                          onClick={removePromoCode}
                          className='text-red-400 text-xs underline hover:text-red-600 ml-2'
                          aria-label='Remove promo code'
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className='flex gap-2'>
                          <input
                            type='text'
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && applyPromoCode(promoInput)}
                            placeholder='Enter promo code'
                            aria-label='Promo code'
                            className='flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#0a0a0a] text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#138695] transition-all'
                          />
                          <button
                            onClick={() => applyPromoCode(promoInput)}
                            className='px-4 py-3 bg-gray-800 dark:bg-[#2a2a2a] text-white text-sm font-semibold rounded-xl hover:bg-[#138695] transition-colors duration-200 whitespace-nowrap'
                            aria-label='Apply promo code'
                          >
                            Apply
                          </button>
                        </div>
                        {promoError && (
                          <p className='text-red-500 text-xs mt-2' role='alert'>{promoError}</p>
                        )}
                        <p className='text-gray-400 dark:text-gray-500 text-xs mt-2'>
                          Try: <code className='font-mono'>NIKE10</code>, <code className='font-mono'>SAVE20</code>, <code className='font-mono'>FIRST15</code>
                        </p>
                      </>
                    )}
                  </div>

                  {/* Trust badges */}
                  <div className='flex justify-around py-4'>
                    {[
                      { label: 'Free Returns', emoji: '↩️' },
                      { label: '100% Authentic', emoji: '✓' },
                      { label: 'Secure Pay', emoji: '🔒' },
                    ].map((badge) => (
                      <div key={badge.label} className='text-center'>
                        <p className='text-lg mb-1' aria-hidden='true'>{badge.emoji}</p>
                        <p className='text-xs text-gray-400 dark:text-gray-500'>{badge.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default Cart
