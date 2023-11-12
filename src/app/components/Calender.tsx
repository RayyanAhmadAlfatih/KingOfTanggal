import { ReactNode, useEffect, useState } from 'react';
import Spinner from './Spinner';
import { centuryHolidays, hijriahHolidays } from '../data/holidays';
import { formatDateToDM } from '../utils/shared';
import moment from 'moment';

const months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'Desember'
];
const daysOfWeek = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];

export function Month({ name, year, month }: { name: string, year: number, month: number }): ReactNode {
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

  const isHoliday = (year: number, month: number, day: number): boolean => {
    const YYYY = year
    const MM = (month + 1) <= 9 ? '0' + (month + 1) : month + 1
    const DD = day <= 9 ? '0' + day : day
    const date = `${YYYY}-${MM}-${DD}`

    const isHolidayInCenturyCalendar = centuryHolidays.findIndex((item) => `${year}-${item.date}` === date)
    const isHolidayInHijriahCalendar = hijriahHolidays.details.findIndex((item) => {
      if (hijriahHolidays.baseYear === year) {
        return `${year}-${item.date}` === date
      } else {
        const diffYear = hijriahHolidays.baseYear - year
        const diffDays = diffYear * 10
        if (diffDays > 0) {
          const newDate = moment(`${year}-${item.date}`, 'YYYY-MM-DD').add(diffDays, 'days').format('YYYY-MM-DD')
          return newDate === date
        } else {
          const newDate = moment(`${year}-${item.date}`, 'YYYY-MM-DD').subtract(diffDays * -1, 'days').format('YYYY-MM-DD')
          return newDate === date
        }
      }
    })

    return isHolidayInCenturyCalendar >= 0 || isHolidayInHijriahCalendar >= 0
  }

  const holidaysInThisMonth = () => {
    const holidaysInCentury = centuryHolidays.filter(item => (new Date(`${year}-${item.date}`).getMonth()) === month)

    let newHijriahHolidays = { ...hijriahHolidays }
    if (hijriahHolidays.baseYear !== year) {
      const newDetails = hijriahHolidays.details.map(item => {
        const diffYear = hijriahHolidays.baseYear - year
        const diffDays = diffYear * 10
        if (diffDays > 0) {
          const newDate = moment(`${year}-${item.date}`, 'YYYY-MM-DD').add(diffDays, 'days').format('MM-DD')
          return { ...item, date: newDate }
        } else {
          const newDate = moment(`${year}-${item.date}`, 'YYYY-MM-DD').subtract(diffDays * -1, 'days').format('MM-DD')
          return { ...item, date: newDate }
        }
      })

      newHijriahHolidays = { ...hijriahHolidays, details: newDetails }
    }
    const holidaysInHijriah = newHijriahHolidays.details.filter(item => (new Date(`${year}-${item.date}`).getMonth()) === month)
    console.log(holidaysInHijriah)
    return [...holidaysInCentury, ...holidaysInHijriah]
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
                  <div className='text-center py-2.5 hover:bg-purple-200' key={idx}>{dayName}</div>
                ))}
                {emptyCells.map((day: string, idx: number) => (
                  <div className='text-center py-2.5 hover:bg-purple-200' key={idx}>{day}</div>
                ))}
                {daysOfMonth.map((day: number, idx: number) => (
                  <div className={`text-center py-2.5 hover:bg-purple-200 ${isHoliday(year, month, day) ? 'text-red-400' : '[&:nth-child(7n+1)]:text-red-400 [&:nth-child(7n+6)]:text-green-600'}`} key={idx}>{day}</div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <table className='text-xs mt-2 border-t'>
              <tbody>
                {holidaysInThisMonth().map((item) => (
                  <tr className='group'>
                    <td className='group-first:pt-2 w-[86px]'>{formatDateToDM(`${year}-${item.date}`)}</td>
                    <td className='group-first:pt-2'>:</td>
                    <td className='group-first:pt-2 pl-1'>{item.day_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : <div className='text-center'><Spinner /></div>}
    </>

  )
}

export default function Calendar({ year }: { year: number }): ReactNode {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10 px-6'>
      {months.map((month: string, idx: number) => <Month key={idx} name={month} year={year} month={+idx} />)}
    </div>
  )
}