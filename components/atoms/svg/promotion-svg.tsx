import { useTheme } from "@ui-kitten/components";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export default (props: any): React.ReactElement => {
  const theme = useTheme();
  const textHintColor = theme["text-hint-color"];
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={textHintColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <Path d="m15 9-6 6" />
      <Path d="M9 9h.01" />
      <Path d="M15 15h.01" />
    </Svg>
  );
};
