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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 md:px-10 py-4 md:py-5 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(10,17,32,0.85)] backdrop-blur-md'
            : 'bg-transparent mix-blend-difference'
        }`}
      >
        {/* Wordmark */}
        <Link href="/" className="shrink-0">
          <span className="font-display text-lg md:text-3xl tracking-wider text-white">
            FRASER EDWARDS
          </span>
        </Link>

        {/* Nav links - desktop */}
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

        {/* Hamburger button - mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="block w-6 h-[2px] bg-white" />
          <span className="block w-6 h-[2px] bg-white" />
          <span className="block w-6 h-[2px] bg-white" />
        </button>

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

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[150] bg-deep flex flex-col items-center justify-center transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-6 flex items-center justify-center w-10 h-10"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>

        {/* Mobile nav links */}
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-4xl uppercase tracking-wider text-white hover:text-signal transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
