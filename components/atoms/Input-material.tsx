import {
  Input,
  styled,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label?: React.ReactNode;
};

export default (props: Props): React.ReactElement => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { label, style, ...restProps } = props;
  const placeholderTextColor = theme["text-hint-color"];
  const focusColor = theme["color-primary-500"];
  const blurColor = theme["text-hint-color"];
  const [borderColor, setBorderColor] = useState<string>(blurColor);
  return (
    <View>
      {label}
      <TextInput
        onFocus={() => {
          setBorderColor(focusColor);
        }}
        onBlur={() => {
          setBorderColor(blurColor);
        }}
        placeholderTextColor={placeholderTextColor}
        style={{
          ...styles.input,
          borderBottomWidth: 1,
          borderColor: borderColor,
          ...(style as unknown as any),
        }}
        {...restProps}
      />
    </View>
  );
};

const themedStyles = StyleService.create({
  input: {
    fontFamily: "Sarabun_400Regular",
    outline: "none",
    borderColor: "color-primary-500",
    color: "text-basic-color",
    paddingHorizontal: 0,
    paddingVertical: 16,
  },
  bold: {
    fontFamily: "Sarabun_700Bold",
  },
  extraBold: {
    fontFamily: "Sarabun_800ExtraBold",
  },
  textControl: {
    color: "text-control-color",
  },
});
