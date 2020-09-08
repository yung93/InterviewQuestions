import React, {ReactNode} from 'react';
import {Property} from "csstype";
import styled from "@emotion/styled";

type ColumnProps = {
    className?: string;
    children?: ReactNode;
    align?: Property.TextAlign,
    flexBasis?: number
}

const Column = styled('div')<ColumnProps>(
    { flexShrink: 1, marginRight: '5%' },
    props => ({
        textAlign: props.align || 'left'
    }),
    props => {
        return props.flexBasis ? {
            flexBasis: `${(100/6 * props.flexBasis)}%`,
        } : { flexGrow: 1 }
    }
);

export default Column;