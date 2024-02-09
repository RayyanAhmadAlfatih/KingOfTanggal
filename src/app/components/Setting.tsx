import { ReactNode } from 'react'
import html2canvas from 'html2canvas'
import { Button } from '@nextui-org/button'

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
    <div className='p-5 backdrop-blur rounded-lg shadow-md'>
      <div className='flex justify-between'>
        <div className='flex items-center space-x-2'>
          <Button onPress={() => setYear((currYear: number) => currYear - 1)} isIconOnly color='primary' aria-label='Previous year' radius='sm' className='min-w-unit-7 w-unit-7 h-7'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-4 h-4'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </Button>
          <p className='text-xl text-gray-800 font-medium'>{year}</p>
          <Button onPress={() => setYear((currYear: number) => currYear + 1)} isIconOnly color='primary' aria-label='Next year' radius='sm' className='min-w-unit-7 w-unit-7 h-7'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </Button>
        </div>
        <Button onPress={handleDownload} isIconOnly variant='ghost' color='primary' aria-label='Next year' radius='sm' className='min-w-unit-7 w-unit-7 h-7'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3' />
          </svg>
        </Button>
      </div>
    </div>
  )
}

export default Setting
