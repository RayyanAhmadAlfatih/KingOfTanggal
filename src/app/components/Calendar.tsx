'use client'

import { ReactNode, useEffect, useState } from 'react'
import Spinner from './Spinner'
import { getHolidaysByYear } from '../data/holidays'
import { formatDateToDM } from '../utils/shared'
import Link from 'next/link'

const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const daysOfWeek = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']

export function Month({ name, year, month }: { name: string; year: number; month: number }): ReactNode {
  const [emptyCells, setEmptyCells] = useState<string[]>([])
  const [daysOfMonth, setDaysOfMonth] = useState<number[]>([])
  const [holidays, setHoliday] = useState<any[]>([])

  useEffect(() => {
    // update empty cells
    setEmptyCells(() => {
      const emptyCellsInAMonth: string[] = []
      const startingDay: number = new Date(year, month, 1).getDay()
      for (let day = 1; day <= startingDay; day++) {
        emptyCellsInAMonth.push('')
      }
      return emptyCellsInAMonth
    })

    // update days
    setDaysOfMonth(() => {
      const daysInAMonth: number[] = []
      const amountDaysInMonth: number = new Date(year, month + 1, 0).getDate()
      for (let day = 1; day <= amountDaysInMonth; day++) {
        daysInAMonth.push(day)
      }
      return daysInAMonth
    })

    // update holidays
    setHoliday(() => getHolidaysByYear(year))
  }, [year])

  const getDate = (year: number, month: number, day: number): string => {
    const YYYY = year
    const MM = month + 1 <= 9 ? '0' + (month + 1) : month + 1
    const DD = day <= 9 ? '0' + day : day
    const date = `${YYYY}-${MM}-${DD}`
    return date
  }

  const isHoliday = (year: number, month: number, day: number): boolean => {
    const YYYY = year
    const MM = month + 1 <= 9 ? '0' + (month + 1) : month + 1
    const DD = day <= 9 ? '0' + day : day
    const date = `${YYYY}-${MM}-${DD}`

    const isHolidayInThisDate = holidays.findIndex((item) => item.date === date)
    return isHolidayInThisDate >= 0
  }

  const holidaysInThisMonth = () => {
    const checkHolidaysInThisMonth = holidays.filter((item) => new Date(item.date).getMonth() === month)
    return checkHolidaysInThisMonth
  }

  return (
    <>
      {daysOfMonth.length > 0 ? (
        <div>
          <div>
            <div className='font-medium text-center mb-2'>{name}</div>
            <div className='min-h-[250px]'>
              <div className='grid grid-cols-7 text-xs'>
                {daysOfWeek.map((dayName: string, idx: number) => (
                  <div className='text-center py-2.5' key={idx}>
                    {dayName}
                  </div>
                ))}
                {emptyCells.map((day: string, idx: number) => (
                  <div className='text-center py-2.5' key={idx}>
                    {day}
                  </div>
                ))}
                {daysOfMonth.map((day: number, idx: number) => (
                  <Link
                    href={`/add-holiday?date=${getDate(year, month, day)}`}
                    className={`text-center py-2.5 hover:bg-purple-200 cursor-pointer ${
                      isHoliday(year, month, day) ? 'text-red-400' : '[&:nth-child(7n+1)]:text-red-400 [&:nth-child(7n+6)]:text-green-600'
                    }`}
                    key={idx}
                  >
                    {day}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div>
            <table className='text-xs mt-2 border-t'>
              <tbody>
                {holidaysInThisMonth().map((item, idx) => (
                  <tr key={idx} className='group'>
                    <td className='font-medium group-first:pt-2 w-[86px] align-top'>{formatDateToDM(item.date)}</td>
                    <td className='font-medium group-first:pt-2 align-top'>:</td>
                    <td className='font-medium group-first:pt-2 pl-1 align-top'>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <Spinner />
        </div>
      )}
    </>
  )
}

export default function Calendar({ year }: { year: number }): ReactNode {
  return (
    <div id='calendar' className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='bg-purple-300 p-6'>
        <div className='flex items-center space-x-2'>
          <h1 className='text-3xl text-gray-800 font-medium'>Kalender {year}</h1>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10 px-6'>
        {months.map((month: string, idx: number) => (
          <Month key={idx} name={month} year={year} month={+idx} />
        ))}
      </div>
      <div className='flex justify-center py-6'>
        <a className='text-blue-300 font-medium text-sm' href='https://www.linkedin.com/in/aulia-sabri-a339711a3/'>
          &copy; auliasabri.io
        </a>
      </div>
    </div>
  )
}
