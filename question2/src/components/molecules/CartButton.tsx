import React, {ReactNode} from 'react';
import styled from '@emotion/styled';
import {colors} from "../../styles/variables";

import cart from '../../assets/img/cart.svg';
import cartFull from '../../assets/img/cart_full.svg';

type CartButtonProps = {
    className?: string;
    numberOfItems: number;
    onClick?: () => void;
}

const StyledCartButton = styled('div')<CartButtonProps>(
    {
        position: 'relative',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        '&>img': {
            width: '100%',
            height: '100%',
        }
    },
    props => {
        const { numberOfItems } = props;
        if (numberOfItems <= 0) return {};
        const digit = numberOfItems > 999 ? 4 : numberOfItems > 99 ? 3 : numberOfItems > 9 ? 2 : 1;
        const content = `"${digit > 3 ? '...' : numberOfItems.toString()}"`;
        return {
            '&::after': {
                content,
                position: 'absolute',
                left: digit >= 3 ? "34%" : digit >=2 ? "43%" : "50%",
                color: colors.americano,
                fontSize: '79%',
                fontWeight: 'bold',
                top: '23%',
            }
        }
    }
);

const CartButton = (props: CartButtonProps): JSX.Element  => {
    const { onClick, className, numberOfItems } = props;
    return (
        <StyledCartButton className={className} onClick={onClick} numberOfItems={numberOfItems}>
            { numberOfItems > 0 ? <img src={cartFull}/> : <img src={cart} /> }
        </StyledCartButton>
    );
};

CartButton.defaultProps = {
    numberOfItems: 0,
};

export default CartButton;