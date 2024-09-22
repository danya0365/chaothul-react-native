import * as React from "react";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar, StatusBarProps } from "expo-status-bar";

export default (props: StatusBarProps): React.ReactElement | null => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
};
