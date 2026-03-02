import LandingLayout from "@/layouts/landing/landing.layout";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import LandingSafeAreaLayoutView from "./landing-safe-area-layout.view";

type Props = {};

export default (_: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <LandingSafeAreaLayoutView style={styles.safeArea}>
      <LandingLayout />
    </LandingSafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  iconButton: {
    aspectRatio: 1.0,
    height: 24,
  },
});
