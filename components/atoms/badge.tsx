import { StyledComponentProps, Text, styled } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export type BadgeProps = StyledComponentProps &
  ViewProps & {
    count?: any;
  };

@styled("Badge")
export class Badge extends React.Component<BadgeProps> {
  renderBadgeComponent = () => {
    const { eva, style, count, children, ...restProps } = this.props;
    switch (typeof count) {
      case "number":
      case "string":
        return (
          <View style={[eva?.style, styles.badge, style]} {...restProps}>
            <Text
              style={{
                color: eva?.style?.textColor,
                fontSize: eva?.style?.textFontSize,
                fontWeight: eva?.style?.textFontWeight,
              }}
            >
              {this.props.count}
            </Text>
          </View>
        );
      case "function":
        return count();
    }
  };
  render() {
    const { children } = this.props;
    return (
      <View style={styles.badgeContainer}>
        <View style={children ? styles.badgeContainerAbsolute : null}>
          {this.renderBadgeComponent()}
        </View>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: "relative",
  },
  badgeContainerAbsolute: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    top: 0,
    transform: [{ translateX: "5%" }, { translateY: "-5%" }],
  },
  badge: {
    alignItems: "center",
    justifyContent: "center",
  },
});
