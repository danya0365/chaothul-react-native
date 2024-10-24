import { IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/configure-store";
import ThemeProvider from "./theme";
import ConfigProvider from "./config";
import { Theme } from "@/types/theme";
import AuthProvider from "./auth";
import { AppIconsPack } from "@/components/atoms/app-icons-pack";

export type Props = {
  children?: React.ReactNode;
  theme: Theme;
};

const CoreProvider: React.FC<Props> = ({ children, theme }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={[EvaIconsPack, AppIconsPack]} />
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <ConfigProvider>
              <AuthProvider>{children}</AuthProvider>
            </ConfigProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default CoreProvider;
