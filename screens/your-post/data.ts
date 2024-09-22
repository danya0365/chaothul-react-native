import React from "react";
import { ImageStyle } from "react-native";
import {
  AssetArticlesDarkIcon,
  AssetArticlesIcon,
  AssetSocialDarkIcon,
  AssetSocialIcon,
} from "@/components/atoms/icons";
import { MenuItem } from "@/models/menu-item.model";
import { ThemedIcon } from "@/components/atoms/themed-icon.component";

export interface LayoutData extends MenuItem {
  route: string;
}

export const data: LayoutData[] = [
  {
    title: "โพสท์รับงาน",
    route: "Your Work Screen",
    icon: (style: ImageStyle) => {
      return React.createElement(ThemedIcon, {
        ...style,
        light: AssetArticlesIcon,
        dark: AssetArticlesDarkIcon,
      });
    },
  },
  {
    title: "โพสท์หางาน",
    route: "Your Recruit Screen",
    icon: (style: ImageStyle) => {
      return React.createElement(ThemedIcon, {
        ...style,
        light: AssetSocialIcon,
        dark: AssetSocialDarkIcon,
      });
    },
  },
];
