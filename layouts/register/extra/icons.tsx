import React from "react";
import { ImageStyle } from "react-native";
import { Icon, IconElement } from "@ui-kitten/components";

export const EmailIcon = (style: any): IconElement => (
  <Icon {...style} name="email" />
);

export const PersonIcon = (style: any): IconElement => (
  <Icon {...style} name="person" />
);

export const PlusIcon = (style: any): IconElement => (
  <Icon {...style} name="plus" />
);
