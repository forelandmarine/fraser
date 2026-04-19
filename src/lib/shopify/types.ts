export type Money = {
  amount: string
  currencyCode: string
}

export type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type SelectedOption = {
  name: string
  value: string
}

export type ShopifyVariant = {
  id: string
  title: string
  availableForSale: boolean
  price: Money
  selectedOptions: SelectedOption[]
  image?: ShopifyImage
}

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  availableForSale: boolean
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  featuredImage: ShopifyImage | null
  images: {
    edges: { node: ShopifyImage }[]
  }
  variants: {
    edges: { node: ShopifyVariant }[]
  }
}

export type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: SelectedOption[]
    product: {
      title: string
      handle: string
      featuredImage: ShopifyImage | null
    }
    price: Money
    image?: ShopifyImage
  }
  cost: {
    totalAmount: Money
  }
}

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: Money
    totalTaxAmount: Money | null
    totalAmount: Money
  }
  lines: {
    edges: { node: ShopifyCartLine }[]
  }
}

// Response wrappers
export type ShopifyProductResponse = {
  product: ShopifyProduct
}

export type ShopifyProductsResponse = {
  products: {
    edges: { node: ShopifyProduct }[]
  }
}

export type ShopifyCartResponse = {
  cart: ShopifyCart
}

export type CartCreateResponse = {
  cartCreate: {
    cart: ShopifyCart
    userErrors: ShopifyUserError[]
  }
}

export type CartLinesAddResponse = {
  cartLinesAdd: {
    cart: ShopifyCart
    userErrors: ShopifyUserError[]
  }
}

export type CartLinesUpdateResponse = {
  cartLinesUpdate: {
    cart: ShopifyCart
    userErrors: ShopifyUserError[]
  }
}

export type CartLinesRemoveResponse = {
  cartLinesRemove: {
    cart: ShopifyCart
    userErrors: ShopifyUserError[]
  }
}

export type ShopifyUserError = {
  field: string[]
  message: string
}
