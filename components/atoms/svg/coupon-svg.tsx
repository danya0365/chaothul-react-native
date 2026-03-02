import { useTheme } from "@ui-kitten/components";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export default (props: any): React.ReactElement => {
  const theme = useTheme();
  const textHintColor = theme["text-hint-color"];
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={textHintColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <Path d="M9 9h.01" />
      <Path d="m15 9-6 6" />
      <Path d="M15 15h.01" />
    </Svg>
  );
};
