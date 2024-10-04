import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import AlertModalComponent from "@/components/molecules/alert-modal.component";
import LoadingView from "@/components/organisms/loading.view";
import useAuth from "@/hooks/auth";
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import { ImageURISource, View } from "react-native";
import { useDispatch } from "react-redux";
import { MeApiService } from "../../services/api.service";
import httpRequest, {
  ApiErrorResponse,
} from "../../services/http-request.service";
import { PinIcon } from "../profile-menu/extra/icons";
import { EditAvatarButton } from "./extra/edit-avatar-button.component";
import { PersonIcon } from "./extra/icons";
import { ProfileAvatar } from "./extra/profile-avatar.component";
const apiService = new MeApiService(httpRequest);

export default (): React.ReactElement => {
  const dispatch = useDispatch();
  const { token, logoutSuccess, callGetAuthUser, user, loading } = useAuth();
  const [firstName, setFirstName] = React.useState<string>(
    user?.firstName ?? ""
  );
  const [lastName, setLastName] = React.useState<string>(user?.lastName ?? "");
  const [location, setLocation] = React.useState<string>(user?.location ?? "");
  const [profileImage, setProfileImage] = React.useState(user?.photoUrl);
  const [email, setEmail] = React.useState<string>(user?.email ?? "");
  const [oldPassword, setOldPassword] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const styles = useStyleSheet(themedStyles);

  const doRequestUpdate = async () => {
    if (!firstName) {
      showErrorMessage("กรุณากรอกชื่อ");
      return;
    }
    if (!lastName) {
      showErrorMessage("กรุณากรอกนามสกุล");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.updateMe({
        firstName,
        lastName,
        location,
        profileImage: (profileImage as ImageURISource).uri ?? "",
      });
      setIsLoading(false);
      if (response.status) {
        router.back();
      } else {
        showErrorMessage(response.message ?? "");
      }
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);

      if (error.response?.status === 401) {
        console.log(error.response.data);
        const data: ApiErrorResponse = error.response.data;
        showErrorMessage(data.message ?? "");
      } else {
        console.error(error);
      }
    }
  };

  const showErrorMessage = (errorMessage: string) => {
    setError(errorMessage);
    setModalVisible(true);
  };

  const renderEditAvatarButton = (): React.ReactElement => (
    <EditAvatarButton
      onUploaded={(imageUrl) => {
        console.log("imageUrl", imageUrl);
        setProfileImage({ uri: imageUrl });
      }}
    />
  );

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerContainer}>
          <ProfileAvatar
            style={styles.profileAvatar as any}
            source={profileImage}
            editButton={renderEditAvatarButton}
          />
        </View>
        <Layout style={styles.formContainer} level="1">
          <Input
            autoCapitalize="none"
            placeholder="ชื่อ"
            accessoryRight={PersonIcon}
            value={firstName}
            onChangeText={setFirstName}
          />
          <Input
            style={styles.lastNameInput}
            autoCapitalize="none"
            placeholder="นามสกุล"
            accessoryRight={PersonIcon}
            value={lastName}
            onChangeText={setLastName}
          />
          <Input
            style={styles.lastNameInput}
            autoCapitalize="none"
            placeholder="ที่อยู่"
            accessoryRight={PinIcon}
            value={location}
            onChangeText={setLocation}
          />
        </Layout>
        <Button
          style={styles.signUpButton}
          size="giant"
          onPress={doRequestUpdate}
        >
          ยืนยันการแก้ไข
        </Button>
      </KeyboardAvoidingView>
      <AlertModalComponent
        modalMessage={error}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {isLoading && <LoadingView />}
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 216,
    backgroundColor: "color-primary-default",
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: "center",
    backgroundColor: "background-basic-color-1",
    tintColor: "color-primary-default",
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  lastNameInput: {
    marginTop: 16,
  },
  emailInput: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
    marginBottom: 24,
  },
  termsCheckBoxText: {
    color: "text-hint-color",
    marginLeft: 10,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
