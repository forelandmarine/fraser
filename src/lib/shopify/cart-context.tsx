'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import type { ShopifyCart, ShopifyCartLine } from './types'

type CartContextValue = {
  cart: ShopifyCart | null
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addToCart: (merchandiseId: string, quantity?: number) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextValue | null>(null)

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

function setCookie(name: string, value: string, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Restore cart from cookie on mount
  useEffect(() => {
    const cartId = getCookie('shopify_cart_id')
    if (!cartId) return

    async function fetchCart() {
      try {
        const res = await fetch(`/api/cart?cartId=${encodeURIComponent(cartId!)}`)
        if (res.ok) {
          const data = await res.json()
          if (data.cart) setCart(data.cart)
        }
      } catch {
        // Cart may have expired, that is fine
      }
    }

    fetchCart()
  }, [])

  const addToCart = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setIsLoading(true)
      try {
        const cartId = getCookie('shopify_cart_id')

        // Optimistic: open the cart drawer immediately
        setIsCartOpen(true)

        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartId: cartId || undefined,
            lines: [{ merchandiseId, quantity }],
          }),
        })

        if (!res.ok) throw new Error('Failed to add to cart')

        const data = await res.json()
        const updatedCart = data.cart as ShopifyCart

        setCart(updatedCart)
        setCookie('shopify_cart_id', updatedCart.id)
      } catch (error) {
        console.error('addToCart error:', error)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return
      setIsLoading(true)

      // Optimistic update
      const previousCart = cart
      setCart((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          lines: {
            edges: prev.lines.edges
              .map((edge) => {
                if (edge.node.id !== lineId) return edge
                if (quantity <= 0) return null
                return {
                  node: {
                    ...edge.node,
                    quantity,
                    cost: {
                      totalAmount: {
                        ...edge.node.cost.totalAmount,
                        amount: String(
                          parseFloat(edge.node.merchandise.price.amount) * quantity
                        ),
                      },
                    },
                  },
                }
              })
              .filter(Boolean) as { node: ShopifyCartLine }[],
          },
        }
      })

      try {
        if (quantity <= 0) {
          const res = await fetch('/api/cart', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cartId: cart.id,
              lineIds: [lineId],
            }),
          })

          if (!res.ok) throw new Error('Failed to remove item')

          const data = await res.json()
          setCart(data.cart)
        } else {
          const res = await fetch('/api/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cartId: cart.id,
              lines: [{ id: lineId, quantity }],
            }),
          })

          if (!res.ok) throw new Error('Failed to update quantity')

          const data = await res.json()
          setCart(data.cart)
        }
      } catch (error) {
        console.error('updateQuantity error:', error)
        // Roll back optimistic update
        setCart(previousCart)
      } finally {
        setIsLoading(false)
      }
    },
    [cart]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return
      setIsLoading(true)

      // Optimistic update
      const previousCart = cart
      setCart((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          lines: {
            edges: prev.lines.edges.filter((edge) => edge.node.id !== lineId),
          },
        }
      })

      try {
        const res = await fetch('/api/cart', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartId: cart.id,
            lineIds: [lineId],
          }),
        })

        if (!res.ok) throw new Error('Failed to remove item')

        const data = await res.json()
        setCart(data.cart)
      } catch (error) {
        console.error('removeItem error:', error)
        setCart(previousCart)
      } finally {
        setIsLoading(false)
      }
    },
    [cart]
  )

  return (
    <CartContext value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeItem,
      isLoading,
    }}>
      {children}
    </CartContext>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
