import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import * as actions from '../actions';

interface IPaymentsProps {
  handleToken: (token: Token) => {}
}

const Payments = (props: IPaymentsProps) => {
  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      amount={500}
      token={token => props.handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY || ""}
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
}

export default connect(
  null,
  actions
)(Payments);
