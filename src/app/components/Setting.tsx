import { ReactNode } from 'react'
import html2canvas from 'html2canvas'

const Setting = ({ year, setYear }: { year: number; setYear: (currYear: any) => void }): ReactNode => {
  const handleDownload = () => {
    const target = document.getElementById('calendar') as HTMLElement

    html2canvas(target, { windowWidth: 1000 }).then(function (canvas) {
      var link = document.createElement('a')
      link.href = canvas.toDataURL()
      link.download = 'calendar.png'
      link.click()
    })
  }

  return (
    <div className='flex justify-between'>
      <div className='flex items-center space-x-2'>
        <button
          onClick={() => setYear((currYear: number) => currYear - 1)}
          className='p-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-lg hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-80'
        >
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-4 h-4'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </button>
        <h1 className='text-xl text-gray-800 font-medium'>{year}</h1>
        <button
          onClick={() => setYear((currYear: number) => currYear + 1)}
          className='p-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-lg hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-80'
        >
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </button>
      </div>
      <button
        onClick={handleDownload}
        className='py-1 px-2 font-medium tracking-wide text-gray-700 border-2 capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80'
      >
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3' />
        </svg>
      </button>
    </div>
  )
}

export default Setting
