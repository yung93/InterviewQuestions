import {INIT_CART, ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, CartActionTypes} from "./types";
import {CartProduct, CartState} from "../types";

export const initCart = (cart: CartState): CartActionTypes => {
    return {
        type: INIT_CART,
        payload: cart,
    }
};

export const addToCart = (product: CartProduct): CartActionTypes => {
    return {
        type: ADD_TO_CART,
        payload: product,
    }
};

export const removeFromCart = (product: CartProduct): CartActionTypes => {
    return {
        type: REMOVE_FROM_CART,
        payload: product,
    }
};

export const emptyCart = (): CartActionTypes => {
    return {
        type: EMPTY_CART,
    }
};