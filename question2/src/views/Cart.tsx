import React, {useCallback, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Button, PageHeader} from "../components/atoms";
import {ICartProduct} from "../types/items";
import styled from "@emotion/styled";
import {CartTable} from "../components/organisms";
import {colors} from "../styles/variables";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/types";
import {addToCart, removeFromCart} from "../store/actions/cart.action";

const Container = styled('div')({
    paddingTop: '100px',
    paddingBottom: '100px',
});

const Divider = styled('div')({
    width: '100%',
    height: '1px',
    marginTop: '30px',
    marginBottom: '30px',
    backgroundColor: colors.teal,
});

const Summary = styled('div')({
    textAlign: 'right',
    fontSize: '14pt',
});

const Total = styled('div')({
    fontSize: '18pt',
    fontWeight: 'bold',
    color: colors.teal,
});

const StyledButton = styled(Button)({
    width: '200px',
    marginTop: '10px',
    marginLeft: 'auto',
});

const Cart = (): JSX.Element => {
    const [products, setProducts] = useState<ICartProduct[]>([]);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [taxToal, setTaxToal] = useState<number>(0);
    const cartProducts = useSelector((state: RootState) => state.cart.products);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        mapQuantity();
    }, [cartProducts]);

    useEffect(() => {
        setSubTotal(products.reduce((acc, product) => (product.price * product.quantity) + acc, 0));
        setTaxToal(products.reduce((acc, product) => ((product.vat + product.importVat) * product.quantity) + acc, 0));
    }, [products]);

    const fetchDetails = useCallback(async () => {
        try {
            const cartProductsDetails: ICartProduct[] = await (await fetch('api/product/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    skus: cartProducts.map((product) => product.SKU),
                }),
            })).json();
            mapQuantity(cartProductsDetails);
        } catch (e) {
            // console.error(e);
        }
    }, [cartProducts]);

    const mapQuantity = useCallback((initProducts?: ICartProduct[]) => {
        const mapProducts = initProducts || products;
        const productQuantityMap = new Map<string, number>();
        cartProducts.forEach((product) => productQuantityMap.set(product.SKU, product.quantity));
        setProducts(mapProducts
            .map((product) => ({ ...product, quantity: productQuantityMap.get(product.SKU) || 0 }))
            .filter((product) => product.quantity > 0)
        );
    }, [products, cartProducts]);

    const onAddProductClick = useCallback((sku) => {
        dispatch(addToCart({ SKU: sku, quantity: 1 }));
    }, []);

    const onRemoveProductClick = useCallback((sku) => {
        dispatch(removeFromCart({ SKU: sku, quantity: 1 }));
    }, []);

    const onCheckoutClick = useCallback(async () => {
        if (cartProducts.length <= 0) return;
        try {
            const transaction = await (await fetch('api/transaction/summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ products: cartProducts }),
            })).json();
            history.push(`/checkout/${transaction.id}`);
        } catch (e) {
            // console.error(e);
        }
    }, [cartProducts]);

    return (
        <div>
            <PageHeader>Cart</PageHeader>
            <Container>
                <CartTable products={products} onAddProductClick={onAddProductClick} onRemoveProductClick={onRemoveProductClick} />
                <Divider/>
                <Summary>
                    <div>Subtoal: ${subTotal.toFixed(2)}</div>
                    <div>Tax: ${taxToal.toFixed(2)}</div>
                    <Total>Total to pay: ${(subTotal + taxToal).toFixed(2)}</Total>
                    <StyledButton onClick={onCheckoutClick}>Proceed to Checkout</StyledButton>
                </Summary>
            </Container>
        </div>
    )
};

export default Cart;