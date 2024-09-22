import * as React from "react";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import { ThemeContextValue, Theming } from "@/services/theme.service";

export default (props: StatusBarProps): React.ReactElement | null => {
  const isFocused = useIsFocused();
  const { isDarkMode }: ThemeContextValue = React.useContext(
    Theming.ThemeContext
  ) as ThemeContextValue;
  return isFocused ? (
    <StatusBar style={isDarkMode() ? "light" : "dark"} {...props} />
  ) : null;
};
