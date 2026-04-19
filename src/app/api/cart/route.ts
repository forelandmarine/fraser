import { NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'
import { GET_CART } from '@/lib/shopify/queries'
import { CREATE_CART, ADD_TO_CART, UPDATE_CART_LINES, REMOVE_FROM_CART } from '@/lib/shopify/mutations'
import type {
  ShopifyCartResponse,
  CartCreateResponse,
  CartLinesAddResponse,
  CartLinesUpdateResponse,
  CartLinesRemoveResponse,
} from '@/lib/shopify/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const cartId = searchParams.get('cartId')

    if (!cartId) {
      return NextResponse.json({ error: 'cartId is required' }, { status: 400 })
    }

    const data = await shopifyFetch<ShopifyCartResponse>({
      query: GET_CART,
      variables: { cartId },
    })

    return NextResponse.json({ cart: data.cart })
  } catch (error) {
    console.error('Cart GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cartId, lines } = body as {
      cartId?: string
      lines: { merchandiseId: string; quantity: number }[]
    }

    if (cartId) {
      // Add to existing cart
      const data = await shopifyFetch<CartLinesAddResponse>({
        query: ADD_TO_CART,
        variables: { cartId, lines },
      })

      if (data.cartLinesAdd.userErrors.length > 0) {
        return NextResponse.json(
          { errors: data.cartLinesAdd.userErrors },
          { status: 400 }
        )
      }

      return NextResponse.json({ cart: data.cartLinesAdd.cart })
    }

    // Create new cart
    const data = await shopifyFetch<CartCreateResponse>({
      query: CREATE_CART,
      variables: { input: { lines } },
    })

    if (data.cartCreate.userErrors.length > 0) {
      return NextResponse.json(
        { errors: data.cartCreate.userErrors },
        { status: 400 }
      )
    }

    return NextResponse.json({ cart: data.cartCreate.cart })
  } catch (error) {
    console.error('Cart POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create or update cart' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { cartId, lines } = body as {
      cartId: string
      lines: { id: string; quantity: number }[]
    }

    const data = await shopifyFetch<CartLinesUpdateResponse>({
      query: UPDATE_CART_LINES,
      variables: { cartId, lines },
    })

    if (data.cartLinesUpdate.userErrors.length > 0) {
      return NextResponse.json(
        { errors: data.cartLinesUpdate.userErrors },
        { status: 400 }
      )
    }

    return NextResponse.json({ cart: data.cartLinesUpdate.cart })
  } catch (error) {
    console.error('Cart PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update cart lines' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { cartId, lineIds } = body as {
      cartId: string
      lineIds: string[]
    }

    const data = await shopifyFetch<CartLinesRemoveResponse>({
      query: REMOVE_FROM_CART,
      variables: { cartId, lineIds },
    })

    if (data.cartLinesRemove.userErrors.length > 0) {
      return NextResponse.json(
        { errors: data.cartLinesRemove.userErrors },
        { status: 400 }
      )
    }

    return NextResponse.json({ cart: data.cartLinesRemove.cart })
  } catch (error) {
    console.error('Cart DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to remove cart lines' },
      { status: 500 }
    )
  }
}
