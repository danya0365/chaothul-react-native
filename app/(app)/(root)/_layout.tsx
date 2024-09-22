import useAuth from "@/hooks/auth";
import { Redirect, Stack } from "expo-router";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(bottom-tabs)",
};

export default function RootLayout() {
  // const { isLoggedIn, isPendingUser, pinCode, loginPinCode } = useAuth();
  // if (!isLoggedIn) {
  //   return <Redirect href="/(app)/landing" />;
  // }
  // if (isPendingUser) {
  //   return <Redirect href="/(app)/auth/pending-user" />;
  // }
  // if (!pinCode || pinCode === "") {
  //   return <Redirect href="/(app)/auth/set-pin-code" />;
  // }
  // if (loginPinCode != pinCode) {
  //   return <Redirect href="/(app)/auth/login-pin-code" />;
  // }
  return (
    <>
      <Stack>
        <Stack.Screen name="(bottom-tab)" options={{ headerShown: false }} />
        <Stack.Screen
          name="notification/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="issue-point-detail/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="barcode-detail/[code]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="messenger-chat" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
