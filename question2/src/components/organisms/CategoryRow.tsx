import React, {ReactNode} from 'react';
import styled from '@emotion/styled';
import {ICategorisedProducts} from "../../types/items";
import {ProductBlock} from "../molecules";
import {colors} from "../../styles/variables";

type CategoryRowProps = {
    className?: string;
    category: ICategorisedProducts;
    onAddToCart: (sku: string) => void;
}

const StyledCategoryRow = styled('div')(
    {
        '&:not(:last-child)': {
            marginBottom: '130px',
        }
    }
);

const Header = styled('div')({
    fontFamily: 'Keep Calm',
    fontSize: '20pt',
    color: colors.teal,
    marginBottom: '30px',
});

const Row = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    '&>div': {
        marginBottom: '20px',
    },
    '&>div:not(:last-child)': {
        marginRight: '100px',
    }
});

const CategoryRow = (props: CategoryRowProps): JSX.Element  => {
    const { className, onAddToCart } = props;
    const { products, category } = props.category;
    return (
        <StyledCategoryRow className={className}>
            <Header>{ category }</Header>
            <Row>
                {
                    products.map((product) =>
                        <ProductBlock key={`product_${product.SKU}`} product={product} onAddToCart={onAddToCart} />
                    )
                }
            </Row>
        </StyledCategoryRow>
    )
};

export default CategoryRow;