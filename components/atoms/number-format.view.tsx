import { Text } from "@ui-kitten/components";
import { NumericFormat, NumericFormatProps } from "react-number-format";

const NumberFormatView = ({
  value,
  renderText,
  ...restProps
}: NumericFormatProps) => {
  const getRenderText = (formattedValue: string, otherProps: any) => {
    if (renderText) return renderText(formattedValue, otherProps);
    return formattedValue;
  };
  return (
    <NumericFormat
      thousandSeparator=","
      displayType="text"
      {...restProps}
      value={value}
      renderText={getRenderText}
    />
  );
};

export default NumberFormatView;
