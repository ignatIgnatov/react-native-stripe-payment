const { CURRENCY } = require('@/utils/config');
const { stripe } = require('@/utils/stripe-server');

async function POST(req) {
  const customDonation = Number(req.headers.get("custom_donation"));
  const origin = req.headers.get("origin");

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "donate",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: "Custom amount donation",
          },
          unit_amount: formatAmountForStripe(customDonation, CURRENCY),
        },
      },
    ],
    success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
    ui_mode: "hosted",
  });

  return new Response(JSON.stringify({
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  }), { status: 200 });
}

function formatAmountForStripe(amount, currency) {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
