import React from "react";
import { ImageStyle } from "react-native";
import { Icon, IconElement, useTheme } from "@ui-kitten/components";

export const ArrowIosBackIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="arrow-ios-back" />
);

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

export const HeartIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} width={16} height={16} fill={`red`} name="heart" />
);

export const SearchIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="search" />
);
