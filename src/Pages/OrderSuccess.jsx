import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'

const OrderSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderNumber, total, cartProducts } = location.state || {}

  useEffect(() => {
    if (!orderNumber) {
      navigate('/cart')
      return
    }

    // Confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [orderNumber, navigate])

  if (!orderNumber) {
    return null
  }

  return (
    <div className='container py-12 min-h-screen'>
      <div className='max-w-3xl mx-auto'>
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className='flex justify-center mb-8'
        >
          <div className='w-24 h-24 bg-green-500 rounded-full flex items-center justify-center'>
            <CheckCircle size={48} className='text-white' />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-center mb-8'
        >
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Order Placed Successfully!
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-400 mb-2'>
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-500'>
            We&apos;ve sent a confirmation email to your registered email address.
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='bg-white dark:bg-[#151515] rounded-xl p-8 border border-gray-200 dark:border-[#2a2a2a] mb-8'
        >
          <div className='grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-[#2a2a2a]'>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Order Number</p>
              <p className='text-xl font-bold text-gray-900 dark:text-white'>{orderNumber}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Total Amount</p>
              <p className='text-xl font-bold text-[#138695]'>₹{total}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Order Items</h3>
            <div className='space-y-3 max-h-[300px] overflow-y-auto'>
              {cartProducts?.map((product) => (
                <div key={product.id} className='flex gap-4 p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg'>
                  <img src={product.image} alt={product.name} className='w-16 h-16 object-cover rounded-lg' />
                  <div className='flex-1'>
                    <p className='font-medium text-gray-900 dark:text-white'>{product.name}</p>
                    <p className='text-sm text-gray-500'>Size: M | Color: Default</p>
                    <p className='text-sm font-semibold text-[#138695] mt-1'>₹{product.new_price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className='bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4'>
            <div className='flex items-start gap-3'>
              <Truck className='text-blue-600 dark:text-blue-400 mt-1' size={20} />
              <div>
                <p className='font-semibold text-gray-900 dark:text-white'>Estimated Delivery</p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Your order will be delivered within 5-7 business days
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className='bg-white dark:bg-[#151515] rounded-xl p-8 border border-gray-200 dark:border-[#2a2a2a] mb-8'
        >
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>What&apos;s Next?</h3>
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <div className='w-8 h-8 bg-[#138695] rounded-full flex items-center justify-center flex-shrink-0'>
                <Mail size={16} className='text-white' />
              </div>
              <div>
                <p className='font-medium text-gray-900 dark:text-white'>Order Confirmation</p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Check your email for order details and invoice
                </p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-8 h-8 bg-[#138695] rounded-full flex items-center justify-center flex-shrink-0'>
                <Package size={16} className='text-white' />
              </div>
              <div>
                <p className='font-medium text-gray-900 dark:text-white'>Order Processing</p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  We&apos;re preparing your items for shipment
                </p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-8 h-8 bg-[#138695] rounded-full flex items-center justify-center flex-shrink-0'>
                <Truck size={16} className='text-white' />
              </div>
              <div>
                <p className='font-medium text-gray-900 dark:text-white'>Shipping Updates</p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  You&apos;ll receive tracking information once shipped
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className='flex flex-col sm:flex-row gap-4'
        >
          <Link
            to='/mens'
            className='flex-1 bg-[#138695] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#0f6d7a] transition-colors flex items-center justify-center gap-2'
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
          <button
            onClick={() => window.print()}
            className='flex-1 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white border-2 border-gray-300 dark:border-[#2a2a2a] py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors'
          >
            Print Order
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderSuccess
