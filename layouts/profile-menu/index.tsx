import LoadingView from "@/components/organisms/loading.view";
import useAuth from "@/hooks/auth";
import { AuthApiService } from "@/services/api.service";
import {
  Avatar,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import React from "react";
import {
  ImageStyle,
  LogBox,
  RefreshControl,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
import httpRequest from "../../services/http-request.service";
import { PinIcon } from "./extra/icons";
import { ImageOverlay } from "./extra/image-overlay.component";
import { ProfileMenu } from "./extra/profile-menu.component";

/*
 * Will warn because container view is ScrollView that contains 3 List components inside.
 * Better workaround depends on the user needs.
 */
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default (): React.ReactElement => {
  const navigation = useNavigation();
  const { token, logoutSuccess, callGetAuthUser, user, loading } = useAuth();
  const styles = useStyleSheet(themedStyle);
  const apiService = new AuthApiService(httpRequest);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    doRequestProfile(() => {
      setRefreshing(false);
    });
  }, []);

  const doRequestProfile = async (callback: () => void) => {
    const user = await callGetAuthUser();
    if (!user) {
      logoutSuccess();
    }
    callback();
  };

  React.useEffect(() => {
    doRequestProfile(() => {});
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      doRequestProfile(() => {});
    }, 500);
  }, [token]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      doRequestProfile(() => {
        setRefreshing(false);
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {user ? (
          <ImageOverlay
            style={styles.header as ViewStyle}
            source={require("./assets/image-background.jpg")}
          >
            <Avatar
              style={styles.profileAvatar as ImageStyle}
              source={user.photoUrl}
            />
            <Text style={styles.profileName} category="h5" status="control">
              {`${user.fullName}`}
            </Text>
            <View style={styles.locationContainer}>
              <PinIcon />
              <Text style={styles.location} status="control">
                {`${user.location}`}
              </Text>
            </View>
          </ImageOverlay>
        ) : null}
        <ProfileMenu />
      </ScrollView>
      {loading && <LoadingView />}
    </>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  header: {
    paddingVertical: 24,
    alignItems: "center",
  },
  profileAvatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    marginVertical: 16,
  },
  profileName: {
    zIndex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    marginVertical: 8,
  },
  profileButtonsContainer: {
    flexDirection: "row",
    marginVertical: 32,
    marginHorizontal: 20,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  socialsContainer: {
    flexDirection: "row",
    width: "75%",
    marginVertical: 8,
  },
  profileSocial: {
    flex: 1,
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  profileMenu: {
    padding: 16,
  },
});
