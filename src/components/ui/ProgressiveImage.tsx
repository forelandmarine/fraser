'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'

interface ProgressiveImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  onLoad?: () => void
}

export function ProgressiveImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  onLoad,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true)
      onLoad?.()
    }
  }, [onLoad])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Shimmer placeholder */}
      <div
        className={cn(
          'absolute inset-0 bg-current/5 transition-opacity duration-700',
          loaded ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              'linear-gradient(110deg, transparent 30%, rgba(27,107,147,0.05) 50%, transparent 70%)',
            animation: 'shimmer 2.5s ease-in-out infinite',
          }}
        />
      </div>

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          'w-full h-full object-cover transition-all duration-700',
          loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
          imgClassName
        )}
        onLoad={() => {
          setLoaded(true)
          onLoad?.()
        }}
      />
    </div>
  )
}
