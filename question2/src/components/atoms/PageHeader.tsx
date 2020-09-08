import React, {ReactNode} from 'react';
import styled from '@emotion/styled';
import propType from 'prop-types';
// @ts-ignore
import FitText from '@kennethormandy/react-fittext';
import {colors} from "../../styles/variables";

type PageHeaderProps = {
    children?: ReactNode;
    className?: string;
}

const StyledHeader = styled('div')<PageHeaderProps>(
    {
        position: 'fixed',
        width: '100%',
        zIndex: -10,
    }
);

const StyledText = styled('span')({
    fontFamily: 'Keep Calm',
    color: colors.light,
});

const PageHeader = (props: PageHeaderProps): JSX.Element  => {
    const { children, className } = props;
    return (
        <StyledHeader className={className}>
            <FitText><StyledText>{ children }</StyledText></FitText>
        </StyledHeader>
    )
};

PageHeader.prototype = {
};


export default PageHeader;