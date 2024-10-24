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
      <Path d="M12 13V2l8 4-8 4" />
      <Path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" />
      <Path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
    </Svg>
  );
};
