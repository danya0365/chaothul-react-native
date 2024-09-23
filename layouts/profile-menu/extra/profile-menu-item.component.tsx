import {
  BookmarkOutlineIcon,
  ColorPaletteIcon,
  EditIcon,
  ForwardIcon,
  InfoIcon,
  LoginIcon,
  LogoutIcon,
  MessageSquareIcon,
} from "@/components/atoms/icons";
import { useAppSelector } from "@/store/hooks";
import { logout } from "@/store/reducer/auth-reducer";
import { Layout, Menu, MenuItem } from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

export const ProfileMenuItem = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { token } = useAppSelector((state) => state.auth);

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
        onPress={() => {
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
