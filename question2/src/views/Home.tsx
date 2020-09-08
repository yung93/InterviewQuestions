import React, {useCallback, useEffect, useState} from 'react';
import {PageHeader} from "../components/atoms";
import { useDispatch } from 'react-redux'
import {ICategorisedProducts} from "../types/items";
import styled from "@emotion/styled";
import {CategoryRow} from "../components/organisms";
import {addToCart} from "../store/actions/cart.action";

const Container = styled('div')({
    paddingTop: '100px',
    paddingBottom: '100px',
});

const Home = (): JSX.Element => {
    const [categories, setCategories] = useState<ICategorisedProducts[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const categoriesDetails: ICategorisedProducts[] = await (await fetch('api/product')).json();
            setCategories(categoriesDetails);
        } catch (e) {
            // console.error(e);
        }
    }, []);

    const onAddToCart = useCallback((sku) => {
        dispatch(addToCart({ SKU: sku, quantity: 1 }));
    }, []);

    return (
        <div>
            <PageHeader>Discover</PageHeader>
            <Container>
                {
                    categories.map((category) =>
                        <CategoryRow key={`categoryRow_${category.category}`} category={category} onAddToCart={onAddToCart} />
                        )
                }
            </Container>
        </div>
    )
};

export default Home;