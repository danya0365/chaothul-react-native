import React from "react";
import { Divider, StyleService, useStyleSheet } from "@ui-kitten/components";
import Home from "../../layouts/home";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LogoNavigationBarView from "@/components/atoms/logo-navigation-bar.view";
//import FontList from "react-native-font-list";

export const HomesScreen = ({
  navigation,
}: {
  navigation: any;
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  // FontList.get((fontFamilies: any, fonts: any) => {
  //   console.log(fontFamilies, fonts);
  // });

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <LogoNavigationBarView />
      <Divider />
      <Home navigation={navigation} />
    </SafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
