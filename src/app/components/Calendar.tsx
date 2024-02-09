'use client'

import { ReactNode, useEffect, useState } from 'react'
import Spinner from './Spinner'
import { getHolidaysByYear } from '../data/holidays'
import { formatDateToDM } from '../utils/shared'
import { Button } from '@nextui-org/button'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal'
import Link from 'next/link'
import ManageEvents from './ManageEvents'

const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const daysOfWeek = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']

export function Month({ name, year, month, holidays, handleClickDate }: any): ReactNode {
  const [emptyCells, setEmptyCells] = useState<string[]>([])
  const [daysOfMonth, setDaysOfMonth] = useState<number[]>([])

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

    const isHolidayInThisDate = holidays.findIndex((item: any) => item.date === date)
    return isHolidayInThisDate >= 0
  }

  const holidaysInThisMonth = () => {
    const checkHolidaysInThisMonth = holidays.filter((item: any) => new Date(item.date).getMonth() === month)
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
                  // <Link
                  //   href={`/add-holiday?date=${getDate(year, month, day)}`}
                  //   className={`text-center py-2.5 hover:bg-purple-200 cursor-pointer ${
                  //     isHoliday(year, month, day) ? 'text-red-400' : '[&:nth-child(7n+1)]:text-red-400 [&:nth-child(7n+6)]:text-green-600'
                  //   }`}
                  //   key={idx}
                  // >
                  //   {day}
                  // </Link>
                  <Button
                    variant='light'
                    color='primary'
                    radius='sm'
                    onPress={() => handleClickDate(getDate(year, month, day))}
                    className={`min-w-unit-0 w-full text-dark ${isHoliday(year, month, day) ? 'text-red-400' : '[&:nth-child(7n+1)]:text-red-400 [&:nth-child(7n+6)]:text-green-600'}`}
                    key={idx}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <table className='text-xs mt-2 border-t'>
              <tbody>
                {holidaysInThisMonth().map((item: any, idx: number) => (
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [currentDate, setCurrentDate] = useState<string>('')
  const [holidays, setHoliday] = useState<any[]>([])

  // effect
  useEffect(() => {
    // get holidays
    getHolidaysInYear()
  }, [year])

  // function
  const getHolidaysInYear = () => {
    setHoliday(() => getHolidaysByYear(year))
  }

  // handler
  const handleClickDate = (date: string) => {
    setCurrentDate(date)
    onOpen()
  }

  return (
    <>
      <div id='calendar' className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='bg-purple-300 p-6'>
          <div className='flex items-center space-x-2'>
            <h1 className='text-3xl text-gray-800 font-medium'>Kalender {year}</h1>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10 px-6'>
          {months.map((month: string, idx: number) => (
            <Month key={idx} name={month} year={year} month={+idx} holidays={holidays} handleClickDate={handleClickDate} />
          ))}
        </div>
        <div className='flex justify-center py-6'>
          <a className='text-blue-300 font-medium text-sm' href='https://www.linkedin.com/in/aulia-sabri-a339711a3/'>
            &copy; auliasabri.io
          </a>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} placement='top' classNames={{ base: 'max-w-fit pb-4', header: 'text-2xl', closeButton: 'top-4 right-6' }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Event</ModalHeader>
              <ModalBody>
                <ManageEvents date={currentDate} getHolidaysInYear={getHolidaysInYear} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
