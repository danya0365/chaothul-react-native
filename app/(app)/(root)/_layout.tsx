import { Stack } from "expo-router";

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
        <Stack.Screen name="your-recruits" options={{ headerShown: false }} />
        <Stack.Screen name="your-works" options={{ headerShown: false }} />
        <Stack.Screen name="new-recruit" options={{ headerShown: false }} />
        <Stack.Screen name="new-work" options={{ headerShown: false }} />
        <Stack.Screen name="favourite" options={{ headerShown: false }} />
        <Stack.Screen
          name="my-recruit-bookings"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="my-work-bookings"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="select-your-or-other-recruit"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="other-recruits" options={{ headerShown: false }} />
        <Stack.Screen
          name="edit-user-profile"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
