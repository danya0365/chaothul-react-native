import PendingUserLayout from "@/layouts/pending-user/pending-user.layout";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import PendingUserSafeAreaLayoutView from "./pending-user-safe-area-layout.view";

type Props = {};

export default (_: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <PendingUserSafeAreaLayoutView style={styles.safeArea}>
      <PendingUserLayout />
    </PendingUserSafeAreaLayoutView>
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
