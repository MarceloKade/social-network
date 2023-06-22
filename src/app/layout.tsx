import './globals.css'
import { Roboto_Flex as Roboto, Open_Sans as Open, Playfair_Display as Playfair, Noto_Sans as Noto, Nunito } from 'next/font/google'
import { ReactNode } from 'react'

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

const playfair = Playfair({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-playfair'
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
      <body className={`${roboto.variable} ${open.variable} ${playfair.variable} ${noto.variable} ${nunito.variable} font-sans`}>{children}</body>
    </html>
  )
}