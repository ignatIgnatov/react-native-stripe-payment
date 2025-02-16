import { Alert } from "react-native";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import CheckoutButton from "./checkout-button";

async function fetchPaymentSheetParams(amount) {
  return fetch(`/api/payment-sheet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  }).then((res) => res.json());
}

export default function CheckoutScreen(amount) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams(amount);

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Expo, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
        email: "jenny.rosen@example.com",
        phone: "888-888-8888",
      },
      returnURL: Linking.createURL("stripe-redirect"),
      applePay: {
        merchantCountryCode: "US",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      // Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, [amount]);

  return (
    <CheckoutButton
      style={{}}
      onPress={openPaymentSheet}
      disabled={!loading}
      title="Checkout"
    />
  );
}
