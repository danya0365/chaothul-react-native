import React from "react";
import { ImageStyle } from "react-native";
import { Icon, IconElement, useTheme } from "@ui-kitten/components";

export const DoneAllIcon = (style: ImageStyle): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      {...style}
      width={16}
      height={16}
      fill={theme["color-primary-500"]}
      name="done-all"
    />
  );
};
