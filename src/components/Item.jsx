/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Item = ({ product }) => {
  const { addToCart } = useContext(ShopContext)

  return (
    <div className='group bg-white dark:bg-[#151515] rounded-xl overflow-hidden border border-gray-100 dark:border-[#2a2a2a] shadow-sm hover:shadow-lg transition-shadow duration-300'>
      <Link to={`/products/${product?.id}`}>
        <div className='aspect-square w-full overflow-hidden bg-gray-50 dark:bg-[#1a1a1a]'>
          <img
            src={product?.image}
            alt={product?.name}
            className='h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-500'
          />
        </div>
      </Link>
      <div className='p-4'>
        <Link to={`/products/${product?.id}`}>
          <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-100 line-clamp-2 hover:text-[#138695] transition-colors leading-snug'>
            {product?.name}
          </h3>
        </Link>
        <div className='flex items-center justify-between mt-3'>
          <div>
            <span className='text-[#138695] font-bold'>${product?.new_price}</span>
            <span className='text-gray-400 text-xs line-through ml-2'>${product?.old_price}</span>
          </div>
          <button
            onClick={() => addToCart(product?.id)}
            className='bg-[#138695] text-white p-2 rounded-lg hover:bg-[#0f6a77] transition-colors duration-200 hover:scale-110 active:scale-95'
            aria-label={`Add ${product?.name} to cart`}
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item
