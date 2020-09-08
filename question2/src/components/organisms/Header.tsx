import React from 'react';
import styled from '@emotion/styled';
import { Logo } from '../atoms';
import {Link} from "react-router-dom";
import {CartButton} from "../molecules";
import {useSelector} from "react-redux";
import {CartState, RootState} from "../../store/types";

const StyledHeader = styled('div')(
    {
        width: '100%',
        height: '93px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: 'fixed',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        '&>div': {
            width: '100%',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '4.2%',
            paddingRight: '4.2%',
        }
    }
);

const Header = (): JSX.Element  => {
    const numberOfItems = useSelector((state: RootState) => state.cart.products.reduce((acc, product) => product.quantity + acc, 0));

    return (
        <StyledHeader>
            <div>
                <Link to="/"><Logo /></Link>
                <Link to="/cart"><CartButton numberOfItems={numberOfItems} /></Link>
            </div>
        </StyledHeader>
    )
};

export default Header;