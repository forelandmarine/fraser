import type { Metadata } from 'next'
import { Bebas_Neue, Archivo, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'
import { WebGLProvider } from '@/components/webgl/WebGLProvider'

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fraser Edwards Photography',
  description:
    'International adventure and maritime photographer capturing life on the water, from superyacht regattas to remote ocean crossings.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${archivo.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col">
        <SmoothScroll>
          <Navigation />
          <div id="scrollProgress" className="scroll-progress" />
          <main className="flex-1">{children}</main>
          <Footer />
          <WebGLProvider />
        </SmoothScroll>
      </body>
    </html>
  )
}
