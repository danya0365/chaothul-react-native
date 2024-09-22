import {
  TabBarBellOutlineIcon,
  TabBarHeartOutlineIcon,
  TabBarHomeOutlineIcon,
  TabBarPaperPlaneOutlineIcon,
  TabBarProfileOutlineIcon,
} from "@/components/atoms/icons";
import { useAppSelector } from "@/store/hooks";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FavouriteScreen from "./favourite";
import HomesScreen from "./home";
import NotificationScreen from "./notification";
import ProfileMenuScreen from "./profile-menu";
import SelectPostScreen from "./select-post";

const BottomTab = createBottomTabNavigator();

const IconWithBadge = ({
  icon,
  badge = null,
}: {
  icon: React.ReactElement;
  badge?: string | null;
}) => {
  if (!badge) return icon;
  return (
    <View>
      {icon}
      <View
        style={{
          height: 20,
          width: 20,
          backgroundColor: "red",
          borderRadius: 10,
          position: "absolute",
          right: -8,
          padding: 4,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 8,
          }}
        >
          {badge}
        </Text>
      </View>
    </View>
  );
};

export const TabBarBottomNavigation: React.FC<BottomTabBarProps> = ({
  navigation,
  state,
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const backgroundColor: string = theme[`tab-bar-background`];
  const borderColor: string = theme[`tab-bar-border`];
  const { isNewNotification } = useAppSelector((state) => state.app);
  const { isNewMessenger } = useAppSelector((state) => state.messenger);

  const onSelect = (index: number): void => {
    const routeName = state.routeNames[index];
    navigation.navigate(routeName);
  };

  return (
    <Animated.View
      style={{
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: safeAreaInsets.bottom,
        backgroundColor: backgroundColor,
      }}
    >
      <Divider />
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title="หน้าหลัก" icon={TabBarHomeOutlineIcon} />
        <BottomNavigationTab title="ถูกใจ" icon={TabBarHeartOutlineIcon} />
        <BottomNavigationTab
          icon={(iconProps) => {
            const { style } = iconProps as unknown as { [x: string]: any };
            const customStyle = {
              ...style,
              height: 58,
              width: 58,
            };
            return (
              <View
                style={{
                  position: "absolute",
                  borderRadius: 90,
                  backgroundColor: backgroundColor,
                  borderWidth: 1,
                  borderColor: borderColor,
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: 8,
                  height: 90,
                  width: 90,
                }}
              >
                <TabBarPaperPlaneOutlineIcon
                  {...iconProps}
                  style={{ ...customStyle }}
                />
              </View>
            );
          }}
        />
        <BottomNavigationTab
          title="แจ้งเตือน"
          icon={(iconProps) => {
            return (
              <IconWithBadge
                icon={<TabBarBellOutlineIcon {...iconProps} />}
                badge={isNewNotification ? "N" : null}
              />
            );
          }}
        />
        <BottomNavigationTab title="โปรไฟล์" icon={TabBarProfileOutlineIcon} />
      </BottomNavigation>
    </Animated.View>
  );
};

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? "home" : "home";

const BottomTabNavigator = (): React.ReactElement => {
  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialTabRoute}
      tabBar={(props) => <TabBarBottomNavigation {...props} />}
    >
      <BottomTab.Screen name="home" component={HomesScreen} />
      <BottomTab.Screen name="favourite" component={FavouriteScreen} />
      <BottomTab.Screen name="select-post" component={SelectPostScreen} />
      <BottomTab.Screen name="notification" component={NotificationScreen} />
      <BottomTab.Screen name="profile-menu" component={ProfileMenuScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
