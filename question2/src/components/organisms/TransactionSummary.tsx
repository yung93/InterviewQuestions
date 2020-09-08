import React from 'react';
import styled from '@emotion/styled';
import {colors} from "../../styles/variables";
import {ICategorisedProducts, ITransaction} from "../../types/items";
import { Column } from "../atoms";

type TransactionSummaryProps = {
    className?: string;
    transaction: ITransaction;
}

const StyledTransactionSummary = styled('div')({
    flex: 1,
    backgroundColor: colors.romance,
    padding: '5%',
    borderRadius: '20px',
    lineHeight: '25pt',
});

const Header = styled('div')({
    fontWeight: 'bold',
});

const Row = styled('div')({
    display: 'flex',
    alignItems: 'flex-start',
});

const Divider = styled('div')({
    width: '100%',
    height: '1px',
    marginTop: '5px',
    marginBottom: '5px',
    backgroundColor: colors.americano,
});

const TotalWrapper = styled('div')({
    textAlign: 'right',
});

const Total = styled('div')({
    fontSize: '14pt',
    color: colors.teal,
    fontWeight: 'bold',
});


const TransactionSummary = (props: TransactionSummaryProps): JSX.Element  => {
    const { products, subTotal, taxTotal, total } = props.transaction;
    return (
        <StyledTransactionSummary className={props.className}>
            <Header>Items</Header>
            {
                products.map((product) =>
                    <Row key={`item_${product.SKU}`}>
                        <Column>{ product.name }</Column>
                        <Column flexBasis={0.5}>{ product.price }</Column>
                        <Column flexBasis={0.5}>x { product.quantity }</Column>
                    </Row>
                )
            }
            <Divider/>
            <TotalWrapper>
                <div>Subtotal: ${subTotal.toFixed(2)}</div>
                <div>Tax: ${taxTotal.toFixed(2)}</div>
                <Total>Total: ${total.toFixed(2)}</Total>
            </TotalWrapper>
        </StyledTransactionSummary>
    )
};

export default TransactionSummary;