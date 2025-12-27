import {
  BookmarkOutlineIcon,
  ColorPaletteIcon,
  EditIcon,
  ForwardIcon,
  HeartOutlineIcon,
  InfoIcon,
  LoginIcon,
  LogoutIcon,
  MessageSquareIcon,
} from "@/components/atoms/icons";
import { Json } from "@/models/json";
import { MessengerApiService } from "@/services/api.service";
import { useAppSelector } from "@/store/hooks";
import { logout } from "@/store/reducer/auth-reducer";
import { setChannelId } from "@/store/reducer/messenger-mobile-phone-reducer";
import { Layout, Menu, MenuItem } from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

export const ProfileMenu = ({
  messengerApiService = new MessengerApiService(),
}: {
  messengerApiService?: MessengerApiService;
}): React.ReactElement => {
  const dispatch = useDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { lastConversationSeen, channelId } = useAppSelector(
    (state) => state.messenger
  );

  const getOrCreateNewChannel = async () => {
    try {
      const response = await messengerApiService.getOrCreateNewChannel();

      if (response.status) {
        const data = response.data as Json;
        const channelId = data.id;

        dispatch(setChannelId(channelId));
        return true;
      }
    } catch (error) {
      console.log("getOrCreateNewChannel error:", error);
    }
    return false;
  };

  const checkChannelId = async () => {
    if (channelId) return true;
    return await getOrCreateNewChannel();
  };

  const GuestMenu = (): React.ReactElement => (
    <Menu style={styles.menu}>
      <MenuItem
        accessoryLeft={LoginIcon}
        title="เข้าสู่ระบบ"
        accessoryRight={ForwardIcon}
        onPress={() => {
          router.push("/auth/login");
        }}
      />
      <MenuItem
        accessoryLeft={ColorPaletteIcon}
        title="ธีม"
        accessoryRight={ForwardIcon}
        onPress={() => {
          router.push("/theme");
        }}
      />
      <MenuItem
        accessoryLeft={MessageSquareIcon}
        title="แชทกับเจ้าหน้าที่"
        accessoryRight={ForwardIcon}
        onPress={() => {
          router.push("/messenger-mobilephone-chat");
        }}
      />
      <MenuItem
        accessoryLeft={InfoIcon}
        title="เกี่ยวกับเรา"
        accessoryRight={ForwardIcon}
        onPress={() => {
          router.push("/about-us");
        }}
      />
    </Menu>
  );

  const UserMenu = (): React.ReactElement => (
    <Menu style={styles.menu}>
      <MenuItem
        accessoryLeft={EditIcon}
        title="แก้ไขโปรไฟล์"
        accessoryRight={ForwardIcon}
        onPress={() => {
          //navigation.navigate("Edit User Profile Screen");
          router.push("/edit-user-profile");
        }}
      />
      <MenuItem
        accessoryLeft={HeartOutlineIcon}
        title="รายการที่ถูกใจ"
        accessoryRight={ForwardIcon}
        onPress={() => {
          router.push("/favourite");
        }}
      />
      <MenuItem
        accessoryLeft={BookmarkOutlineIcon}
        title="รายการจองรับงานของคุณ"
        accessoryRight={ForwardIcon}
        onPress={() => {
          router.push("/my-work-bookings");
        }}
      />
      <MenuItem
        accessoryLeft={BookmarkOutlineIcon}
        title="รายการจองหางานของคุณ"
        accessoryRight={ForwardIcon}
        onPress={() => {
          router.push("/my-recruit-bookings");
        }}
      />
      <MenuItem
        accessoryLeft={ColorPaletteIcon}
        title="ธีม"
        accessoryRight={ForwardIcon}
        onPress={() => {
          router.push("/theme");
        }}
      />
      <MenuItem
        accessoryLeft={MessageSquareIcon}
        title="แชทกับเจ้าหน้าที่"
        accessoryRight={ForwardIcon}
        onPress={async () => {
          const canChat = await checkChannelId();
          if (!canChat) {
            return;
          }
          router.push("/messenger-chat");
        }}
      />
      <MenuItem
        accessoryLeft={InfoIcon}
        title="เกี่ยวกับเรา"
        accessoryRight={ForwardIcon}
        onPress={() => {
          router.push("/about-us");
        }}
      />
      <MenuItem
        accessoryLeft={LogoutIcon}
        title="ออกจากระบบ"
        accessoryRight={ForwardIcon}
        onPress={() => {
          dispatch(logout());
        }}
      />
    </Menu>
  );

  return (
    <Layout style={styles.container} level="1">
      <Menu style={styles.menu}>{token ? <UserMenu /> : <GuestMenu />}</Menu>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menu: {
    flex: 1,
    margin: 0,
  },
});
