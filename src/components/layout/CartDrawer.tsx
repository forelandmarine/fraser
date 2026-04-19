'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/shopify/cart-context'

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    isLoading,
  } = useCart()

  const lines = cart?.lines.edges.map((e) => e.node) ?? []
  const isEmpty = lines.length === 0

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsCartOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [setIsCartOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-black/60 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[201] flex h-full w-full max-w-md flex-col bg-deep-surface text-deep-light transition-transform duration-300 ease-dramatic ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-display text-2xl tracking-wider">CART</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="flex h-10 w-10 items-center justify-center text-deep-mid transition-colors hover:text-deep-light"
            aria-label="Close cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>
        </div>

        {/* Line items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {isEmpty ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-deep-mid">
                Your cart is empty
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="font-mono text-xs uppercase tracking-widest text-deep-mid underline underline-offset-4 transition-colors hover:text-deep-light"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {lines.map((line) => {
                const image =
                  line.merchandise.image ??
                  line.merchandise.product.featuredImage

                // Extract selected options for display
                const size = line.merchandise.selectedOptions.find(
                  (o) => o.name.toLowerCase() === 'size'
                )?.value
                const paper = line.merchandise.selectedOptions.find(
                  (o) => o.name.toLowerCase() === 'paper'
                )?.value
                const frame = line.merchandise.selectedOptions.find(
                  (o) => o.name.toLowerCase() === 'frame'
                )?.value

                return (
                  <li
                    key={line.id}
                    className="flex gap-4 border-b border-white/5 pb-6 last:border-0"
                  >
                    {/* Thumbnail */}
                    {image && (
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-white/5">
                        <Image
                          src={image.url}
                          alt={image.altText ?? line.merchandise.product.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {line.merchandise.product.title}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                          {size && (
                            <span className="font-mono text-[11px] uppercase text-deep-mid">
                              {size}
                            </span>
                          )}
                          {paper && (
                            <span className="font-mono text-[11px] uppercase text-deep-mid">
                              {paper}
                            </span>
                          )}
                          {frame && (
                            <span className="font-mono text-[11px] uppercase text-deep-mid">
                              {frame}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(line.id, line.quantity - 1)
                            }
                            disabled={isLoading}
                            className="flex h-7 w-7 items-center justify-center border border-white/10 font-mono text-xs text-deep-mid transition-colors hover:border-white/30 hover:text-deep-light disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(line.id, line.quantity + 1)
                            }
                            disabled={isLoading}
                            className="flex h-7 w-7 items-center justify-center border border-white/10 font-mono text-xs text-deep-mid transition-colors hover:border-white/30 hover:text-deep-light disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-mono text-sm">
                          {formatPrice(
                            line.cost.totalAmount.amount,
                            line.cost.totalAmount.currencyCode
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(line.id)}
                      disabled={isLoading}
                      className="mt-0.5 self-start text-deep-muted transition-colors hover:text-deep-light disabled:opacity-40"
                      aria-label={`Remove ${line.merchandise.product.title}`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      >
                        <line x1="3" y1="3" x2="11" y2="11" />
                        <line x1="11" y1="3" x2="3" y2="11" />
                      </svg>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && cart && (
          <div className="border-t border-white/10 px-6 py-6">
            {/* Subtotal */}
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-deep-mid">
                Subtotal
              </span>
              <span className="font-mono text-base">
                {formatPrice(
                  cart.cost.subtotalAmount.amount,
                  cart.cost.subtotalAmount.currencyCode
                )}
              </span>
            </div>

            {/* Checkout button */}
            <a
              href={cart.checkoutUrl}
              className="flex h-12 w-full items-center justify-center bg-deep-light font-display text-lg tracking-widest text-deep transition-opacity hover:opacity-90"
            >
              CHECKOUT
            </a>

            {/* Continue shopping */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-3 flex h-10 w-full items-center justify-center border border-white/10 font-mono text-xs uppercase tracking-widest text-deep-mid transition-colors hover:border-white/30 hover:text-deep-light"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
