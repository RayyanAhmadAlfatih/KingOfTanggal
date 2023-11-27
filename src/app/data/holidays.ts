import moment from 'moment'

export const initHolidays = {
  baseYear: 2023,
  details: [
    {
      type: 'static',
      date: '01-01',
      day_name: 'Tahun Baru Masehi',
    },
    {
      type: 'static',
      date: '05-01',
      day_name: 'Hari Buruh'
    },
    {
      type: 'static',
      date: '06-01',
      day_name: 'Hari Lahir Pancasila'
    },
    {
      type: 'static',
      date: '08-17',
      day_name: 'Hari Kemerdekaan RI'
    },
    {
      type: 'static',
      date: '12-25',
      day_name: 'Hari Raya Natal'
    },
    {
      type: 'dynamic',
      diff_day: 10,
      date: '02-18',
      day_name: 'Isra\' Mi\'raj Nabi Muhammad SAW',
    },
    {
      type: 'dynamic',
      diff_day: 10,
      date: '03-23',
      day_name: '1 Ramadhan',
    },
    {
      type: 'dynamic',
      diff_day: 10,
      date: '04-22',
      day_name: 'Hari Raya Idul Fitri',
    },
    {
      type: 'dynamic',
      diff_day: 10,
      date: '06-29',
      day_name: 'Hari Raya Idul Adha',
    },
    {
      type: 'dynamic',
      diff_day: 10,
      date: '07-19',
      day_name: 'Tahun Baru Islam',
    },
    {
      type: 'dynamic',
      diff_day: 10,
      date: '09-28',
      day_name: 'Maulid Nabi Muhammad SAW',
    }
  ]
}

export const getHolidays = (year: number) => {
  let holidays: any = localStorage.getItem('holidays')

  if (!holidays) {
    holidays = initHolidays
    localStorage.setItem('holidays', JSON.stringify(initHolidays))
  } else {
    holidays = JSON.parse(holidays)
  }

  const calculatedHolidays = holidays.details.map(h => {
    if (h.type === 'static' || holidays.baseYear === year) return h

    const diffYear = holidays.baseYear - year
    const actualDiffDays = diffYear * (h.diff_day ?? 1)
    if (actualDiffDays > 0) {
      const newDate = moment(`${year}-${h.date}`, 'YYYY-MM-DD').add(actualDiffDays, 'days').format('YYYY-MM-DD')
      return { ...h, date: moment(newDate, 'YYYY-MM-DD').format('MM-DD') }
    } else {
      const newDate = moment(`${year}-${h.date}`, 'YYYY-MM-DD').subtract(actualDiffDays * -1, 'days').format('YYYY-MM-DD')
      return { ...h, date: moment(newDate, 'YYYY-MM-DD').format('MM-DD') }
    }
  })

  return calculatedHolidays
}