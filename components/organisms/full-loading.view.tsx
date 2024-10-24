import React from "react";
import {
  Card,
  Layout,
  Modal,
  Spinner,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const insetsConfig = useSafeAreaInsets();

  return (
    <Layout
      style={{
        width: "100%",
        flex: 1,
        paddingBottom: insetsConfig.bottom,
        alignItems: "center",
        justifyContent: "center",
      }}
      level="2"
    >
      <Card disabled={true} style={styles.card}>
        <Spinner status="primary" size="giant" />
      </Card>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  card: {
    borderRadius: 20,
  },
});
