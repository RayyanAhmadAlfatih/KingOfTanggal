'use client'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const Modal = (props: any): ReactNode => {
  const router = useRouter()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const goBack = () => {
      document.body.style.overflow = 'auto'
    }
    return goBack
  }, [])

  return (
    <>
      <div className='bg-gray-900/30 fixed inset-0 border backdrop-blur'></div>
      <div className='fixed inset-0 overflow-auto py-24 px-4 flex justify-center'>
        <div className='text-gray-700 bg-white h-fit w-fit shadow-lg rounded-lg p-8'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-medium bg'>{props.title}</h1>
            <button onClick={() => router.back()} className='px-4 py-2 font-medium transition-colors duration-300 transform rounded-md hover:bg-gray-100 focus:outline-none'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          {props.children}
        </div>
      </div>
    </>
  )
}

export default Modal
