export interface RootState {
    cart: CartState,
}

export interface CartProduct {
    SKU: string,
    quantity: number,
}

export interface CartState {
    products: CartProduct[]
}