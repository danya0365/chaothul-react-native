import { Stack } from "expo-router";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(root)",
};

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="theme" options={{ headerShown: false }} />
      <Stack.Screen name="term" options={{ headerShown: false }} />
      <Stack.Screen name="about-us" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />=
      <Stack.Screen
        name="landing"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth/login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth/set-pin-code"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth/login-pin-code"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth/register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth/pending-user"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="messenger-mobilephone-chat"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
