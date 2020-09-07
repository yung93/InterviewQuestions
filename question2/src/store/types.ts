export interface CartProduct {
    id: number,
    quantity: number,
}

export interface CartState {
    products: CartProduct[]
}