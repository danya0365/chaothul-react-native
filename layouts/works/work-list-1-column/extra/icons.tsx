import React from "react";
import { ImageStyle } from "react-native";
import { Icon, IconElement, useTheme } from "@ui-kitten/components";

export const BulbIcon = (style: ImageStyle): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      width="24"
      height="24"
      fill={theme["text-control-color"]}
      name="bulb-outline"
    />
  );
};
