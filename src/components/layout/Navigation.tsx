'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CoordinateTracker from './CoordinateTracker'

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Prints', href: '/prints' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500 mix-blend-difference ${
        scrolled
          ? 'bg-[rgba(10,17,32,0.85)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      {/* Wordmark */}
      <Link href="/" className="shrink-0">
        <span className="font-display text-2xl md:text-3xl tracking-wider text-white">
          FRASER EDWARDS
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8 lg:gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-sans font-bold text-[13px] uppercase tracking-[0.2em] text-white hover:text-signal transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Coordinate display */}
      <div className="hidden lg:block shrink-0">
        <CoordinateTracker
          locations={[
            { label: '51.5074°N 0.1278°W', threshold: 0 },
            { label: '43.2965°N 5.3698°E', threshold: 0.25 },
            { label: '36.1408°N 5.3536°W', threshold: 0.5 },
            { label: '25.7617°N 80.1918°W', threshold: 0.75 },
          ]}
        />
      </div>
    </nav>
  )
}
