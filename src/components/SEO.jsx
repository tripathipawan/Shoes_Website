/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_OG_IMAGE } from '../Utils/constants'

const SEO = ({
  title,
  description = SITE_DESCRIPTION,
  canonical,
  ogImage = SITE_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Just Do It`
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      {noIndex && <meta name='robots' content='noindex,nofollow' />}
      {canonicalUrl && <link rel='canonical' href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={ogType} />
      {canonicalUrl && <meta property='og:url' content={canonicalUrl} />}
      <meta property='og:image' content={ogImage} />
      <meta property='og:site_name' content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={ogImage} />
    </Helmet>
  )
}

export default SEO
