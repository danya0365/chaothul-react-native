import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  LayoutRectangle,
  ViewProps,
} from "react-native";

export default (props: ViewProps): React.ReactElement => {
  const [layout, setLayout] = React.useState<LayoutRectangle | null>(null);

  const { aspectRatio = 1, ...inputStyle } =
    StyleSheet.flatten(props.style) || {};
  const style = [inputStyle, { aspectRatio }];

  if (layout) {
    const { width = 0, height = 0 } = layout;
    const _aspectRatio = aspectRatio as number;
    if (width === 0) {
      style.push({ width: height * _aspectRatio, height });
    } else {
      style.push({ width, height: width * _aspectRatio });
    }
  }

  return (
    <View
      {...props}
      style={style}
      onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}
    />
  );
};
