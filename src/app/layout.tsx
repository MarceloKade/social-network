import './globals.css'
import { Roboto_Flex as Roboto, Open_Sans as Open, Noto_Sans as Noto, Nunito } from 'next/font/google'
import { ReactNode } from 'react'
import { GlobalContextProvider } from './hooks/Context/useGlobalContext'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-roboto'
})

const open = Open({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-open'
})

const noto = Noto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-noto'
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-nunito'
})


export const metadata = {
  title: 'Social Network',
  description: 'Social network project developed with Next.js, React.js, TypeScript, and Tailwind, exploring the use of the Context hook to manage states and effects.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} ${open.variable} ${noto.variable} ${nunito.variable} font-sans`}>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  )
}