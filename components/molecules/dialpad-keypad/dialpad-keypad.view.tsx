import { Feather } from "@expo/vector-icons";
import {
  StyleService,
  useStyleSheet,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React, { Dispatch, SetStateAction } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

const DialpadKeypad = ({
  dialPadContent,
  code,
  setCode,
  dialPadSize,
  dialPadTextSize,
}: {
  dialPadContent: (string | number)[];
  code: string[];
  setCode: Dispatch<SetStateAction<string[]>>;
  dialPadSize: number;
  dialPadTextSize: number;
}) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const primaryColor = theme["color-primary-500"];
  const borderBasicColor = theme["text-hint-color"];
  const textControlColor = theme["text-control-color"];

  return (
    <FlatList
      data={dialPadContent}
      numColumns={3} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            disabled={item === ""}
            onPress={() => {
              if (item === "X") {
                setCode((prev) => prev.slice(0, -1));
              } else {
                setCode((prev) => [...prev, `${item}`]);
              }
            }}
          >
            <View
              style={[
                {
                  backgroundColor:
                    item === "" || item === "X"
                      ? "transparent"
                      : textControlColor,
                  width: dialPadSize,
                  height: dialPadSize,
                },
                styles.dialPadContainer,
              ]}
            >
              {item === "X" ? (
                <Feather
                  name="delete"
                  size={dialPadTextSize}
                  color={primaryColor}
                  style={{ opacity: code.length > 0 ? 1 : 0 }}
                />
              ) : (
                <Text
                  style={[{ fontSize: dialPadTextSize }, styles.dialPadText]}
                >
                  {item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default DialpadKeypad;

const themedStyles = StyleService.create({
  dialPadContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 50,
    borderColor: "transparent",
  },
  dialPadText: {
    color: "color-primary-500",
  },
});
