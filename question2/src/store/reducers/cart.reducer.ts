import {CartState, CartProduct} from "../types";
import {CartActionTypes, INIT_CART, ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART} from "../actions/types";

const initialState: CartState = {
    products: [],
};

const findProductIndex = (cartProducts: CartProduct[], product: CartProduct): number => {
    return cartProducts.findIndex(p => p.SKU === product.SKU);
};

const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
    let cartProducts = [...state.products];
    let foundIndex = -1;
    switch(action.type) {
        case INIT_CART:
            return action.payload;
        case ADD_TO_CART:
            const newProduct = action.payload;
            foundIndex = findProductIndex(cartProducts, newProduct);
            if (foundIndex < 0) {
                cartProducts = [...state.products, newProduct];
            } else {
                cartProducts[foundIndex] = { ...newProduct, quantity: newProduct.quantity + cartProducts[foundIndex].quantity};
            }
            localStorage.setItem('cart', JSON.stringify({ ...state, products: cartProducts }));
            return { ...state, products: cartProducts };

        case REMOVE_FROM_CART:
            const removeProduct = action.payload;
            foundIndex = findProductIndex(cartProducts, removeProduct);
            if (foundIndex >= 0) {
                cartProducts[foundIndex].quantity -= removeProduct.quantity;
                if (cartProducts[foundIndex].quantity <= 0) {
                    cartProducts.splice(foundIndex, 1);
                }
            }
            localStorage.setItem('cart', JSON.stringify({ ...state, products: cartProducts }));
            return { ...state, products: cartProducts };
        case EMPTY_CART:
            localStorage.removeItem('cart');
            return { ...state, products: [] };
        default:
            return state;
    }
};

export default cartReducer;