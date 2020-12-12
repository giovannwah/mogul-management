/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { loadStripe } from '@stripe/stripe-js';
import { TESTING, STRIPE_LIVE_PUBLIC_KEY, STRIPE_TEST_PUBLIC_KEY } from './constants';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(TESTING ? STRIPE_TEST_PUBLIC_KEY : STRIPE_LIVE_PUBLIC_KEY);
  }
  return stripePromise;
};

export default getStripe;
