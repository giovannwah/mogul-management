import React from 'react';
import { navigate } from 'gatsby';
import { Button } from '@material-ui/core';
import { TESTING } from '../utils/constants';
import getStripe from '../utils/stripe';

const StripePayment = props => {
  const { price, email, onClick } = props;
  const redirectToCheckout = async event => {
    event.preventDefault();
    // call onClick prop immediately.
    onClick();
    // redirect to Stripe payment system.
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      customerEmail: email || undefined,
      submitType: 'book',
      billingAddressCollection: 'required',
      lineItems: [{ price, quantity: 1 }],
      successUrl: TESTING ? 'http://localhost:8000/success' : 'https://mogulmanagement.net/success',
      cancelUrl: TESTING ? 'http://localhost:8000/consultations/credit-consulting' : 'https://mogulmanagement.net/consultations/credit-consulting',
    });
    if (error) {
      navigate('/');
      window.alert(`An error occurred: ${error}`);
    }
  };

  return (
    <Button
      id="stripe-payment-button"
      onClick={redirectToCheckout}>
      Checkout with Stripe
    </Button>
  );
};

export default StripePayment;
