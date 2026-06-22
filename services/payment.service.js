import dotenv from "dotenv";
dotenv.config();
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createIntent = async (price, currency = 'usd') => {
  const amount = price; //items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // cents or paise
    currency,
    payment_method_types: ['card'],
  });
  return paymentIntent.client_secret;
};
