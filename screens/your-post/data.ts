import {
  AssetArticlesDarkIcon,
  AssetArticlesIcon,
  AssetSocialDarkIcon,
  AssetSocialIcon,
} from "@/components/atoms/icons";
import { ThemedIcon } from "@/components/atoms/themed-icon.component";
import { MenuItem } from "@/models/menu-item.model";
import React from "react";
import { ImageStyle } from "react-native";

export interface LayoutData extends MenuItem {
  route: string;
}

export const workOrRecruitData: LayoutData[] = [
  {
    title: "โพสท์รับงาน",
    route: "your-works",
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
    route: "select-your-or-other-recruit",
    icon: (style: ImageStyle) => {
      return React.createElement(ThemedIcon, {
        ...style,
        light: AssetArticlesIcon,
        dark: AssetArticlesDarkIcon,
      });
    },
  },
];

export const youOrOtherRecruitData: LayoutData[] = [
  {
    title: "โพสท์หางานของคุณ",
    route: "your-recruits",
    icon: (style: ImageStyle) => {
      return React.createElement(ThemedIcon, {
        ...style,
        light: AssetArticlesIcon,
        dark: AssetArticlesDarkIcon,
      });
    },
  },
  {
    title: "โพสท์หางานของคนอื่น",
    route: "other-recruits",
    icon: (style: ImageStyle) => {
      return React.createElement(ThemedIcon, {
        ...style,
        light: AssetSocialIcon,
        dark: AssetSocialDarkIcon,
      });
    },
  },
];
