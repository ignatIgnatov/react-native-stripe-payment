// https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet

import { stripe } from "@/utils/stripe-server";
import { CURRENCY } from "@/utils/config";

export async function POST(req) {
  // Use an existing Customer ID if this is a returning customer.
  const { amount } = await req.json();
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2025-01-27.acacia" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount.amount ? Math.floor(amount.amount * 100) : 1000,
    currency: CURRENCY,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return Response.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
}
