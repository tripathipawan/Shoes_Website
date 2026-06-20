/* eslint-disable react/prop-types */
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SITE_URL } from '../Utils/constants'

const Breadcrum = ({ product }) => {
  if (!product) return null

  const categoryPath = product.category === 'kid' ? '/kids' : `/${product.category}s`
  const categoryLabel = product.category === 'kid' ? 'Kids' : `${product.category.charAt(0).toUpperCase() + product.category.slice(1)}s`

  // GEO: BreadcrumbList structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${SITE_URL}${categoryPath}` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}/products/${product.id}` },
    ],
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label='Breadcrumb'>
        <ol className='flex items-center flex-wrap md:gap-2 gap-1 px-6 md:px-0 text-[#5e5e5e] font-semibold md:text-base capitalize mt-4 text-sm dark:text-gray-400'>
          <li>
            <Link to='/' className='hover:text-[#138695] transition-colors'>Home</Link>
          </li>
          <li aria-hidden='true'><ChevronRight size={16} /></li>
          <li>
            <Link to={categoryPath} className='hover:text-[#138695] transition-colors capitalize'>
              {categoryLabel}
            </Link>
          </li>
          <li aria-hidden='true'><ChevronRight size={16} /></li>
          <li aria-current='page' className='text-gray-900 dark:text-white line-clamp-1'>
            {product?.name}
          </li>
        </ol>
      </nav>
    </>
  )
}

export default Breadcrum
