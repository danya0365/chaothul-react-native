import { useTheme } from "@ui-kitten/components";
import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
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
      <Circle cx="12" cy="12" r="10" />
      <Path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <Path d="M12 18V6" />
    </Svg>
  );
};
