import { useParams, useNavigate } from 'react-router-dom'
import all_product from '../Utils/all_product'
import Breadcrum from './Breadcrum'
import ProductDisplay from './ProductDisplay'
import Description from './Description'
import RelatedProducts from './RelatedProducts'
import SEO from './SEO'

const SingleProduct = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = all_product.find((e) => e.id === Number(productId))

  // BUG-08 fixed: redirect if product not found
  if (!product) {
    navigate('/not-found', { replace: true })
    return null
  }

  const productDescription = `Buy the ${product.name} — ${product.category === 'kid' ? "perfect for young athletes" : `premium ${product.category}'s footwear`}. Free shipping on orders over $100.`

  return (
    <>
      <SEO
        title={product.name}
        description={productDescription}
        canonical={`/products/${product.id}`}
        ogType='product'
      />
      {/* Product JSON-LD structured data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: [product.image],
            description: productDescription,
            brand: { '@type': 'Brand', name: 'Nike' },
            offers: {
              '@type': 'Offer',
              url: `https://nikestore.vercel.app/products/${product.id}`,
              priceCurrency: 'USD',
              price: product.new_price.toFixed(2),
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
            },
          }),
        }}
      />
      <div className='max-w-7xl mx-auto mb-32 mt-14 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 px-4 md:px-0'>
        {/* BUG-08 fixed: optional chaining in Breadcrum */}
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        <Description product={product} />
        <RelatedProducts currentProduct={product} />
      </div>
    </>
  )
}

export default SingleProduct
