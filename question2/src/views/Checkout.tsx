import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ITransaction, TRANSACTION_STATUS} from "../types/items";
import styled from "@emotion/styled";
import {Button, Loading, PageHeader} from "../components/atoms";
import PaymentForm from "../components/organisms/PaymentForm";
import {colors} from "../styles/variables";
import TransactionSummary from "../components/organisms/TransactionSummary";
import {useDispatch} from "react-redux";
import {emptyCart} from "../store/actions/cart.action";

const Container = styled('div')({
    paddingTop: '100px',
    paddingBottom: '100px',
    display: 'flex',
    flexWrap: 'wrap',
});

const Divider = styled('div') ({
   height: '400px',
   width: '1px',
   backgroundColor: colors.americano,
   marginLeft: '10%',
   marginRight: '10%',
});

const TransactionSummaryWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
});

const StyledTransactionSummary = styled(TransactionSummary)({
    marginBottom: '20px',
});

const Header = styled('div')({
    '&h1': {
        fontSize: '20pt',
        fontWeight: 'bold',
    },
    marginBottom: '30pt',
    textAlign: 'center',
});

const Checkout = (): JSX.Element => {
    const [transaction, setTransaction] = useState<ITransaction | null>(null);
    const [receipt, setReceipt] = useState<ITransaction | null>(null);
    const { transactionID } = useParams<{ transactionID: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTransaction();
    }, [])

    const fetchTransaction = useCallback(async () => {
        try {
            const transactionDetail = await (await fetch(`/api/transaction/${transactionID}`)).json();
            setTransaction(transactionDetail);
        } catch (e) {
            // console.error(e);
        }
    }, []);

    const checkout = useCallback(async () => {
        try {
            const transactionDetail = await (await fetch(`/api/transaction/checkout/${transactionID}`, { method: 'POST' })).json();
            setReceipt(transactionDetail);
            dispatch(emptyCart());
        } catch (e) {
            // console.error(e);
        }
    }, [transaction]);

    return receipt ?
        <div>
            <Header>
                <h1>Thank you!</h1>
                <div>Here is the summary of your order. </div>
            </Header>
            <TransactionSummary transaction={receipt} />
        </div> :
        transaction ?
            !transaction.expired && transaction.status === TRANSACTION_STATUS.PENDING ?
            <div>
                <PageHeader>Checkout</PageHeader>
                <Container>
                    <PaymentForm/>
                    <Divider />
                    <TransactionSummaryWrapper>
                        <StyledTransactionSummary transaction={transaction}/>
                        <Button onClick={checkout}>Confirm Payment</Button>
                    </TransactionSummaryWrapper>
                </Container>
            </div> : <div>Transaction id {transaction.id} is not valid.</div> : <Loading />
};

export default Checkout;