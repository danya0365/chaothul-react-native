import React from "react";
import { StyleSheet } from "react-native";
import { Divider, Layout, Text, LayoutProps } from "@ui-kitten/components";

export interface WorkInfoValueProps extends LayoutProps {
  hint: string;
  value: string;
}

export const WorkInfoValue = (
  props: WorkInfoValueProps
): React.ReactElement => {
  const { style, hint, value, ...layoutProps } = props;

  return (
    <React.Fragment>
      <Layout level="1" {...layoutProps} style={[styles.container, style]}>
        <Text appearance="hint" category="s1">
          {hint}
        </Text>
        <Text category="s1">{value}</Text>
      </Layout>
      <Divider />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
