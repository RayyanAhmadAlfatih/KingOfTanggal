import moment from 'moment'

// model
// const model = {
//   id: uuidv4(),
//   date: searchParams.get('date'),
//   name: '',
//   type: 'no-repeat' | 'repeat-static' | 'repeat-dynamic',
//   diffDay: '10',
//   earlierNextYear: 'earlier' | 'late',
// }

export const initHolidays = [
  {
    id: 'h3',
    date: '2023-01-01',
    name: 'Tahun Baru Masehi',
    type: 'repeat-static',
    diffDay: '',
    earlierNextYear: '',
  },
  {
    id: 'h4',
    date: '2023-05-01',
    name: 'Hari Buruh',
    type: 'repeat-static',
    diffDay: '',
    earlierNextYear: '',
  },
  {
    id: 'h5',
    date: '2023-06-01',
    name: 'Hari Lahir Pancasila',
    type: 'repeat-static',
    diffDay: '',
    earlierNextYear: '',
  },
  {
    id: 'h6',
    date: '2023-08-17',
    name: 'Hari Kemerdekaan RI',
    type: 'repeat-static',
    diffDay: '',
    earlierNextYear: '',
  },
  {
    id: 'h7',
    date: '2023-12-25',
    name: 'Hari Raya Natal',
    type: 'repeat-static',
    diffDay: '',
    earlierNextYear: '',
  },
  {
    id: 'h8',
    date: '2023-02-18',
    name: "Isra' Mi'raj Nabi Muhammad SAW",
    type: 'repeat-dynamic',
    diffDay: 10,
    earlierNextYear: 'earlier',
  },
  {
    id: 'h9',
    date: '2023-03-23',
    name: '1 Ramadhan',
    type: 'repeat-dynamic',
    diffDay: 10,
    earlierNextYear: 'earlier',
  },
  {
    id: 'h10',
    date: '2023-04-22',
    name: 'Hari Raya Idul Fitri',
    type: 'repeat-dynamic',
    diffDay: 10,
    earlierNextYear: 'earlier',
  },
  {
    id: 'h11',
    date: '2023-06-29',
    name: 'Hari Raya Idul Adha',
    type: 'repeat-dynamic',
    diffDay: 10,
    earlierNextYear: 'earlier',
  },
  {
    id: 'h12',
    date: '2023-07-19',
    name: 'Tahun Baru Islam',
    type: 'repeat-dynamic',
    diffDay: 10,
    earlierNextYear: 'earlier',
  },
  {
    id: 'h13',
    date: '2023-09-28',
    name: 'Maulid Nabi Muhammad SAW',
    type: 'repeat-dynamic',
    diffDay: 10,
    earlierNextYear: 'earlier',
  },
]

export const getHolidaysByYear = (year: number) => {
  let holidays: any = localStorage.getItem('holidays')

  // sync with local storage
  if (!holidays) {
    holidays = initHolidays
    localStorage.setItem('holidays', JSON.stringify(initHolidays))
  } else {
    holidays = JSON.parse(holidays)
  }

  const calculatedHolidays = holidays.filter((h: any) => {
    const yearOfHoliday = +moment(h.date, 'YYYY-MM-DD').year()

    if (h.type === 'no-repeat' && yearOfHoliday === year) return h

    if (h.type === 'repeat-static') {
      if (yearOfHoliday === year) return h

      // change year of holiday.date
      const dateWithYearChanged = moment(h.date, 'YYYY-MM-DD').set('year', year).format('YYYY-MM-DD')
      h.date = dateWithYearChanged
      return h
    }

    if (h.type === 'repeat-dynamic') {
      if (yearOfHoliday === year) return h

      // calculate calculate total diff day
      let diffYear = year - yearOfHoliday
      if (diffYear < 0) diffYear * -1
      const totalDiffDay = h.diffDay * diffYear

      // change year of holiday.date first
      const dateWithYearChanged = moment(h.date, 'YYYY-MM-DD').set('year', year).format('YYYY-MM-DD')

      // then add/substract diff days
      let dateWithDayChanged
      if (h.earlierNextYear === 'earlier') {
        dateWithDayChanged = moment(dateWithYearChanged, 'YYYY-MM-DD').clone().subtract(totalDiffDay, 'days').format('YYYY-MM-DD')
      }
      if (h.earlierNextYear === 'late') {
        dateWithDayChanged = moment(dateWithYearChanged, 'YYYY-MM-DD').clone().add(totalDiffDay, 'days').format('YYYY-MM-DD')
      }

      h.date = dateWithDayChanged
      return h
    }
  })

  return calculatedHolidays
}

export const getHolidaysByDate = (date: string) => {
  const year = +moment(date, 'YYYY-MM-DD').year()

  const holidays = getHolidaysByYear(year).filter((item: any) => item.date === date)
  return holidays
}

export const createHoliday = (data: any) => {
  let holidays: any = localStorage.getItem('holidays')
  holidays = JSON.parse(holidays)

  holidays.unshift(data)
  localStorage.setItem('holidays', JSON.stringify(holidays))

  return { success: true }
}

export const deleteHoliday = (id: string) => {
  let holidays: any = localStorage.getItem('holidays')
  holidays = JSON.parse(holidays)

  holidays = holidays.filter((item: any) => item.id !== id)
  localStorage.setItem('holidays', JSON.stringify(holidays))

  return { success: true }
}

export const updateHoliday = (data: any) => {
  let holidays: any = localStorage.getItem('holidays')
  holidays = JSON.parse(holidays)

  holidays = holidays.filter((item: any) => item.id !== data.id)
  holidays.unshift(data)
  localStorage.setItem('holidays', JSON.stringify(holidays))

  return { success: true }
}
