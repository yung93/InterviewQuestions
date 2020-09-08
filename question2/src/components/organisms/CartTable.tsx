import React from 'react';
import styled from "@emotion/styled";
import {ICartProduct} from "../../types/items";
import {CartRow} from "../molecules";
import {Column, Thumbnail} from "../atoms";
import {SIZE} from "../atoms/Thumbnail";
import {colors} from "../../styles/variables";

type CartTableProps = {
    className?: string;
    products: ICartProduct[];
    onAddProductClick: (sku: string) => void;
    onRemoveProductClick: (sku: string) => void;
}

const StyledCartTable = styled('div')({
});

const Header = styled('div')({
    display: 'flex',
    alignItems: 'flex-end',
    color: colors.teal,
    fontWeight: 'bold',
});

const Divider = styled('div')({
    width: '100%',
    height: '1px',
    backgroundColor: colors.teal,
    marginBottom: '30px',
});

const StyledCartRow = styled(CartRow)({
    '&:not(:last-child)': {
        marginBottom: '50px',
    }
});

const CartTable = (props: CartTableProps): JSX.Element  => {
    const { className, products, onAddProductClick, onRemoveProductClick } = props;
    return (
        <StyledCartTable className={className}>
            <Header>
                <Column>Item</Column>
                <Column flexBasis={1} align={'right'}>Price</Column>
                <Column flexBasis={0.5}>Quantity</Column>
                <Column flexBasis={1} align={'right'}>Subtotal</Column>
            </Header>
            <Divider />
            {
                products.map((product) =>
                    <StyledCartRow key={`cart_product_${product.SKU}`} product={product} onAddProductClick={onAddProductClick} onRemoveProductClick={onRemoveProductClick} />
                )
            }
        </StyledCartTable>
    )
};

export default CartTable;