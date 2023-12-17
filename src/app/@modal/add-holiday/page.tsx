'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Modal from '@/app/components/Modal'

const Add = () => {
  const searchParams = useSearchParams()

  const [control, setControl] = useState<any>({ form: '' })
  const [form, setForm] = useState<any>({
    id: uuidv4(),
    date: searchParams.get('date'),
    name: '',
    type: 'no-repeat',
    diffDay: '',
    addOrSubstract: 'substract',
  })

  // handler
  const handleInput = (e: any) => {
    setForm((currForm: any) => ({ ...currForm, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <Modal title='Hari Libur'>
      <div className={`grid gap-9 transition-all duration-500 ${(control.form as boolean) ? 'w-[846px] grid-cols-2' : 'w-[410px]'} grid-cols-1`}>
        <ul className='space-y-3 w-[410px] bg-white z-10'>
          <li className='border text-lg rounded-md px-4 py-2 hover:bg-purple-50 flex justify-between items-center'>
            nama hari libur
            <div className='space-x-2'>
              <button
                onClick={() => {
                  setControl((currControl: any) => ({ ...currControl, form: 'edit' }))
                }}
                className='p-1 font-medium tracking-wide border capitalize transition-colors duration-300 transform rounded-lg bg-white hover:bg-purple-200 focus:outline-none focus:ring focus:ring-purple-100 focus:ring-opacity-80'
              >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
              </button>
              <button className='p-1 font-medium tracking-wide border capitalize transition-colors duration-300 transform rounded-lg bg-white hover:bg-red-200 focus:outline-none focus:ring focus:ring-red-100 focus:ring-opacity-80'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 text-red-700'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              </button>
            </div>
          </li>
          <li>
            <button
              onClick={() => {
                setControl((currControl: any) => ({ ...currControl, form: 'add' }))
              }}
              className='w-full px-4 py-2 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40'
            >
              Tambah
            </button>
          </li>
        </ul>

        {(control.form as boolean) && (
          <form onSubmit={handleSubmit}>
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
                  className='block  mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
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
                  className='block  mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
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
                      className='block  mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
                    />
                  </div>
                  <div>
                    <label htmlFor='username' className='block text-gray-500'>
                      Hari ditambah/dikurang
                    </label>
                    <select
                      name='addOrSubstract'
                      onChange={handleInput}
                      value={form.addOrSubstract}
                      className='block  mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
                    >
                      <option value='substract'>Dikurang {form.diffDay}</option>
                      <option value='add'>Ditambah {form.diffDay}</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className='mt-6 space-y-3 sm:space-x-4'>
              <button
                onClick={() => {
                  setControl((currControl: any) => ({ ...currControl, form: '' }))
                }}
                className='w-full px-4 py-2 font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-auto hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40'
              >
                Tutup
              </button>

              <button
                type='submit'
                className='w-full px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-md sm:w-auto hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40'
              >
                Simpan
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  )
}

export default Add
