import React from 'react';
import styled from '@emotion/styled';
import {colors} from "../../styles/variables";
import {ICartProduct} from "../../types/items";
import {Button, Column, Thumbnail} from "../atoms";
import {SIZE} from "../atoms/Thumbnail";
import {Property} from "csstype";

type CartRowProps = {
    className?: string,
    product: ICartProduct,
    onAddProductClick: (sku: string) => void;
    onRemoveProductClick: (sku: string) => void;
}

const StyledCartRow = styled('div')(
    {
        display: 'flex',
        alignItems: 'flex-start',
    }
);

const Price = styled('div')(
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    }
);

const Tax = styled('div')(
    {
        fontSize: '10pt',
        color: colors.teal,
    }
);

const Quantity = styled('div')(
    {
        display: 'flex',
        alignItems: 'center',
    }
);

const AdjustButton = styled(Button)<{ type: string }>(
    {
        width: '14px',
        height: '14px',
        padding: 0,
        position: 'relative',
    },
    props => ({
        marginRight: props.type === '-' ? '5px' : 0,
        marginLeft: props.type === '+' ? '5px' : 0,
        '&::after': {
            content: `"${props.type}"`,
            position: 'absolute',
            left: '30%',
            color: colors.americano,
            fontSize: '80%',
            fontWeight: 'bold',
            top: '0%',
        },
        '&:hover::after': {
            color: colors.white,
        }
    }));

const CartRow = (props: CartRowProps): JSX.Element  => {
    const { className, product, onAddProductClick, onRemoveProductClick } = props;
    const { SKU, name, imageUrl, price, vat, importVat, quantity = 1 } = product;
    return (
        <StyledCartRow className={className}>
            <Column flexBasis={0.5}><Thumbnail src={imageUrl} size={SIZE.SMALL}/></Column>
            <Column>{ name }</Column>
            <Column flexBasis={1} align={'right'}>
                <Price>
                    <div>${price}</div>
                    { vat > 0 && <Tax>+VAT${vat}</Tax> }
                    { importVat > 0 && <Tax>+Import VAT${importVat}</Tax> }
                </Price>
            </Column>
            <Column flexBasis={0.5}>
                <Quantity>
                    <AdjustButton onClick={() => { onRemoveProductClick(SKU); }} type={'-'}/>
                    {quantity}
                    <AdjustButton onClick={() => { onAddProductClick(SKU); }} type={'+'}/>
                </Quantity>
            </Column>
            <Column flexBasis={1} align={'right'}>${((price+vat+importVat) * quantity).toFixed(2)}</Column>
        </StyledCartRow>
    )
};

export default CartRow;