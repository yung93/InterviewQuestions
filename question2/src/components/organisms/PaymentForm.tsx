import React from 'react';
import styled from '@emotion/styled';
import {colors} from "../../styles/variables";

const PaymentFormWrapper = styled('div')({
    flex: 1,
});

const Header = styled('div')({
    fontWeight: "bold",
    color: colors.teal,
});

const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
});

const Input = styled('input')({
    flex: 1,
    margin: '10px 5px 10px 5px',
    backgroundColor: 'transparent',
    border: `1px solid ${colors.americano}`,
    borderRadius: '8px',
    padding: '15px',
});

const Row = styled('div')({
    display: 'flex',
});

const PaymentForm = (): JSX.Element  => {
  return (
      <PaymentFormWrapper>
          <Header>Shipment Info</Header>
          <Form>
              <Row>
                <Input type="text" placeholder="First name"/>
                <Input type="text" placeholder="Last name"/>
              </Row>
              <Input type="text" placeholder="Address"/>
              <Input type="text" placeholder="Apartment, suite, etc. (optional)"/>
              <Input type="text" placeholder="City"/>
              <Input type="text" placeholder="Phone"/>
          </Form>
      </PaymentFormWrapper>
  )
};

export default PaymentForm;