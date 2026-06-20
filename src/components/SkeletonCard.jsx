const SkeletonCard = () => (
  <div
    className='bg-white dark:bg-[#151515] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#2a2a2a] animate-pulse'
    role='status'
    aria-label='Loading product'
  >
    <div className='aspect-square bg-gray-200 dark:bg-[#2a2a2a]' />
    <div className='p-4 space-y-3'>
      <div className='h-4 bg-gray-200 dark:bg-[#2a2a2a] rounded w-3/4' />
      <div className='h-4 bg-gray-200 dark:bg-[#2a2a2a] rounded w-1/2' />
      <div className='flex justify-between items-center'>
        <div className='h-5 bg-gray-200 dark:bg-[#2a2a2a] rounded w-16' />
        <div className='h-8 w-8 bg-gray-200 dark:bg-[#2a2a2a] rounded-lg' />
      </div>
    </div>
  </div>
)

export default SkeletonCard
