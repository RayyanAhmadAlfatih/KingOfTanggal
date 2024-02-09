'use client'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createHoliday, deleteHoliday, getHolidaysByDate, updateHoliday } from '@/app/data/holidays'
import { Button } from '@nextui-org/button'

const ManageEvents = ({ date, getHolidaysInYear }: any) => {
  // state
  const [control, setControl] = useState<any>({ form: '', onSubmit: false, onDelete: false, deleteId: '' })
  const [holidays, setHolidays] = useState([])
  const [form, setForm] = useState<any>({
    id: uuidv4(),
    date: date,
    name: '',
    type: 'no-repeat',
    diffDay: '',
    earlierNextYear: 'earlier',
  })

  // effect
  useEffect(() => {
    getHolidaysInDate()
  }, [])

  // function
  const getHolidaysInDate = () => {
    const currentDate = date ?? ''
    setHolidays(getHolidaysByDate(currentDate))
  }

  // handler
  const handleInput = (e: any) => {
    setForm((currForm: any) => ({ ...currForm, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    setControl((currControl: any) => ({ ...currControl, onSubmit: true }))
    let response: any
    if (control.form === 'add') {
      response = createHoliday(form)
    }

    if (control.form === 'edit') {
      response = updateHoliday(form)
    }

    if (response.success) {
      setTimeout(() => {
        setForm({
          id: uuidv4(),
          date: date,
          name: '',
          type: 'no-repeat',
          diffDay: '',
          earlierNextYear: 'earlier',
        })
        setControl((currControl: any) => ({ ...currControl, form: '', onSubmit: false }))
        getHolidaysInDate()
        getHolidaysInYear()
      }, 1000)
    }
  }

  const handleDelete = (id: string) => {
    const response = deleteHoliday(id)

    setControl((currControl: any) => ({ ...currControl, onDelete: true, deleteId: id }))
    if (response.success) {
      setTimeout(() => {
        setControl((currControl: any) => ({ ...currControl, onDelete: false, deleteId: '' }))
        getHolidaysInDate()
        getHolidaysInYear()
      }, 1000)
    }
  }

  const handleAdd = () => {
    setControl((currControl: any) => ({ ...currControl, form: 'add' }))
    setForm({
      id: uuidv4(),
      date: date,
      name: '',
      type: 'no-repeat',
      diffDay: '',
      earlierNextYear: 'earlier',
    })
  }

  const handleEdit = (item: any) => {
    setControl((currControl: any) => ({ ...currControl, form: 'edit' }))
    setForm(item)
  }

  return (
    <div className={`lg:grid gap-9 transition-all duration-500 ${(control.form as boolean) ? 'w-[340px] lg:w-[846px] grid-cols-2' : 'w-[340px] lg:w-[410px]'} grid-cols-1`}>
      <ul className='space-y-3 min-w-0 w-[340px] lg:w-[410px] bg-white z-10'>
        {holidays.map((item: any) => (
          <li key={item.id} className='border text-lg rounded-md px-4 py-2 hover:bg-purple-50 flex justify-between items-center'>
            {item.name}
            <div className='space-x-2'>
              <Button onPress={() => handleEdit(item)} isIconOnly variant='ghost' aria-label='Edit' radius='sm' className='min-w-unit-7 w-unit-7 h-7'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
              </Button>
              <Button
                onPress={() => handleDelete(item.id)}
                isIconOnly
                color='danger'
                variant='ghost'
                aria-label='Edit'
                radius='sm'
                isLoading={control.onDelete && control.deleteId === item.id}
                spinner={
                  <svg className='animate-spin h-5 w-5 text-current' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                    <path className='opacity-75' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' fill='currentColor' />
                  </svg>
                }
                className='min-w-unit-7 w-unit-7 h-7'
              >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              </Button>
            </div>
          </li>
        ))}
        <li>
          <Button onPress={handleAdd} fullWidth color='primary' radius='sm' className='py-6 text-lg font-medium tracking-wide capitalize'>
            Tambah
          </Button>
        </li>
      </ul>

      {(control.form as boolean) && (
        <form onSubmit={handleSubmit} className='mt-5 lg-mt-0'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='Birthday' className='block text-gray-500'>
                Tanggal
              </label>
              <input
                type='date'
                name='date'
                onChange={handleInput}
                value={form.date}
                required
                className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white pl-5 pr-3 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
              />
            </div>
            <div>
              <label htmlFor='username' className='block text-gray-500'>
                Nama
              </label>
              <input
                type='text'
                name='name'
                onChange={handleInput}
                value={form.name}
                required
                className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
              />
            </div>
            <div>
              <label htmlFor='username' className='block text-gray-500'>
                Tipe
              </label>
              <select
                name='type'
                onChange={handleInput}
                value={form.type}
                required
                className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
              >
                <option value='no-repeat'>Tidak berulang tiap tahun</option>
                <option value='repeat-static'>Berulang pada tanggal yang sama setiap tahun</option>
                <option value='repeat-dynamic'>Berulang pada tanggal yang berbeda setiap tahun</option>
              </select>
            </div>
            {form.type === 'repeat-dynamic' && (
              <>
                <div>
                  <label htmlFor='username' className='block text-gray-500'>
                    Jumlah beda hari tahun berikutnya
                  </label>

                  <input
                    type='number'
                    name='diffDay'
                    onChange={handleInput}
                    value={form.diffDay}
                    required
                    className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
                  />
                </div>
                <div>
                  <label htmlFor='username' className='block text-gray-500'>
                    Hari libur terjadi lebih awal ditahun berikutnya
                  </label>
                  <select
                    name='earlierNextYear'
                    onChange={handleInput}
                    value={form.earlierNextYear}
                    required
                    className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
                  >
                    <option value='earlier'>Ya, lebih awal</option>
                    <option value='late'>Tidak, lebih Lambat</option>
                  </select>
                </div>
              </>
            )}
          </div>
          <div className='mt-6 flex space-x-4'>
            <Button
              onPress={() => {
                setControl((currControl: any) => ({ ...currControl, form: '' }))
              }}
              variant='ghost'
              radius='sm'
              className='py-6 text-base font-medium tracking-wide capitalize'
            >
              Tutup
            </Button>
            <Button
              color='primary'
              radius='sm'
              type='submit'
              className='py-6 text-base font-medium tracking-wide capitalize'
              isLoading={control.onSubmit}
              spinner={
                <svg className='animate-spin h-5 w-5 text-current' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                  <path className='opacity-75' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' fill='currentColor' />
                </svg>
              }
            >
              Simpan
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ManageEvents
