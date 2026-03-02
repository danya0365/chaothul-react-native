import useAppConfig from "@/hooks/app-config";
import {
  StyleService,
  Text,
  TopNavigation,
  TopNavigationProps,
  useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

type Props = TopNavigationProps & {
  textTitle?: string;
};

export default ({ textTitle, ...restProps }: Props): React.ReactElement => {
  const { companyName } = useAppConfig();
  const styles = useStyleSheet(themedStyles);

  const renderTitle = (titleProps: any): React.ReactElement => {
    const { style, ...restTitleProps } = titleProps;
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.topNavigationLabel, style]} {...restTitleProps}>
          {textTitle ?? companyName}
        </Text>
      </View>
    );
  };

  return (
    <TopNavigation
      title={renderTitle}
      style={styles.topNavigation}
      appearance="default"
      {...restProps}
    />
  );
};

const themedStyles = StyleService.create({
  topNavigation: {
    backgroundColor: "transparent",
  },
  topNavigationLabel: {
    color: "text-basic-color",
  },
});
