/* eslint-disable react/prop-types */
import { ChevronRight } from 'lucide-react';

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='flex items-center md:gap-2 gap-1 px-6 md:px-0 text-[#5e5e5e] font-semibold md:text-lg capitalize mt-4 text-sm dark:text-[#9dffe8]'>
      HOME <ChevronRight/> SHOP <ChevronRight/> {product.category} <ChevronRight/> {product.name}
    </div>
  )
}

export default Breadcrum
