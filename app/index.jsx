import CheckoutForm from "@/components/checkout-form";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState(0);

  return (
    <ScrollView
      style={{ flex: 1, maxWidth: 600, paddingBottom: 24 }}
      contentContainerStyle={{ padding: 16, gap: 8 }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Image
        source={require("@/public/react-shoe-product.jpeg")}
        style={{ width: "100%", height: 300, borderRadius: 12 }}
      />

      <Text style={{ fontWeight: "600" }}>
        Price: {Math.floor(donationAmount)}
      </Text>

      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={10}
        maximumValue={150}
        value={donationAmount}
        onValueChange={setDonationAmount}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />

      <CheckoutForm amount={Math.floor(donationAmount).toFixed(2)} />
    </ScrollView>
  );
}
