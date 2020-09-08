import React from 'react';
import styled from '@emotion/styled';
import {colors} from "../../styles/variables";
import {IProduct} from "../../types/items";
import {Button, Thumbnail} from "../atoms";

type ProductBlockProps = {
    className?: string,
    product: IProduct,
    onAddToCart: (sku: string) => void,
}

const StyledNamePriceWrapper = styled('div')(
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        fontSize: '12pt',
        color: colors.americano,
    },
);

const ProductBlock = (props: ProductBlockProps): JSX.Element  => {
    const { className, product, onAddToCart } = props;
    const { name, imageUrl, price } = product;
    return (
        <div className={className}>
            <Thumbnail src={imageUrl} />
            <StyledNamePriceWrapper>
                <div>{ name }</div>
                <div>${ price }</div>
            </StyledNamePriceWrapper>
            <Button onClick={() => {onAddToCart(product.SKU)}}>Add To Cart</Button>
        </div>
    )
};

export default ProductBlock;