'use client'

import { useState } from 'react'
import Calendar from './components/Calendar'
import Setting from './components/Setting'
import Modal from './components/Modal'

export default function Home() {
  const [year, setYear] = useState<number>(2024)

  return (
    <div>
      <div className='m-3 p-5 backdrop-blur rounded-lg shadow-md'>
        <Setting year={year} setYear={setYear} />
      </div>
      <div id='calendar' className='m-3 bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='bg-purple-300 p-6'>
          <div className='flex items-center space-x-2'>
            <h1 className='text-3xl text-gray-800 font-medium'>Kalender {year}</h1>
          </div>
        </div>
        <Calendar year={year} />
        <div className='flex justify-center py-6'>
          <a className='text-blue-300 font-medium text-sm' href='https://www.linkedin.com/in/aulia-sabri-a339711a3/'>
            &copy; auliasabri.io
          </a>
        </div>
      </div>
    </div>
  )
}
