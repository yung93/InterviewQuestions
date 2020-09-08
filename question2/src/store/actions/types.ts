import {CartProduct, CartState} from "../types";
export const INIT_CART = 'INIT_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';

interface InitCartAction {
    type: typeof INIT_CART,
    payload: CartState,
}

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

export type CartActionTypes = InitCartAction | AddToCartAction | RemoveFromCartAction | EmptyCartAction;