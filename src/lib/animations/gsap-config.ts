'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGSAP() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)

  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
  })

  registered = true
}
