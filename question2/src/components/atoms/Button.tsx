import React, {ReactNode} from 'react';
import styled from '@emotion/styled';
import {colors} from "../../styles/variables";

type ButtonProps = {
    className?: string;
    children?: ReactNode;
    onClick: () => void;
}

const StyledButton = styled('div')(
    {
        fontFamily: 'Bebas Kai',
        border: '2px solid',
        fontSize: '12pt',
        borderColor: colors.americano,
        color: colors.americano,
        letterSpacing: '3px',
        cursor: 'pointer',
        padding: '9px',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: colors.dark,
            color: colors.white
        },
        '&:focus, &:active': {
            backgroundColor: colors.americano,
            color: colors.white
        },
    }
);

const Button = (props: ButtonProps): JSX.Element  => {
    const { onClick, className, children } = props;
    return <StyledButton className={className} onClick={onClick}>{ children }</StyledButton>
};

export default Button;