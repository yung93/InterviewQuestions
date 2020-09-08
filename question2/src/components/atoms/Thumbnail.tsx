import React from 'react';
import styled from '@emotion/styled';
import propType from 'prop-types';
import {colors} from "../../styles/variables";

export enum SIZE {
    DEFAULT = "Default",
    SMALL = "Small",
}


type ThumbnailProps = {
    src: string;
    className?: string;
    size?: SIZE,
}

const StyledWrapper = styled('div')<{size: SIZE}>(
    {
        cursor: 'pointer',
    },
    props => {
        switch (props.size) {
            case SIZE.DEFAULT:
            default:
                return {
                    width: '150px',
                    height: '150px',
                    padding: '25px',
                };
            case SIZE.SMALL:
                return {
                    width: '80px',
                    height: '80px',
                };
        }
    }
);
const StyledThumbnail = styled('img')(
    {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        backgroundColor: colors.white,
    },
);

const Thumbnail = (props: ThumbnailProps): JSX.Element  => {
    const { src, className, size = SIZE.DEFAULT } = props;
    return (
        <StyledWrapper size={size}>
            <StyledThumbnail src={src} className={className} />
        </StyledWrapper>
    )
};

export default Thumbnail;