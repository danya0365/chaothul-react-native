import {
  Layout,
  LayoutProps,
  StyledComponentProps,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FocusAwareStatusBar from "./focus-aware-status-bar";

type Inset = "top" | "bottom";

export interface SafeAreaLayoutProps extends StyledComponentProps, LayoutProps {
  insets?: Inset;
  children?: React.ReactNode;
}

export const SafeAreaLayoutView: React.FC<SafeAreaLayoutProps> = ({
  insets,
  ...props
}) => {
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
          { backgroundColor },
          {
            paddingTop: insets === "top" ? insetsConfig.top : 0,
            paddingBottom: insets === "bottom" ? insetsConfig.bottom : 0,
          },
        ]}
      />
    </>
  );
};
