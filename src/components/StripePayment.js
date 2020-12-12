import React from 'react';
import {Elements, CardElement} from '@stripe/react-stripe-js';
import { TESTING } from '../utils/constants';
import getStripe from '../utils/stripe';


const redirectToCheckout = async event => {
  event.preventDefault();
  const stripe = await getStripe();
  const { error } = await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems: ''
  })
}

const StripePayment = props => (

);

export default StripePayment;
