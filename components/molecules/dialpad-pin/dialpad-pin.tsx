import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";

const DialpadPin = ({
  pinLength,
  pinSize,
  code,
  dialPadContent,
}: {
  pinLength: number;
  pinSize: number;
  code: string[];
  dialPadContent: (string | number)[];
}) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const borderSelectedColor = theme["color-primary-500"];
  const borderBasicColor = theme["text-hint-color"];
  return (
    <View style={styles.dialPadPinContainer}>
      {Array(pinLength)
        .fill(0)
        .map((_, index) => {
          const item = dialPadContent[index];
          const isSelected =
            typeof item === "number" && code[index] !== undefined;
          return (
            <View
              key={index}
              style={{
                width: pinSize,
                height: pinSize,
                borderRadius: pinSize / 2,
                overflow: "hidden",
                margin: 5,
              }}
            >
              <View
                style={[
                  {
                    borderRadius: pinSize / 2,
                    borderColor: !isSelected
                      ? borderBasicColor
                      : borderSelectedColor,
                  },
                  styles.pinContentContainer,
                ]}
              >
                {isSelected && (
                  <View
                    style={[
                      {
                        width: pinSize * 0.5,
                        height: pinSize * 0.5,
                        borderRadius: pinSize * 0.35,
                      },
                      styles.pinContent,
                    ]}
                  />
                )}
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default DialpadPin;

const themedStyles = StyleService.create({
  dialPadPinContainer: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "flex-end",
  },
  pinContentContainer: {
    flex: 1,
    backgroundColor: "text-control-color",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pinContent: {
    backgroundColor: "color-primary-500",
  },
});
