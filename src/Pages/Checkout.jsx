import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { motion } from 'framer-motion'
import { CreditCard, Truck, Shield, CheckCircle } from 'lucide-react'
import all_product from '../Utils/all_product'

const Checkout = () => {
  const navigate = useNavigate()
  // BUG-03 fixed: include clearCart
  const { cartItems, getTotalCartAmount, clearCart } = useContext(ShopContext)
  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment
  const [paymentMethod, setPaymentMethod] = useState('card')
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  })

  const cartProducts = all_product.filter((item) => cartItems[item.id] > 0)
  // BUG-04 fixed: shipping is Free (consistent with Cart.jsx)
  const subtotal = parseFloat(getTotalCartAmount())
  const shipping = 0
  const tax = (subtotal * 0.08).toFixed(2)
  const total = (subtotal + shipping + parseFloat(tax)).toFixed(2)

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
  }

  const handleSubmitShipping = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const orderNumber = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase()
    // BUG-03 fixed: clear cart on successful order
    clearCart()
    navigate('/order-success', { state: { orderNumber, total, cartProducts } })
  }

  if (cartProducts.length === 0) {
    return (
      <div className='container min-h-screen py-20 flex flex-col items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className='text-center'
        >
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>Your cart is empty</h2>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>Add some products to proceed to checkout</p>
          <button
            onClick={() => navigate('/mens')}
            className='bg-[#138695] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0f6d7a] transition-colors'
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className='container py-12 min-h-screen'>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-4xl font-bold text-gray-900 dark:text-white mb-8'
      >
        Checkout
      </motion.h1>

      {/* Progress Steps */}
      <div className='flex items-center justify-center mb-12 gap-4'>
        <div className='flex items-center gap-2'>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-[#138695] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
            1
          </div>
          <span className={`font-medium ${step >= 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>Shipping</span>
        </div>
        <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#138695]' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
        <div className='flex items-center gap-2'>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-[#138695] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
            2
          </div>
          <span className={`font-medium ${step >= 2 ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>Payment</span>
        </div>
      </div>

      <div className='grid lg:grid-cols-3 gap-8'>
        {/* Main Form */}
        <div className='lg:col-span-2'>
          {step === 1 ? (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmitShipping}
              className='bg-white dark:bg-[#151515] rounded-xl p-8 border border-gray-200 dark:border-[#2a2a2a]'
            >
              <div className='flex items-center gap-2 mb-6'>
                <Truck className='text-[#138695]' size={24} />
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Shipping Information</h2>
              </div>

              <div className='grid md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Full Name *</label>
                  <input
                    type='text'
                    name='fullName'
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:border-[#138695] focus:outline-none transition-colors'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Email *</label>
                  <input
                    type='email'
                    name='email'
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:border-[#138695] focus:outline-none transition-colors'
                  />
                </div>
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Phone Number *</label>
                <input
                  type='tel'
                  name='phone'
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:border-[#138695] focus:outline-none transition-colors'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Address *</label>
                <input
                  type='text'
                  name='address'
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:border-[#138695] focus:outline-none transition-colors'
                />
              </div>

              <div className='grid md:grid-cols-3 gap-4 mb-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>City *</label>
                  <input
                    type='text'
                    name='city'
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:border-[#138695] focus:outline-none transition-colors'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>State *</label>
                  <input
                    type='text'
                    name='state'
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:border-[#138695] focus:outline-none transition-colors'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>ZIP Code *</label>
                  <input
                    type='text'
                    name='zipCode'
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:border-[#138695] focus:outline-none transition-colors'
                  />
                </div>
              </div>

              <button
                type='submit'
                className='w-full bg-[#138695] text-white py-3 rounded-lg font-semibold hover:bg-[#0f6d7a] transition-colors'
              >
                Continue to Payment
              </button>
            </motion.form>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handlePlaceOrder}
              className='bg-white dark:bg-[#151515] rounded-xl p-8 border border-gray-200 dark:border-[#2a2a2a]'
            >
              <div className='flex items-center gap-2 mb-6'>
                <CreditCard className='text-[#138695]' size={24} />
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Payment Method</h2>
              </div>

              <div className='space-y-4 mb-6'>
                <label className='flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:border-[#138695] dark:border-[#2a2a2a] dark:bg-[#1a1a1a]'>
                  <input
                    type='radio'
                    name='payment'
                    value='card'
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className='w-4 h-4 text-[#138695]'
                  />
                  <CreditCard size={20} className='text-[#138695]' />
                  <span className='font-medium text-gray-900 dark:text-white'>Credit / Debit Card</span>
                </label>
                <label className='flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:border-[#138695] dark:border-[#2a2a2a] dark:bg-[#1a1a1a]'>
                  <input
                    type='radio'
                    name='payment'
                    value='cod'
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className='w-4 h-4 text-[#138695]'
                  />
                  <Truck size={20} className='text-[#138695]' />
                  <span className='font-medium text-gray-900 dark:text-white'>Cash on Delivery</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className='space-y-4 mb-6'
                >
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Card Number</label>
                    <input
                      type='text'
                      placeholder='1234 5678 9012 3456'
                      className='w-full px-4 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:border-[#138695] focus:outline-none transition-colors'
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Expiry Date</label>
                      <input
                        type='text'
                        placeholder='MM/YY'
                        className='w-full px-4 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:border-[#138695] focus:outline-none transition-colors'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>CVV</label>
                      <input
                        type='text'
                        placeholder='123'
                        className='w-full px-4 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:border-[#138695] focus:outline-none transition-colors'
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div className='flex gap-4'>
                <button
                  type='button'
                  onClick={() => setStep(1)}
                  className='flex-1 bg-gray-200 dark:bg-[#1a1a1a] text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-[#252525] transition-colors'
                >
                  Back
                </button>
                <button
                  type='submit'
                  className='flex-1 bg-[#138695] text-white py-3 rounded-lg font-semibold hover:bg-[#0f6d7a] transition-colors'
                >
                  Place Order
                </button>
              </div>
            </motion.form>
          )}
        </div>

        {/* Order Summary */}
        <div className='lg:col-span-1'>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className='bg-white dark:bg-[#151515] rounded-xl p-6 border border-gray-200 dark:border-[#2a2a2a] sticky top-24'
          >
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>Order Summary</h3>
            
            <div className='space-y-3 mb-4 max-h-[300px] overflow-y-auto'>
              {cartProducts.map((product) => (
                <div key={product.id} className='flex gap-3'>
                  <img src={product.image} alt={product.name} width={64} height={64} loading='lazy' className='w-16 h-16 object-cover rounded-lg' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white line-clamp-1'>{product.name}</p>
                    <p className='text-xs text-gray-500'>Qty: {cartItems[product.id]}</p>
                    <p className='text-sm font-semibold text-[#138695]'>${(product.new_price * cartItems[product.id]).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='border-t border-gray-200 dark:border-[#2a2a2a] pt-4 space-y-2'>
              <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                <span>Shipping</span>
                <span className='text-green-500 font-medium'>Free</span>
              </div>
              <div className='flex justify-between text-gray-600 dark:text-gray-400'>
                <span>Tax (8%)</span>
                <span>${tax}</span>
              </div>
              <div className='flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-[#2a2a2a]'>
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <div className='mt-6 space-y-3'>
              <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                <Shield size={16} className='text-[#138695]' />
                <span>Secure checkout</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                <Truck size={16} className='text-[#138695]' />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                <CheckCircle size={16} className='text-[#138695]' />
                <span>100% authentic products</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
