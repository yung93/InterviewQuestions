import React from 'react';
import styled from '@emotion/styled';
import propType from 'prop-types';

import logo from '../../assets/img/logo.svg';

type LogoProps = {
    onClick?: () => void;
    className?: string;
}

const StyledLogo = styled('img')<LogoProps>(
    {
        width: '55px',
    },
    props => props.onClick ? { cursor: 'pointer' } : {}
);

const Logo = (props: LogoProps): JSX.Element  => {
    const { onClick, className } = props;
    return <StyledLogo alt='Home' src={logo} onClick={onClick} className={className} />
};

Logo.prototype = {
    onClick: propType.func,
};

export default Logo;