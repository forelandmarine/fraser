'use client'

import { useEffect } from 'react'

export function useScrollProgress(elementId: string) {
  useEffect(() => {
    const el = document.getElementById(elementId)
    if (!el) return

    function onScroll() {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      el!.style.width = `${pct}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [elementId])
}
