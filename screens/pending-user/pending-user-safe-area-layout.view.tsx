import FocusAwareStatusBar from "@/components/atoms/focus-aware-status-bar";
import { ThemeContextValue, Theming } from "@/services/theme.service";
import {
  Layout,
  LayoutProps,
  StyledComponentProps,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import { ImageBackground, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface SafeAreaLayoutProps extends StyledComponentProps, LayoutProps {
  children?: React.ReactNode;
}

export default ({
  children,
  ...props
}: SafeAreaLayoutProps): React.ReactElement => {
  const { isDarkMode, currentTheme, setCurrentTheme } = React.useContext(
    Theming.ThemeContext
  ) as ThemeContextValue;
  const theme = useTheme();
  const insetsConfig = useSafeAreaInsets();

  const backgroundColor: string = theme[`navigation-bar-background`];

  return (
    <>
      <FocusAwareStatusBar style="light" />
      <Layout
        {...props}
        style={[
          props.style,
          {
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <ImageBackground
          style={[
            {
              flex: 1,
              position: "relative",
              width: "100%",
            },
            {
              paddingTop: insetsConfig.top,
              paddingBottom: insetsConfig.bottom,
            },
          ]}
          imageStyle={{
            resizeMode: "cover",
            position: "absolute",
            top: 0,
            bottom: 0,
          }}
          source={require("@/assets/img/bg/login.jpg")}
        >
          <View
            style={{
              backgroundColor: `rgba(0, 0, 0, ${isDarkMode() ? 0.8 : 0.5})`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          {children}
        </ImageBackground>
      </Layout>
    </>
  );
};
