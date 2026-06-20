import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Package, CreditCard, Truck, RefreshCw } from 'lucide-react'
import SEO from '../components/SEO'

const faqData = [
  {
    category: 'Orders & Payment',
    icon: CreditCard,
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI, net banking, and cash on delivery (COD) for eligible orders.'
      },
      {
        q: 'Is it safe to use my credit card on your website?',
        a: 'Yes, absolutely. We use industry-standard SSL encryption to protect your payment information. All transactions are processed securely through certified payment gateways.'
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'You can cancel or modify your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Contact our support team immediately if you need assistance.'
      },
      {
        q: 'Do you offer EMI options?',
        a: 'Yes, we offer EMI options on orders above ₹5,000 through select credit cards and payment partners. The EMI option will be available at checkout.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery',
    icon: Truck,
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 5-7 business days. Express delivery (available in select cities) takes 2-3 business days. You\'ll receive tracking information once your order ships.'
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we only ship within India. We\'re working on expanding to international markets soon. Subscribe to our newsletter to stay updated.'
      },
      {
        q: 'What are the shipping charges?',
        a: 'Shipping is free on all orders above ₹1,000. For orders below ₹1,000, a flat shipping fee of ₹50 applies.'
      },
      {
        q: 'Can I track my order?',
        a: 'Yes! Once your order ships, you\'ll receive a tracking number via email and SMS. You can use this to track your package in real-time.'
      }
    ]
  },
  {
    category: 'Returns & Exchanges',
    icon: RefreshCw,
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return policy. If you\'re not satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange, provided the item is unworn and in original packaging.'
      },
      {
        q: 'How do I return a product?',
        a: 'Log into your account, go to "My Orders", select the item you want to return, and click "Return". Choose pickup or drop-off, and we\'ll process your refund within 7-10 business days after receiving the item.'
      },
      {
        q: 'Are returns free?',
        a: 'Yes, returns are completely free. We\'ll arrange a pickup from your doorstep at no additional cost.'
      },
      {
        q: 'Can I exchange for a different size?',
        a: 'Absolutely! Select "Exchange" instead of "Return" and choose your preferred size. We\'ll ship the new size once we receive the original item back.'
      }
    ]
  },
  {
    category: 'Products & Sizing',
    icon: Package,
    questions: [
      {
        q: 'How do I find my perfect shoe size?',
        a: 'Check our detailed size guide available on every product page. Measure your foot length and compare it with our size chart. If you\'re between sizes, we recommend sizing up.'
      },
      {
        q: 'Are your products 100% authentic?',
        a: 'Yes, we guarantee 100% authentic Nike products. We source directly from authorized distributors and every product comes with authenticity verification.'
      },
      {
        q: 'Do you restock sold-out items?',
        a: 'Popular items are restocked regularly. Click "Notify Me" on sold-out products to receive an email when they\'re back in stock.'
      },
      {
        q: 'Can I get a product customized?',
        a: 'Currently, we don\'t offer customization services, but select products come with customizable options. Look for the "Customize" badge on product pages.'
      }
    ]
  }
]

const FAQ = () => {
  const [openCategory, setOpenCategory] = useState(0)
  const [openQuestion, setOpenQuestion] = useState(null)

  const toggleQuestion = (categoryIdx, questionIdx) => {
    const key = `${categoryIdx}-${questionIdx}`
    setOpenQuestion(openQuestion === key ? null : key)
  }

  // Build FAQPage JSON-LD from all questions
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.flatMap((cat) =>
      cat.questions.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  }

  return (
    <>
      <SEO
        title='FAQ — Frequently Asked Questions'
        description='Find answers about orders, shipping, returns, sizing, and more. NikeStore customer support.'
        canonical='/faq'
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className='bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-[#138695] to-[#0f6d7a] py-20'>
        <div className='container text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle size={64} className='text-white mx-auto mb-6' aria-hidden='true' />
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              Frequently Asked Questions
            </h1>
            <p className='text-xl text-white/90 max-w-2xl mx-auto'>
              Find answers to common questions about orders, shipping, returns, and more
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className='container py-16'>
        <div className='max-w-5xl mx-auto'>
          {/* Category Tabs */}
          <div className='flex flex-wrap gap-3 mb-12 justify-center' role='tablist' aria-label='FAQ categories'>
            {faqData.map((category, idx) => (
              <button
                key={idx}
                role='tab'
                aria-selected={openCategory === idx}
                aria-controls={`faq-panel-${idx}`}
                onClick={() => setOpenCategory(idx)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  openCategory === idx
                    ? 'bg-[#138695] text-white shadow-lg'
                    : 'bg-white dark:bg-[#151515] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#2a2a2a] hover:border-[#138695]'
                }`}
              >
                <category.icon size={20} />
                <span className='hidden sm:inline'>{category.category}</span>
              </button>
            ))}
          </div>

          {/* Questions */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={openCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='space-y-4'
            >
              {faqData[openCategory].questions.map((item, qIdx) => {
                const isOpen = openQuestion === `${openCategory}-${qIdx}`
                return (
                  <motion.div
                    key={qIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: qIdx * 0.1 }}
                    className='bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#2a2a2a] overflow-hidden'
                  >
                    <button
                      onClick={() => toggleQuestion(openCategory, qIdx)}
                      className='w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors'
                    >
                      <span className='font-semibold text-gray-900 dark:text-white text-lg pr-4'>
                        {item.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className='flex-shrink-0'
                      >
                        <ChevronDown className='text-[#138695]' size={24} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className='overflow-hidden'
                        >
                          <div className='px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-[#2a2a2a] pt-4'>
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Contact CTA */}
      <section className='container pb-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='bg-gradient-to-r from-[#138695] to-[#0f6d7a] rounded-2xl p-12 text-center'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Still Have Questions?
          </h2>
          <p className='text-white/90 text-lg mb-8 max-w-2xl mx-auto'>
            Our customer support team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
          </p>
          <a
            href='/contact'
            className='inline-block bg-white text-[#138695] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors'
          >
            Contact Support
          </a>
        </motion.div>
      </section>
    </div>
    </>
  )
}

export default FAQ
