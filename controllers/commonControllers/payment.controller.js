import Stripe from "stripe";
import mongoose from "mongoose";
import OrderModel from "../../models/User/order.model.js";
import CartModel from "../../models/User/cart.model.js";
import { calculateCartTotals, paymentGatewayPrice } from "../../services/calculation.service.js";
import fs from "fs";
import { createManyOrders } from "../User/order.controller.js";
import { sendOrderEmail } from "../../services/sendEmail.service.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { cartIds, userId, userAddress, email } = req.body;

    // calculate total price
    const price = await paymentGatewayPrice(req, res);

    // create Stripe session (store ids + user in metadata)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Your Cart" },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/profile`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: email,
      metadata: {
        cartIds: JSON.stringify(cartIds), // string array store
        userId: userId,
        userAddress: userAddress,
        email: email
      }
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Checkout Session completed:', session.id);
        await handleSuccessfulPayment(session, req, res);
        break;
      }

      case 'payment_intent.payment_failed': {
        const failedPaymentIntent = event.data.object;
        console.log('Payment failed:', failedPaymentIntent.id);
        await handleFailedPayment(failedPaymentIntent);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Handle success
async function handleSuccessfulPayment(session) {
  try {
    const cartIds = JSON.parse(session.metadata.cartIds);
    const userId = session.metadata.userId;
    const userAddress = session.metadata.userAddress;
    const email = session.metadata.email;

    const objectIds = cartIds.map(id => new mongoose.Types.ObjectId(id));
    const cartItems = await CartModel.find({ _id: { $in: objectIds } }).lean();

    const { totalDelivery, totalPrice, totalSaleTax, totalOtherTax } = calculateCartTotals(cartItems);
    let otherTax = ((totalPrice * totalOtherTax) / 100).toFixed(2);
    let sTax = ((totalPrice * totalSaleTax) / 100).toFixed(2);
    let totalTax = Number(otherTax) + Number(sTax);
    let price = Math.round(Number(totalTax) + Number(totalPrice) + Number(totalDelivery));

    const orders = cartItems.map(({ _id, ...rest }) => ({
      ...rest,
      userId,
      userAddress,
      email,
      totalPrice : price,
      paymentStatus: "paid",
      paymentId: session.payment_intent,
    }));

    await createManyOrders(orders);
    await CartModel.deleteMany({ _id: { $in: objectIds } });

    // 🚀 yahan sirf utility function call karo
    await sendOrderEmail(orders);

  } catch (err) {
    console.error("Error in handleSuccessfulPayment:", err);
  }
}


async function handleFailedPayment(paymentIntent) {
  const { id, last_payment_error } = paymentIntent;

  console.log(`Payment ${id} failed: ${last_payment_error?.message}`);

  // Update order status to failed in your database
  // await Order.updateOne({ paymentIntentId: id }, { status: 'failed' });
}