import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        style={{ background: 'url("i-like-food.svg")' }}
        className={inter.className}
      >
        <div className='max-w-screen-lg mx-auto'>
          {props.children}
          {props.modal}
        </div>
      </body>
    </html>
  )
}
