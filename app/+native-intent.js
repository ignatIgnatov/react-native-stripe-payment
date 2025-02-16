import { handleURLCallback } from "@stripe/stripe-react-native";

export async function redirectSystemPath({ path, initial }) {
  if (process.env.EXPO_OS === "ios") {
    if (await handleURLCallback(path)) {
      // TODO: Send to a normalized location.
      return "/";
    }
  }

  return path;
}
