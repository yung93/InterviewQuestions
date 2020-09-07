import { CartProduct } from "../types";
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';

interface AddToCartAction {
    type: typeof ADD_TO_CART,
    payload: CartProduct,
}

interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART,
    payload: CartProduct;
}

interface EmptyCartAction {
    type: typeof EMPTY_CART,
}

export type CartActionTypes = AddToCartAction | RemoveFromCartAction | EmptyCartAction;